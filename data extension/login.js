let userName = "Charrouf";

/* function load_user() {
  // Get the refresh token from the local storage
  const refreshToken = localStorage.getItem("refresh");

  // Send a request to the API to verify the refresh token
  fetch("http://localhost:8000/auth/jwt/verify/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: refreshToken}),
  })
    .then(response => {
      // If the token is valid, the API will return a 200 OK status
      if (response.status === 200) {
        // Token is valid, so we can proceed to the next step

        // Get the access token from the local storage
        const accessToken = localStorage.getItem("access");

        // Send a GET request to the API to get the user's data
        fetch("http://localhost:8000/auth/users/me/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${accessToken}`
          }
        })
          .then(response => response.json())
          .then(data => {
            // Store the user's email in the global variable
            userName = data.email;
            if (userName == undefined){
              window.location.replace("/index.html");
            }else{
            // Set the isAuthenticated true
            chrome.storage.local.set({ isAuthenticated: true });

            // Send username variable to background.js
            chrome.storage.local.set({'userName': userName});

            // Hide the login form
            document.getElementById("login-form").style.display = "none";

            // Display the hello message
            document.getElementById("hello-message").innerHTML = `
              <p>Hello, ${data.name}!</p>
            `;

            // Add the logout button to the page
            add_logout_button();
          }
          })
          .catch(error => {
            console.error(error);
            // Set the isAuthenticated true
            chrome.storage.local.set({ isAuthenticated: false });

          });
      } else {
        // Token is not valid, so we need to redirect the user to the login page
        window.location.replace("/index.html");
        // Set the isAuthenticated true
        chrome.storage.local.set({ isAuthenticated: false });

      }
    })
    .catch(error => {
      console.error(error);
      // Set the isAuthenticated true
      chrome.storage.local.set({ isAuthenticated: false });

    });
}

document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Get the email and password from the form
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Create a JavaScript object with the login credentials
  const loginCredentials = {
    email: email,
    password: password
  };

  // Send a POST request to the API to create a JWT
  // Send a POST request to the API to create a JWT
fetch("http://localhost:8000/auth/jwt/create/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(loginCredentials)
})
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      alert("Invalid email or password");
      throw new Error("Invalid email or password");
    }
  })
  .then(data => {
    // Store the access and refresh tokens in the local storage
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    // Load the user's data
    load_user();
  })
  .catch(error => {
    console.error(error);
  });
});

window.onload = function() {
  load_user();
}

function logout() {
  // Remove the access and refresh tokens from the local storage
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  chrome.storage.local.set({ isAuthenticated: false });

  // Redirect the user to the login page
  window.location.replace("/index.html");
}

function add_logout_button() {
  // Add the logout button to the page
  document.getElementById("logout-button-container").innerHTML = `
    <button id="logout-button">Logout</button>
  `;

  // Add an event listener to the logout button to call the logout function when the button is clicked
  document.getElementById("logout-button").addEventListener("click", function(event) {
    logout();
  });
}

 */