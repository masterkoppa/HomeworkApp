angular.module('homework.services', [])

.factory('Classes', function(Assignments) {
  // Might use a resource here that returns a JSON array

  var class_id = 0;
  var class_list = {}
  console.log("Got here");
  // If class list does not exist in storage
  if(!localStorage.class_list){
    // Some fake testing data
    var classes = [{
      id: 0,
      name: 'Class #1',
      teacher: 'John Doe',
      location: 'GOL-3123',
      assignments: [0,3]
    }, {
      id: 1,
      name: 'Class #2',
      teacher: 'John Doe',
      location: 'GOL-3123',
      assignments: [1]
    }, {
      id: 2,
      name: 'Class #3',
      teacher: 'John Doe',
      location: 'GOL-3123',
      assignments: [3]
    }, {
      id: 3,
      name: 'Class #4',
      teacher: 'John Doe',
      location: 'GOL-3123',
      assignments: []
    }];

    localStorage.class_list = JSON.stringify(classes);
  }


  class_list = JSON.parse(localStorage.class_list);

  

  return {
    all: function() {
      return class_list;
    },
    remove: function(classObject) {
      class_list.splice(class_list.indexOf(classObject), 1);
    },
    get: function(classId) {
      for (var i = 0; i < class_list.length; i++) {
        if (class_list[i].id === parseInt(classId)) {
          var class_item = {}
          angular.extend(class_item, class_list[i]);
          for(var a = 0; a < class_item.assignments.length; a++){
            var assignment_id = class_item.assignments[a];
            
            class_item.assignments[a] = Assignments.get(class_item.assignments[a]);
          }
          return class_item;
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
