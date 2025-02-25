TranquilTravel Backend

Overview

Backend for TranquilTravel using Node.js and MongoDB.

Setup

Update IP Address: If changed, update in Android Studio.

Start MongoDB:

mongod

Connect with MongoDB Compass (Optional).

Run Backend:

npm install
npm start

Environment Variables

Set in .env:

PORT=3000
MONGO_URI=mongodb://localhost:27017/tranquiltravel
JWT_SECRET=your_secret_key

Notes

Ensure MongoDB is running.

Use environment variables for security.

Keep dependencies updated.


