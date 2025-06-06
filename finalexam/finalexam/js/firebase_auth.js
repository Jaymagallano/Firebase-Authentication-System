// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDv973QE2aNaGHRwVYDmafPrCwlcUp8xMk",
  authDomain: "email-verify-f03bd.firebaseapp.com",
  projectId: "email-verify-f03bd",
  storageBucket: "email-verify-f03bd.firebasestorage.app",
  messagingSenderId: "342106111083",
  appId: "1:342106111083:web:0ed005b2b652c56ecfc52e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Function to handle user registration
function registerUser(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("User registered:", user);
            // Send email verification
            return sendEmailVerification(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Registration error:", errorCode, errorMessage);
            throw error; // Re-throw the error to be handled by the form
        });
}

// Function to send email verification
function sendEmailVerification(user) {
    // Define the action code settings for the verification email
    const actionCodeSettings = {
        // URL you want to redirect back to after email verification success
        url: 'http://localhost/finalexam/finalexam/handle_verification.html', // Redirect to our new verification handler page
        // This must be true, so the email verification code is handled in the app
        handleCodeInApp: true,
        // You can add other settings here if needed, e.g., iOS/Android app redirects
    };

    return user.sendEmailVerification(actionCodeSettings)
        .then(() => {
            console.log("Verification email sent with continueUrl.");
            return true; // Indicate success
        })
        .catch((error) => {
            console.error("Error sending verification email:", error);
            throw error; // Re-throw the error
        });
}

// Function to handle user login
function loginUser(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("User logged in:", user);
            // Check if email is verified
            if (user.emailVerified) {
                console.log("Email is verified.");
                // Redirect to dashboard
                window.location.href = 'dashboard.html'; // Assuming dashboard.php will become dashboard.html
            } else {
                 console.log("Email is not verified.");
                 // Handle unverified email - maybe show a message or redirect to a verification reminder page
                 // For now, let's redirect to a specific page to inform the user
                 auth.signOut(); // Sign out the unverified user from this session
                 window.location.href = 'verify_email_reminder.html'; // Create a new HTML file for this
            }
            return user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Login error:", errorCode, errorMessage);
             throw error; // Re-throw the error
        });
}

// Function to handle user logout
function logoutUser() {
    auth.signOut().then(() => {
        console.log("User signed out.");
        // Redirect to login page after logout
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error("Logout error:", error);
    });
}

// Check authentication state (useful for dashboard and protected pages)
auth.onAuthStateChanged((user) => {
    // Add inactivity timeout only if user is logged in and on a page where it should be active (e.g., dashboard)
    if (user && window.location.pathname.endsWith('dashboard.html')) {
        console.log("User is signed in. Setting up inactivity timeout for dashboard."); // Modified logging
        setupInactivityTimeout(); // Call function to set up timeout

    } else if (user) { // User is signed in but not on dashboard, or on a public page
        console.log("User is signed in:", user); // Keep original log for other signed-in states
        // No inactivity timeout needed for this page, or maybe you want it on all pages?
        // If on other protected pages, you might call setupInactivityTimeout() here as well

    } else { // User is signed out
        console.log("No user is signed in.");
        // Redirect unauthenticated users from protected pages if necessary
        // Example: if on dashboard.html and no user, redirect to login.html
        if (window.location.pathname.endsWith('dashboard.html') || window.location.pathname.endsWith('verify_email_reminder.html')) { // Added reminder page
             window.location.href = 'login.html';
        }
    }
});

// --- Inactivity Timeout Implementation ---
let inactivityTimer;
const INACTIVITY_TIMEOUT_SECONDS = 300; // 5 minutes (300 seconds). Adjust as needed.

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(logoutUser, INACTIVITY_TIMEOUT_SECONDS * 1000); // Convert seconds to milliseconds
    console.log("Inactivity timer reset. Logout in", INACTIVITY_TIMEOUT_SECONDS, "seconds if no activity."); // Add logging
}

function setupInactivityTimeout() {
    // Start the timer initially
    resetInactivityTimer();

    // Listen for user activity events to reset the timer
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('keypress', resetInactivityTimer);
    document.addEventListener('click', resetInactivityTimer);
    document.addEventListener('scroll', resetInactivityTimer); // Optional: include scrolling as activity
}

// Function to clear inactivity listeners when logging out (good practice)
function clearInactivityListeners() {
    clearTimeout(inactivityTimer);
    document.removeEventListener('mousemove', resetInactivityTimer);
    document.removeEventListener('keypress', resetInactivityTimer);
    document.removeEventListener('click', resetInactivityTimer);
    document.removeEventListener('scroll', resetInactivityTimer);
    console.log("Inactivity listeners cleared."); // Add logging
}

// Modify logoutUser to also clear listeners
const originalLogoutUser = logoutUser;
logoutUser = function() {
    clearInactivityListeners();
    originalLogoutUser.apply(this, arguments);
};

// Helper function to display errors on the page
function displayError(errorMessage) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.textContent = errorMessage;
        errorDiv.style.display = 'block';
    }
}

// Helper function to hide errors
function hideError() {
    const errorDiv = document.getElementById('error-message');
     if (errorDiv) {
        errorDiv.style.display = 'none';
    }
} 