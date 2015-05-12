angular.module('homework.services', [])

.factory('Classes', function() {
  // Might use a resource here that returns a JSON array

  var class_id = 0;
  var class_list = {}

  // If the class list does not exist in storage
  if (!localStorage.class_list) {
    // Some fake testing data
    var classes = [{
      id: 0,
      name: 'Class #1',
      teacher: 'John Doe',
      location: 'GOL-3123', 
      color: 'SpringGreen',
      meetingTimes: [{
        day: 2,
        start: {
          hour: 11,
          minute: 0
        },
        end: {
          hour: 12,
          minute: 15
        }
      }, {
        day: 4,
        start: {
          hour: 11,
          minute: 0
        },
        end: {
          hour: 12,
          minute: 15
        }
      }],
      assignments: [{
        id: 0,
        name: 'Assignment #1',
        classId: 0,
        dueDate: new Date(2015, 4, 19, 23, 59)
      }, {
        id: 3,
        name: 'Assignment #4',
        teacher: 'John Doe',
        classId: 0,
        dueDate: new Date(2015, 4, 19, 23, 59)
      }]
    }, {
      id: 1,
      name: 'Class #2',
      teacher: 'John Doe',
      location: 'GOL-3123',
      color: 'SlateBlue',
      meetingTimes: [{
        day: 2,
        start: {
          hour:  17,
          minute: 0
        },
        end: {
          hour: 18,
          minute: 15
        }
      }, {
        day: 4,
        start: {
          hour: 17,
          minute: 0
        },
        end: {
          hour: 18,
          minute: 15
        }
      }],
      assignments: [{
        id: 1,
        name: 'Assignment #2',
        classId: 1,
        dueDate: new Date(2015, 4, 19, 23, 59)
      }]
    }, {
      id: 2,
      name: 'Class #3',
      teacher: 'John Doe',
      location: 'GOL-3123',
      color: 'SkyBlue',
      meetingTimes: [{
        day: 1,
        start: {
          hour: 13,
          minute: 0
        },
        end: {
          hour: 13,
          minute: 50
        }
      }, {
        day: 3,
        start: {
          hour: 13,
          minute: 0
        },
        end: {
          hour: 13,
          minute: 50
        }
      }, {
        day: 5,
        start: {
          hour: 13,
          minute: 0
        },
        end: {
          hour: 13,
          minute: 50
        }
      }],
      assignments: [{
        id: 3,
        name: 'Assignment #3',
        classId: 2,
        dueDate: new Date(2015, 4, 19, 23, 59)
      }]
    }, {
      id: 3,
      name: 'Class #4',
      teacher: 'John Doe',
      color: 'Orchid',
      location: 'GOL-3123',
      meetingTimes: [{
        day: 1,
        start: {
          hour: 2,
          minute: 0
        },
        end: {
          hour: 3,
          minute: 50
        }
      }],
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
          return class_list[i];
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
