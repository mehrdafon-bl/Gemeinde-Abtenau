# Abtenau App

## Prerequirements

- Ionic CLI 5.4.x
- Node 18.20.3
- export NODE_OPTIONS=--openssl-legacy-provider

## Main tasks

Task automation is based on [NPM scripts](https://docs.npmjs.com/misc/scripts) and [Ionic scripts](https://ionicframework.com/docs/cli/).

Tasks                                       | Description
--------------------------------------------|---------------------------------------------------------------------------------------
npm start                                   | Run development server on `http://localhost:4200/` (bs default)
npx ionic serve                             | Run development server on `http://localhost:8100/` (default)
npx ionic build                             | Create build inside www folder
npx cap sync                                | Sync ionic/angular code with native projects
npx cap open (android or ios)               | Open Xcode or Android Studio
npx ionic cap run android -l --external     | Run app with livereload on Android device
npx ionic cap run ios -l --external         | Run app with livereloead on iOS device
npx @capacitor/assets generate --ios        | Generate ios ressources
npx @capacitor/assets generate --android    | Generate android ressources

## Project structure
```
global.scss                  app global styles
src/                         project source code
|- app/                      app components
|  |- app.component.*        app root component (shell)
|  |- app.component.html     app root component template
|  |- app.component.scss     app root component styles
|  |- app.module.ts          app root module definition
|  |- components/            global components (header, footer etc.)
|  |- pages/                 app pages (login, register, lists...)
|  |- services/              shared services
|- assets/                   app assets (images, fonts, translations...)
|- environments/             environment related configuration
|- theme/                    scss variables
|- index.html                html entry point
www/                         compiled version
```

## Updating CocoaPods to Version 1.16

To ensure compatibility with the project, you need to update CocoaPods to version 1.16. Follow these steps:

1. **Uninstall the Current Version of CocoaPods:**

   ```sh
   sudo gem uninstall cocoapods
   ```

2. **Install CocoaPods Version 1.16:**

   ```sh
   sudo gem install cocoapods -v 1.16
   ```

3. **Verify the Installation:**

   ```sh
   pod --version
   ```

4. **Update the Pods in Your Project:**

   Navigate to your iOS project directory and update the pods.
   ```sh
   cd ios/App
   pod install
   ```

By following these steps, you will ensure that CocoaPods is updated to the correct version for this project.