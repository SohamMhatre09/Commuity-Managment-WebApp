## Team ID : HM0054                
  
  Team Name : Programmers of AIML

## Problem Statement :
  
  Create an easy-to-use platform that helps communities plan and track local clean-up events, allowing volunteers to sign up, log collected waste, and visualize the impact, fostering a cleaner environment.

## Features :

  User Authentication: Enables user signup and login with JWT token generation for subsequent authenticated requests.
  
  Event Management: Users can create, update, and delete events, with each event associated with the user who initiated it.
  
  All Events: Maintains a global list of all events created by any user.
  
  Authorization and Access Control: Routes are protected to ensure only authenticated users can access specific endpoints. Users can only perform actions on events they have created.
  
  Error Handling: Incorporates error handling for database errors, unauthorized access, and general server errors.
  
  Express Router: Uses Express Router to modularize code and separate routes for user and event management.
  
  CORS and JSON Parsing: Enables CORS for cross-origin requests and includes JSON parsing middleware.

## Technology Stack:

  Node.js and Express.js: Used for building the server-side application and handling HTTP requests.
  
  MongoDB: A NoSQL database used to store and retrieve data related to users and events.
  
  Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js, used for defining schemas and interacting with the database.
  
  JSON Web Tokens (JWT): Used for user authentication and authorization.
  
## Description :

  This project is an event management system built using Node.js, Express.js, and MongoDB. It facilitates user authentication, event creation, and management, and includes features such as user signup, login,      event creation, updating, and deletion. The system is designed to handle a global list of all events created by any user, providing a centralized repository.
    
  # User Authentication:
  
  The project includes user signup and login functionality.
  When a user signs up, their information is stored in the MongoDB database after checking for existing usernames.
  JWT is used to generate a token upon successful signup or login, which is sent back to the client for subsequent authenticated requests.
  
  # User and Event Schemas:
  
  User data is stored in MongoDB using a user schema, including fields such as username, password, city, phone, and arrays for joined and created events.
  Event data is stored in MongoDB using an event schema, including details like name, date, location, description, and the user who created it.
  
  # Event Management:
  
  The system allows users to create new events by providing event details.
  Created events are associated with the user who initiated them and stored in the database.
  Events can be retrieved, updated, and deleted by the user who created them.
  
  # All Events:
  
  There is a global list of all events stored in the AllEvents schema, associated with the user who created them. This allows for a centralized collection of all events created by any user.
  
  # Authorization and Access Control:
  
  Routes are protected using middleware (authenticateJwt) to ensure that only authenticated users can access certain endpoints.
  Authorization checks are implemented, ensuring that users can only perform actions on events they have created.
  
  # Error Handling:
  
  The project includes error handling for various scenarios, such as database errors, unauthorized access, and general server errors.
  
  # Express Router:
  
  The project uses Express Router to modularize the code and separate the routes related to user management and event management.
  
  # CORS and JSON Parsing:
  
  CORS is enabled to handle cross-origin requests.
  JSON parsing middleware is used to handle JSON data in requests and responses.
  
  # MongoDB Connection:
  
  The server connects to a MongoDB Atlas cluster for storing and retrieving data.
  
  # Project Structure:
      
  The code is structured into multiple files, including user.js for user-related routes, index.js for the main server setup, and index.js in the db folder for defining Mongoose schemas.

## Screenshots
  <Images>

## Deployed URL

  <Link>

## Video URL

  <Link>

## Remarks 

  <optional>
