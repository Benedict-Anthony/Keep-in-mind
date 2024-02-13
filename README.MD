# University of Benin Lecture Reminder App

## Overview

The University of Benin Lecture Reminder App is a mobile application built with React Native and Expo Go. The app's primary purpose is to help students and lecturers at the University of Benin manage their lecture schedules efficiently. It leverages Firebase for data storage and real-time updates, allowing seamless synchronization of lecture timetables across devices.

### Key Features

- **Timetable Management:** Create, view, and manage lecture schedules.
- **Reminder Notifications:** Receive notifications for upcoming lectures.
- **Real-Time Updates:** Changes to the timetable are instantly reflected across all devices.
- **Firebase Integration:** Data storage and synchronization powered by Firebase.

## Getting Started

### Prerequisites

- Node.js: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- Expo CLI: Install the Expo CLI globally by running `npm install -g expo-cli`.
- Expo Go: Download the Expo Go app on your mobile device from the [App Store](https://apps.apple.com/us/app/expo-go/id982107779) or [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent).

### Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd ...
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Create Firebase Project:**

   - Visit [Firebase Console](https://console.firebase.google.com/) and create a new project.
   - Set up Firebase Authentication and Realtime Database.

5. **Configure Firebase Credentials:**

   - Obtain your Firebase configuration details.
   - Create a file named `.env` in the project root and add your Firebase config:

     ```env
     FIREBASE_API_KEY=your-api-key
     FIREBASE_AUTH_DOMAIN=your-auth-domain
     FIREBASE_PROJECT_ID=your-project-id
     FIREBASE_STORAGE_BUCKET=your-storage-bucket
     FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     FIREBASE_APP_ID=your-app-id
     ```

6. **Run the App:**

   ```bash
   npm start
   ```

   - Open Expo Go on your mobile device and scan the QR code to run the app.
