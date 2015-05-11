angular.module('homework.services', [])

.factory('Classes', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var classes = [{
    id: 0,
    name: 'Class #1',
    teacher: 'John Doe',
    location: 'GOL-3123',
    assignments: [{
      id: 0,
      name: 'Assignment #1',
      classId: 0,
      dueDate: new Date(2015, 4, 13, 23, 59)
    }, {
      id: 3,
      name: 'Assignment #4',
      teacher: 'John Doe',
      classId: 0,
      dueDate: new Date(2015, 4, 13, 23, 59)
    }]
  }, {
    id: 1,
    name: 'Class #2',
    teacher: 'John Doe',
    location: 'GOL-3123',
    assignments: [{
      id: 1,
      name: 'Assignment #2',
      classId: 1,
      dueDate: new Date(2015, 4, 13, 23, 59)
    }]
  }, {
    id: 2,
    name: 'Class #3',
    teacher: 'John Doe',
    location: 'GOL-3123',
    assignments: [{
      id: 3,
      name: 'Assignment #3',
      classId: 2,
      dueDate: new Date(2015, 4, 13, 23, 59)
    }]
  }, {
    id: 3,
    name: 'Class #4',
    teacher: 'John Doe',
    location: 'GOL-3123',
    assignments: []
  }];

  return {
    all: function() {
      return classes;
    },
    remove: function(classObject) {
      classes.splice(classes.indexOf(classObject), 1);
    },
    get: function(classId) {
      for (var i = 0; i < classes.length; i++) {
        if (classes[i].id === parseInt(classId)) {
          return classes[i];
        }
      }
      return null;
    }
  };
})

.factory('Assignments', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var assignments = [{
    id: 0,
    name: 'Assignment #1',
    classId: 0,
    dueDate: new Date(2015, 4, 13, 23, 59)
  }, {
    id: 1,
    name: 'Assignment #2',
    classId: 1,
    dueDate: new Date(2015, 4, 13, 23, 59)
  }, {
    id: 2,
    name: 'Assignment #3',
    classId: 2,
    dueDate: new Date(2015, 4, 13, 23, 59)
  }, {
    id: 3,
    name: 'Assignment #4',
    classId: 0,
    dueDate: new Date(2015, 4, 13, 23, 59)
  }];

  return {
    all: function() {
      return assignments;
    },
    remove: function(assignment) {
      assignments.splice(assignments.indexOf(assignment), 1);
    },
    get: function(assignmentId) {
      for (var i = 0; i < assignments.length; i++) {
        if (assignments[i].id === parseInt(assignmentId)) {
          return assignments[i];
        }
      }
      return null;
    }
  };
});
