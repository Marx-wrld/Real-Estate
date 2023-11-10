# Real-Estate-App
A real estate application built in React(UI), MERN stack and tailwind css.
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
#### Installing Firebase 
