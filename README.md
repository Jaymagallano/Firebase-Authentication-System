# Firebase Authentication Project

This is a simple front-end project using **Firebase Authentication**. It includes user registration, login, email verification, and a dashboard.

## 📁 Folder Structure

```
finalexam/
└── finalexam/
    ├── login.html
    ├── register.html
    ├── dashboard.html
    ├── verify_email_reminder.html
    └── firebase-messaging-sw.js (if any)
```

## 🛠 Requirements

- Firebase account
- Firebase project with:
  - Web App created
  - Authentication enabled (Email/Password)
- Code editor (e.g. VS Code)
- Web browser (e.g. Chrome)

## ⚙️ Setup Instructions

1. **Download or Clone the Repository**

```bash
git clone https://github.com/yourusername/your-repo-name.git
```

2. **Open the Project**

Open the `finalexam/finalexam/` folder in your browser or with a live server.

3. **Add Firebase Configuration**

Sa mga HTML files (`login.html`, `register.html`, etc.), hanapin ang part kung saan ini-initialize ang Firebase. Palitan ang config ng sarili mong Firebase project config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
```

4. **Run the Project**

Pwede mo itong i-open direkta sa browser:

- Double-click `login.html`
- O gamitin ang Live Server extension sa VS Code

## 🔐 Features

- ✅ User Registration
- ✅ Email Verification
- ✅ Login
- ✅ Redirect to Dashboard
- ✅ Simple UI

## 📌 Notes

- Make sure Firebase Authentication is enabled.
- Kung nag-deploy online, dapat **HTTPS** ang website mo para gumana ng maayos ang Firebase Auth.
