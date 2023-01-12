![Logo](/docs/logo.png)

---

Personal project where the goal is to build an application with MERN stack.

## About
Routinely
: as part of a regular procedure rather than for a special reason.

The goal is to allow users to regularly log their workouts on an interactive calendar. Whether it be lifting or running, users can log it in and be proud of their progress and continue exercising.

# Installation
Create a .env file in root directory and add your ATLAS_URI (mongodb connection string), NODE_ENV, PORT, JWT_SECRET

### Install Dependencies
```
/*  server dependencies */
npm install

/* client dependencies */
cd client
npm install
npm run build // make build folder
cd ../
```
### Run Server
```
// runs application on localhost
npm run server 
```

## Live Demo
Set up with Railway [here](routinely.up.railway.app)

---

## Features
- Login/SignUp User Authentication
- Interactive calendar that shows days where users have logged exercises, and allows users to select any day to log an exercise
- CRUD operations: website gets users' exercise, and allows them to create, update, and delete them
- In future: add workouts list for users to browse, and allow users to customize their dashboard/profile

The backend was done with **NodeJS/Express**, with **MongoDB** as database. The frontend was done with **React and Redux**.

# Screenshots
![Dashboard](/docs/dashboard.png)
![SignIn](/docs/signin.png)