// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message) => {
    try{
    if (message.action === "extract_text") {
        // Extract the text when the background script sends a message
        extractTextFromWebpage();
    }else{
        console.log("Somthing went wrong...");
    }
    }catch(error){
        console.log(error);
    };
});

// Extract the text from the active tab
function extractTextFromWebpage() {
    // Get the text from the webpage
    let text = document.body.textContent || document.body.innerText;

    // Remove any remaining HTML tags using a regular expression
    text = text.replace(/<[^>]*>/g, "");

    // Remove any remaining JavaScript functions using a regular expression
    text = text.replace(/function[\s\S]*?\}/g, "");

    // Split the text into paragraphs and filter out empty paragraphs
    const paragraphs = text.split("\n").map(paragraph => paragraph.trim()).filter(Boolean);

    // Filter out unwanted text based on specific patterns or keywords
    const filteredParagraphs = paragraphs.filter(paragraph => {
        // Specify patterns or keywords that indicate irrelevant text
        const patternsToExclude = [
            "uiOptimize",
            "createCaf",
            "cookie-modal",
            // Add more patterns as needed
        ];

        // Check if the paragraph contains any of the exclusion patterns
        return !patternsToExclude.some(pattern => paragraph.includes(pattern));
    });

    try {
        chrome.runtime.sendMessage({ action: "extract_text", text: filteredParagraphs });
    } catch (error) {
        console.log(error);
    }
}

// Define throttle function
function throttle(fn, delay) {
    let timer = null;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
}

// Listen for the scroll event on the window object
window.addEventListener("scroll", throttle(function() {
    // Send a message to the background script when the scroll event occurs
    chrome.runtime.sendMessage({ action: "scroll" });
  }, 400));
