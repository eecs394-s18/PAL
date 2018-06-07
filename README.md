# PAL
This project is Team Orange Client Project for EECS 394.

Below you'll find information about installing, running app, troubleshooting and implementation details.

## Table of Contents
* [Installing](#installing)
* [Running](#running)
* [Troubleshooting](#troubleshooting)
* [Implementation Details](#implementation)

## Installing

Download our app's code by cloning our git repository on your laptop's terminal.
```
git clone https://github.com/eecs394-s18/PAL.git
```

After going to PAL folder that is created after cloning, go to PAL folder or PAL_child folder.
* ../PAL/PAL: parent app
* ../PAL/PAL_child: child app

Once you're at the right path, you will see 'package.json' that tells you what to install to run it.
Running this command will help you install all libraries and dependencies and 'save' keyword will prevent you from repeating installation of same libraries. After this, you will see a new 'package-lock.json' file.
```
npm i --save
```

## Running

### `npm start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start --reset-cache
# or
yarn start --reset-cache
```

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:

##### Using Android Studio's `adb`

1. Make sure that you can run adb from your terminal.
2. Open Genymotion and navigate to `Settings -> ADB`. Select “Use custom Android SDK tools” and update with your [Android SDK directory](https://stackoverflow.com/questions/25176594/android-sdk-location).

##### Using Genymotion's `adb`

1. Find Genymotion’s copy of adb. On macOS for example, this is normally `/Applications/Genymotion.app/Contents/MacOS/tools/`.
2. Add the Genymotion tools directory to your path (instructions for [Mac](http://osxdaily.com/2014/08/14/add-new-path-to-path-command-line/), [Linux](http://www.computerhope.com/issues/ch001647.htm), and [Windows](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/)).
3. Make sure that you can run adb from your terminal.

## Troubleshooting

## Implementation
