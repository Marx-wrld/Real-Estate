# Real-Estate
A real estate application built in React.js(UI), redux, Firebase, MERN stack and tailwind.

It allow users to search for properties based on various criteria, such as location, price, and a number of bedrooms. Users can typically browse listings, view photos, and contact agents or brokers to schedule viewings.

![2023-12-23 20_33_51-](https://github.com/Marx-wrld/Real-Estate/assets/105711066/a40e71aa-308d-410f-826b-6a647a35bba9)


- Cloning the project 
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
