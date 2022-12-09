write a github md file for an app described as the following:
written in angular with a GoLang backend
lists all active projects and serves links to all relevant resources for each project (github, netlify, heroku, etc)
has a task managing feature similar to monday.com

# Project Manager

This project manager is a web application built with Angular for the front-end and GoLang for the backend. It allows users to manage and keep track of their projects in one central location.

## Features

- Get an overview of all your active projects in one place
- Links to all relevant resources (Github, Netlify, Heroku, etc.) for each project
- Task management feature, similar to monday.com, with options to assign tasks to other users, set deadlines, and track progress
- Option to assign priority level to tasks
- Ability to chat with other users within the app

## Setup

### Prerequisites

- Node.js
- GoLang

### Installation

1. Clone the repository:

```
git clone https://github.com/[username]/project-manager.git
```

2. Install the dependencies:

```
npm install
```

3. Compile the GoLang backend:

```
go build
```

4. Run the application:

```
node server.js
```

5. Visit the application in your browser at `http://localhost:3000`