# Real-Estate
A real estate web application built in React.js(UI), redux, Firebase, MERN stack, and tailwind.

It allows users to search for properties based on various criteria, such as location, price, and number of bedrooms. Users can typically browse listings, view photos, and contact agents or brokers to schedule viewings.

![2023-12-23 20_38_35-](https://github.com/Marx-wrld/Real-Estate/assets/105711066/871fd9de-953e-4b67-aecc-3fb0d696d7b4)

![2023-12-28 15_16_39-](https://github.com/Marx-wrld/Real-Estate/assets/105711066/50feb2d1-2f8b-4cd0-a61b-beb29ddbfdea)

![2023-12-28 15_11_32-](https://github.com/Marx-wrld/Real-Estate/assets/105711066/412e7326-a543-46a6-a61e-18ef911ae8de)

![2023-12-28 15_12_49-](https://github.com/Marx-wrld/Real-Estate/assets/105711066/7f2e9671-07f1-4b64-bc41-062dda9812dc)

### Libraries used:-
- Building the project 
```
npm create vite@latest client

npm i
```

- Installing Tailwind css
```
npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p
```  

- Installing React router-dom for the web pages
```
npm i react-router-dom
```
- React icons install
```
npm i react-icons
```
#### Building our api server

- On our root folder
```
npm init -y
```
- Create an index.js file in our api folder then do,
```
npm i express
```
- Add "type": "module", to the package.json file in our root folder then run,
```
node api/index.js
```
#### Installing nodemon to auto-refresh our server in case of any changes
```
npm i nodemon
```
- Edit your package.json script section to this:-
```
  "scripts": {
    "dev": "nodemon api/index.js",
    "start": "node api/index.js"
  },
```
- To run our server, we'll now simply do:-
```
npm run dev
```
#### Installing the mongoose package for mongodb
```
npm i mongoose
```
#### Installing bcryptjs for encrypting our users' passwords
```
npm i bcryptjs
```
#### Installing the json web token to handle the user email and password storage
```
npm i jsonwebtoken
```
#### Installing redux-persist which helps us store user data inside the local storage
```
npm i redux-persist
```
**You can also install the google chrome redux extension
#### Installing Firebase after setting firebase web app in our account
```
npm install firebase
```
#### Rules to add to your Firebase storage
```
allow read;
allow write: if 
request.resource.size < 2 * 1024 * 1024 &&
request.resource.contentType.matches('image/.*')
```
#### Installing cookie-parser to store and retrieve the user-session token
```
npm i cookie-parser
```
#### Installing react swiper, a modern touch slider for web apps 
```
npm i swiper
```
