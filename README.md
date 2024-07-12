# Simple List Application

## Description

Simple List Application is a React-based project using Vite and TypeScript, designed for managing lists with the capability to drag and drop items. The application is further configured to run on Android using Capacitor, and it ensures a seamless user experience by disabling screen rotation to portrait mode only.

## Features

- **React + Vite + TypeScript**: Modern frontend stack for fast development.
- **Drag and Drop**: Implemented using `react-beautiful-dnd` for an intuitive user interface.
- **Persistent State**: Manages the state of lists and items effectively.
- **Mobile Ready**: Configured to be built into an Android APK using Capacitor.
- **Portrait Mode**: Locked to portrait mode for a consistent user experience on mobile devices.

## Installation

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Android Studio (for building the APK)
- Capacitor CLI

### Setup

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Bastien8131/simple-list-app.git
    cd simple-list-app
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Configure Vite for local network access**:

    Update `vite.config.ts`:

    ```ts
    import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';

    export default defineConfig({
      plugins: [react()],
      server: {
        host: '0.0.0.0',
        port: 5173,
      },
    });
    ```

4. **Start the development server**:

    ```bash
    npm run dev
    ```

    You can now access the application from other devices on the same network by visiting `http://<your-local-ip>:5173`.

## Building for Android

1. **Install Capacitor and Android platform**:

    ```bash
    npm install @capacitor/core @capacitor/cli
    npm install @capacitor/android
    ```

2. **Initialize Capacitor**:

    ```bash
    npx cap init
    ```

    Follow the prompts to set up your app.

3. **Add the Android platform**:

    ```bash
    npx cap add android
    ```

4. **Build the project**:

    ```bash
    npm run build
    npx cap copy
    ```

5. **Open the project in Android Studio**:

    ```bash
    npx cap open android
    ```

6. **Disable screen rotation**:

    In `AndroidManifest.xml`, set the screen orientation for `MainActivity`:

    ```xml
    <activity
        android:name=".MainActivity"
        android:screenOrientation="portrait"
        android:configChanges="keyboard|keyboardHidden|orientation|screenSize"
        android:label="@string/app_name"
        android:launchMode="singleTask"
        android:theme="@style/AppThemeLaunch"
        android:windowSoftInputMode="adjustResize">
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
    </activity>
    ```

7. **Replace app icons**:

    Replace the default icons in `android/app/src/main/res/mipmap-*dpi/` with your app icons. You can use [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html) to generate the required icon sizes.

8. **Build the APK**:

    In Android Studio, select `Build > Build Bundle(s) / APK(s) > Build APK(s)`. Locate the generated APK to install on your device.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

