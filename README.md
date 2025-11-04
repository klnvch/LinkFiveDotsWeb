# React Firebase App

This is a React application configured for deployment to Firebase Hosting.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Configure Firebase:
   - Create a new Firebase project at https://console.firebase.google.com/
   - Replace the Firebase configuration in `src/firebase.js` with your project's configuration

3. Start the development server:
```bash
npm start
```

## Deployment to Firebase

1. Install Firebase CLI globally:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase in your project:
```bash
firebase init
```
   - Select Hosting
   - Select your project
   - Use "build" as your public directory
   - Configure as a single-page app: Yes
   - Set up automatic builds and deploys with GitHub: No

4. Build your app:
```bash
npm run build
```

5. Deploy to Firebase:
```bash
firebase deploy
```

Your app will be deployed to Firebase Hosting! 