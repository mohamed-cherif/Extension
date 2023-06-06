let userName= "Youssef";
let startTime;
let timeSpent = 0;

function injectContentScript() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs[0].url.startsWith("chrome://")) {
            chrome.tabs.executeScript(tabs[0].id, {  file: "content.js" });
        }
    });
}

// Extract the text from the active tab
function start_extracting_text() {
    // injectContentScript();
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        try{
            chrome.tabs.sendMessage(tabs[0].id, { action: "extract_text" });
        }catch(error){
            console.log(error);
    }
    });
  }

/* // Check if the user is authenticated before extracting text
function check_authentication_status() {
    chrome.storage.local.get("isAuthenticated", function(result) {
      // The result object contains the value of the isAuthenticated variable
      const isAuthenticated = result.isAuthenticated;
      // Check isAuthenticated
      // console.log(isAuthenticated);
      if (isAuthenticated) {
        // Extract text if the user is authenticated
        start_extracting_text();
      }
    });
  } */

  // Start extracting text when the user changes to a different tab
chrome.tabs.onActivated.addListener(function(activeInfo) {
  start_extracting_text();
  });
  
// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "scroll") {
      // Extract text from the active tab when the content script sends a message
      start_extracting_text();
    }
  });  


  let lastTimestamp = Date.now();
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.action === "extract_text") {
        // The request object contains the extracted text
        const text = request.text;
        /* chrome.storage.local.get('userName', function(result) {
          userName = result.userName;
        }); */
        // Calculate time spent between each scroll event
        let currentTimestamp = Date.now();
        let timeSpent = (currentTimestamp - lastTimestamp)/1000;
        lastTimestamp = currentTimestamp;
        // Prepare data with the extracted text, time spent, and user name to be sent
        let data = {
          name: userName,
          texts: text,
          time: timeSpent
          };
      fetch('https://8971-160-159-33-249.ngrok-free.app/predict/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
      })
      .then(response => response.json())
      .catch(error => {
          console.error(error);
        });
      }
  });

