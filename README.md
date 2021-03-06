# README

A deployed version of this app can be found at http://pomodoro-rftd.herokuapp.com.

## Getting started
**Note:** Ensure that you are running `Node v6.1.0` as the code uses some ES6 syntax
- Run `npm install`
- Run `bower install`
- Run `npm start`

## Technology
This project is built on the MEAN (MongoDB, Express, AngularJS, Node.js) stack. These technologies were chosen for the reasonse listed below:
- **MongoDB:**
  - Lack of relational data eliminates one of the primary advantages of SQL databaes (E.g., ability to do complex joins)
  - Strong integration with Node.js/Express via Mongoose
  - Schemaless design allows for flexibility during development
  - **Note:** A major downside of MongoDB, aside from it's inability to handle relational data, is that it is not ACID compliant. As such, many of the features around data integrity that are commonplace with SQL databases may not be present in MongoDB. That being said, for applications that don't require the highest levels of data integrity (e.g., a to-do list app), the benefits of MongoDB will often outweight the downsides.
- **Node.js/Express**
  - Javascript's eventloop allows Node.js to handle API requests and DB reads/write asynchronously. This is very useful for API servers that need to handle frequent requests from the client.
  - NPM provides a robust package ecosystem that allow developers to easily add additional functionality. Packages used in this project include bcrypt, body-parser, cookie-parser, and mongoose.
  - **Note:** for apps that require significant 'heavy lifting' on the backend (e.g., analysis of large datasets), Node.js may not be the best option. This is because JavaScript is single-threaded and, as a result, a Node.js server can get held up by slow synchronous tasks. For a simple to-do list app, this is not an issue.
- **AngularJS**
  - AngularJS' use of two-way databinding allows for highly interactive UIs where user input is required frequently. This works well for a to-do list app that requires regular creation/update/deletion of tasks by the user.
  - **Note:** For apps that require more significant DOM updates or have more complex state, React/Redux may be a better option due to (1) React's use of a Virtual DOM and (2) Redux's preference for immutable state.

## Architecure
This application makes use of a simple REST API. The API has 4 main routes for getting, creating, updating, and deleting tasks. In addition, the server also has separate routes for authentication.
![Architecture Diagram](http://i.imgur.com/bFJ7yw9.png) 

## Example Usage

![Pomodoro GIF](http://i.imgur.com/U5tty1l.gif)

## Serverside unit tests
This repo includes basic serverside unit tests which run on  mocha/chai.
- Run `npm test`

## Additional notes
- A significant amount of ES6 has been used in writing this app. For the backend, ensure that you are running `Node v6.1.0`. For the frontend, run `grunt` (ensure you have the `grunt-cli` installed) after making any changes (the transpiled versions of the frontend javascript files will be saved in the `dist` folder)
