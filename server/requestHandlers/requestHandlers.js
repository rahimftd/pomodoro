const Task = require('../models/task.js');
const User = require('./authHandlers.js').User;
const mongoose = require('../config/dbConfig.js');

// Gets username from sessionID
const getUserName = (sessionId) => {
  return new Promise((resolve, reject) => {
    User.find({
      sessionId
    }, (error, users) => {
      if (error) {
        reject(error);
      } else if (users.length === 0) {
        resolve(false);
      } else {
        resolve(users[0].username);
      }
    });
  });
}

const getTasks = (request, response) => {
  const sessionId = request.cookies.sessionId;
  // Checks for username in DB based on sessionID
  getUserName(sessionId)
    .then((username) => {
      // If username is not valid, responds with 401
      if (username === false) {
        response.status(401).json({ status: 'Unauthorized' });
      } else {
        Task.find({ username }, (error, tasks) => {
          if (error) {
            console.log('Error: Could not get tasks from database', error);
            response.status(500).json();
          } else {
            response.status(200).json(tasks);
          }
        });
      }

    })
    .catch((error) => {
      console.log('Error: Could not get user from sessionId', error);
      response.status(500).send();
    })
};

const postTask = (request, response) => {
  const sessionId = request.cookies.sessionId;
  // Checks for username in DB based on sessionID
  getUserName(sessionId)
    .then((username) => {
      // If username is not valid, responds with 401
      if (username === false) {
        response.status(401).json({ status: 'Unauthorized' });
      } else if (request.body.description === undefined || request.body.pomodoros === undefined || request.body.name === undefined) {
        response.status(400).json({
          status: 'Invalid task object'
        });
      } else {
        request.body.username = username;
        const newTask = new Task(request.body);
        // Saves the new task to the database
        newTask.save((error, task) => {
          if (error) {
            console.log('Error: Could not save new task to database')
          } else {
            response.status(201).json({
              status: 'Success',
              id: task.id,
            });       
          }
        });
      }
    })
    .catch((error) => {
      console.log('Error: Could not get user from sessionId', error);
      response.status(500).send();
    })
};

const putTask = (request, response) => {
  const sessionId = request.cookies.sessionId;
  // Checks for username in DB based on sessionID
  getUserName(sessionId)
    .then((username) => {
      // If username is not valid, responds with 401
      if (username === false) {
        response.status(401).json({ status: 'Unauthorized' });
      } else if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
        // If task id is not valid, response with 400
        response.status(400).json({ status: 'Invalid id' });
      } else {
        // Updates the task in the database
        Task.findByIdAndUpdate(request.params.id, request.body, (error, task) => {
          if (error) {
            console.log('Error: could not update task', error);
            response.status(500).json();
          } else if (!task) {
            response.status(400).json({ status: 'Invalid id' });
          } else {
            response.status(200).json({ status: 'Success', id: task.id });
          }
        });
      }
    });
};

const deleteTask = (request, response) => {
  const sessionId = request.cookies.sessionId;
  // Checks for username in DB based on sessionID
  getUserName(sessionId)
    .then((username) => {
      // If username is not valid, responds with 401
      if (username === false) {
        response.status(401).json({ status: 'Unauthorized' });
      } else if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
        // If task id is not valid, response with 400
        response.status(400).json({ status: 'Invalid id' });
      } else {
        // Deletes the task from the database
        Task.remove({ _id: request.params.id }, (error) => {
          if (error) {
            console.log('Error: Could not delete task ${taskId}', error);
            response.status(500).json();
          } else {
            response.status(200).json({ status: 'Success' });
          }
        })
      }
    });
};

module.exports = {
  getTasks,
  postTask,
  putTask,
  deleteTask,
}
