// app.js

var app = angular.module('taskManagerApp', []);

app.controller('taskController', function ($scope, $http) {
  $scope.tasks = [];
  $scope.newTask = {};

  // Load all tasks
  $scope.loadTasks = function () {
    $http.get('http://localhost:3000/tasks')
      .then(function (response) {
        $scope.tasks = response.data;
      }, function (error) {
        console.error('Error loading tasks:', error);
      });
  };

  // Add a new task
  $scope.addTask = function () {
    $http.post('http://localhost:3000/tasks', $scope.newTask)
      .then(function (response) {
        $scope.tasks.push(response.data);
        $scope.newTask = {}; // Reset the form
      }, function (error) {
        console.error('Error adding task:', error);
      });
  };

  // Edit task
  $scope.editTask = function (task) {
    task.isEditing = true;
  };

  // Save the edited task
  $scope.saveTask = function (task) {
    $http.put(`http://localhost:3000/tasks/${task._id}`, task)
      .then(function (response) {
        task.isEditing = false;
      }, function (error) {
        console.error('Error updating task:', error);
      });
  };

  // Delete a task
  $scope.deleteTask = function (id) {
    $http.delete(`http://localhost:3000/tasks/${id}`)
      .then(function () {
        $scope.tasks = $scope.tasks.filter(task => task._id !== id);
      }, function (error) {
        console.error('Error deleting task:', error);
      });
  };

  // Load tasks when the page is loaded
  $scope.loadTasks();
});
