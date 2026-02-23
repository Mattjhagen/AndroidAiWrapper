# AI Connect Android App

A ready-to-use Android application built with React Native (Expo) featuring a smooth, modern, and beautiful UI. The app guides users through an onboarding flow to securely connect to Cloud AIs (OpenAI, Anthropic), OpenCLAE nodes, or specific Custom URLs. Keys are stored locally and securely on the device.

## Prerequisites
- **Node.js**: Ensure Node.js is installed.
- **Expo CLI**: Installed automatically via dependencies, but having the Expo Go app on your phone is recommended for rapid testing.
- **EAS CLI**: Required for building the standalone APK or AAB files. Install via `npm install -g eas-cli`.

## Local Development
To run this project on your physical device or emulator during development:

```bash
# 1. Install dependencies
npm install

# 2. Start the Expo development server
npm start
```
*Scan the QR code shown in the terminal with the **Expo Go** app on your Android Phone to view the app instantly.*

---

## 🏗 Building a Standalone APK (For Local Testing)

If you want to distribute the app directly to users as an `.apk` file outside of the Play Store (sideloading), you can build it using Expo Application Services (EAS).

1. **Login to EAS**:
   ```bash
   eas login
   ```
   *Create a free account at [expo.dev](https://expo.dev) if you haven't already.*

2. **Configure the Project**:
   ```bash
   eas build:configure
   ```

3. **Build the APK**:
   We need to instruct EAS to build a profile for a standalone APK rather than an App Bundle. Run:
   ```bash
   eas build -p android --profile preview
   ```
   *(Note: You may need to add a `preview` profile to your `eas.json` file setting `buildType: "apk"` if it asks).*

4. **Download and Install**: 
   Once the build finishes on Expo's servers, it will provide a link to download your `.apk`. You can transfer this to your Android phone and install it directly.

---

## 🚀 Submitting to the Google Play Store

To release the app officially on the Google Play Store, Android requires an **Android App Bundle (.aab)** instead of an APK.

### Step 1: Build the AAB File
Run the standard production build command:
```bash
eas build -p android
```
EAS will automatically handle generating the necessary Android Keystore credentials to securely sign your app. When the build finishes, download the resulting `.aab` file.

### Step 2: Create a Google Play Console Account
1. Go to the [Google Play Console](https://play.google.com/console).
2. Register for a Developer account (requires a one-time $25 fee).
3. Click **Create app** and fill in your app's Name, Language, and indicate that it is an App (not a game).

### Step 3: Set up your App Listing
Before you can upload your code, Google requires you to fill out essential store presence items:
- **Store Listing**: Add your app's short and full description, screenshots (which you can take from the simulator), and a high-res icon.
- **Privacy Policy**: Provide a link to your app's privacy policy.
- **Content Rating**: Fill out the questionnaire to receive a rating (e.g., PEGI 3, E for Everyone).

### Step 4: Upload the Release
1. In the Play Console sidebar, go to **Testing -> Internal testing** (or Closed/Production).
2. Click **Create new release**.
3. Upload the `.aab` file you downloaded from EAS in Step 1.
4. Add release notes detailing what is in this version.
5. Click **Save** and then **Review release**.

### Step 5: Rollout
Once your app meets all of Google's policy requirements and the App Dashboard checklist is complete, you can click **Start rollout to Production**. Google will review your app (typically takes 1-7 days for new accounts), and once approved, it will be live on the Play Store!

---

## Native Android Studio Development
If you prefer to bypass EAS and compile the app locally using Android Studio:
1. Ensure you have run `npx expo prebuild -p android` to generate the `/android` directory.
2. Open **Android Studio**.
3. Select **Open** and choose the `android/` folder inside this project.
4. Let Gradle sync and build the project natively.
