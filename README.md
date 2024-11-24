# Chat Demo Backend

This is the backend for a real-time chat application built with Node.js, Express, MongoDB, and Socket.IO. It provides RESTful APIs for managing chat posts and real-time communication capabilities.

## Table of Contents

- [Chat Demo Backend](#chat-demo-backend)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
      - [Set up MongoDB in Cloud Atlas](#set-up-mongodb-in-cloud-atlas)
        - [Steps](#steps)
      - [Install MongoDB Locally](#install-mongodb-locally)
        - [Steps](#steps-1)
    - [Running the Application](#running-the-application)
      - [Development](#development)
      - [Production](#production)
  - [Environment Variables](#environment-variables)
  - [Usage](#usage)
  - [Deployment](#deployment)
  - [Testing](#testing)
  - [API Endpoints](#api-endpoints)
    - [Posts](#posts)
  - [Socket.IO Events](#socketio-events)
    - [Client-Side Events](#client-side-events)
    - [Server-Side Events](#server-side-events)
  - [License](#license)
  - [Changelog](#changelog)
    - [Launched the first version of the application](#launched-the-first-version-of-the-application)
      - [1.0.0](#100)
        - [Features](#features-1)
        - [Improvements](#improvements)
  - [Roadmap](#roadmap)

## Features

- RESTful API for managing chat posts
- Real-time communication with Socket.IO
- MongoDB for data storage
- Environment-based configuration
- Graceful shutdown handling
- Comprehensive test suite

## Getting Started

*Note: These instructions assume you're running a recent version of MacOS. Additional instructions for other systems coming soon.*

### Prerequisites

- Node.js (v20 or higher)
- MongoDB (v6.0 or higher)


#### Set up MongoDB in Cloud Atlas

We need this for testing a production MongoDB environment.

##### Steps

1. **Sign Up/Log In:** Create an account or log in to <a href="cloud.mongodb.com" target="_blank" rel="noopener noreferrer">MongoDB Cloud Atlas</a>.
2. **Create a Project**: If you don't already have one, create a project.
3. **Create a Cluster:** Click on "Clusters" in the side panel, and then "Create" and follow the prompts to create a new cluster.
4. **Configure Cluster:** Choose your cloud provider, region, and cluster tier. Click "Create Cluster". **(Choose the FREE version)**
5. **Add IP Address:** In the "Network Access" section, add your IP address to the whitelist.
6. **Create Database User:** In the "Database Access" section, create a new database user with a username and password.
7. **Connect to Cluster:** Once the cluster is ready, click "Connect" and choose "Connect Your Application". Copy the connection string.
8. **Update Environment Variables:** Add the connection string to your `.env.production` (and optionally the `.env.development`) file in your project. **(Make sure to replace the placeholders with your credentials.)**

When you deploy you'll need to set these production environment variables up as secrets in the secrets manager of your choice.

#### Install MongoDB Locally

We need this for running the app in development and testing locally.

##### Steps

1. <a href="https://docs.brew.sh/Installation" target="_blank" rel="noopener noreferrer">Install Homebrew</a>
2. Install mongodb-community@8.0

    ```sh
    brew tap mongodb/brew
    brew install mongodb-community@8.0
   ```

3. Run the mongodb service in a terminal instance

    ```sh
    brew services start mongodb-community@8.0 
    ```

    You should see a log in your terminal roughly like this:
    > Successfully started `mongodb-community`

    (Later when you need to stop the service)
    ```sh
    brew services stop mongodb-community@8.0 
    ```

4. Make sure your [Environment Variables](#environment-variables) are up to date.
5. You can use MongoDB Compass or MongoDB for VS Code Extension with the same connection string `mongodb://localhost:27017/chatdemo` if you want a GUI.

### Installation

1. Clone the repository:

    Check the big green button in GitHub!

   ```sh
   git clone https://github.com/jonathanherman1/chat-demo-backend.git
   cd chat-demo-backend
   ```

   or you can use the GitHub CLI

    ```sh
    gh repo clone jonathanherman1/chat-demo-backend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Set up environment variables (see [Environment Variables](#environment-variables)).


### Running the Application

#### Development

To run the application in development mode:
```sh
npm run dev
```

#### Production

To build and run the application in production mode:

```sh
npm run build
npm start
```

## Environment Variables
Create a .env files in the root directory and configure the following variables as shown in the `.env.example`

You'll need `.env.production`, `.env.development`, and `.env.test`.

`.env.production`
```sh
NODE_ENV=production
CLIENT_URL=<frontend-production-url>
PORT=5173
MONGO_URI=<SECRET>
```

`.env.development`
```sh
NODE_ENV=development
CLIENT_URL=http://localhost:5173
PORT=3000
MONGO_URI=mongodb://localhost:27017/chatdemo
```

`.env.test`
```sh
NODE_ENV=test
CLIENT_URL=http://localhost:5173
PORT=3001
MONGO_URI=mongodb://localhost:27017/chatdemo
```

## Usage

To start the development server, run:
```sh
npm run dev
```

To build the project for production, run:
```sh
npm run build
```

To start the development server for use with local devices:

1. Add a `.env.device` file in the root of the repo

    ```
    NODE_ENV=device
    CLIENT_URL=http://<YOUR_IP_ADDRESS>:4173
    CLIENT_URL2=http://<YOUR_IP_ADDRESS>:5173
    CLIENT_URL3=http://localhost:4173
    CLIENT_URL4=http://localhost:5173
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/chatdemo
    ```

2. Run the command to serve the dev server to all devices over the local network:

    ```sh
    npm run dev:device
    ```

## Deployment

**<a href="https://chat-demo-frontend.vercel.app/" _target="blank" rel="noopener noreferrer">View a running version here!</a>**

(Frontend deployed on <a href="https://vercel.com" _target="blank" rel="noopener noreferrer">Vercel</a>, Backend deployed on <a href="https://railway.app" _target="blank" rel="noopener noreferrer">Railway</a>)

You can choose to deploy with the service of your choice.

The main thing is to make sure that you set the [environment variables](#environment-variables) correctly in that service.

Note: If you haven't deployed the frontend yet, you may need to set temporary [environment variable(s)](#environment-variables).

## Testing

To run the test suite:

```sh
npm run test
```

To run the tests in CI mode:

```sh
npm run test:ci
```

## API Endpoints

### Posts

- `GET /posts` - Retrieve all posts
- `POST /posts` - Create a new post
- `PUT /posts/:id` - Update a post by ID*
- `DELETE /posts/:id` - Delete a post by ID*

**Unused at the moment as the app lacks authentication.*

## Socket.IO Events

### Client-Side Events

As of client version 1, it doesn't emit any events. The client listens to `newPost` event.

### Server-Side Events

- `newPost` - Emitted when a new post is created
- `updatePost` - Emitted when a post is updated
- `deletePost` - Emitted when a post is deleted
- `connection` - Emitted when a client connects
- `disconnect` - Emitted when a client disconnects

## License

This project is licensed under the MIT License. See the [LICENSE](/LICENSE) file for details.

## Changelog

### Launched the first version of the application

#### 1.0.0

##### Features

- Node.js server with Express
- MongoDB for data storage with Mongoose
- RESTful Posts API for managing chat posts
- Real-time communication with Socket.IO

##### Improvements
- Added server shutdown handling
- Added comprehensive test suite
- Added first CI/CD workflow

## Roadmap

What features would you like to see?

[Drop us a line.](mailto:jonathan.n.herman@gmail.com)

Notes:

Next steps can include expanding the CI/CD workflows, adding precommit hooks, using Docker (if not already) to simplify development and deployment, etc.
