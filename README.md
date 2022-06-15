## zingchart-firebase-demo

This demo is an example of how ZingChart and Firebase can be integrated to create an engaging and interactive web app.

## Client Side > Firebase
[Firebase](http://www.firebase.com), a cloud services provider and backend as a service company, can be used to power the backend of an application, including data storage, user authentication, static hosting, and more. This demo connects to one of ZingChart's Firebase data stores to generate a chart on the client side.

## Live Example
Check it out [here](https://examples.zingchart.com/tidal-charts/)

### Usage
1. Download or clone this repo.

2. Serve locally using the [Firebase-CLI](https://github.com/firebase/firebase-tools) and visit http://localhost:5000/
  - Install firebase
    `npm install -g firebase-tools`
  - Create "firebase.json"
    `firebase init hosting`
  - Update "firebase.json" to the following
    ```
    {
      "hosting": {
        "public": "./",
        "ignore": [
          "firebase.json",
          "**/.*",
          "**/node_modules/**"
        ]
      }
    }
    ```
  - Update `index.html` with your Firebase data (apiKey, authDomain, databaseURL, storageBucket)
  - Run demo locally
    `firebase serve`

3. Let us know if you make anything cool! We can't wait to hear from you.

### Updating database data
- Run the script to get the wave data as a json file
- Import into firebase realtime database

### Deployment
- Login to the admin account
  `firebase login`
- Make sure to be in the correct project
  `firebase projects:list`
- Run `firebase deploy`