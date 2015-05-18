angular.module('homework.services', [])

.factory('Classes', function(Assignments) {
  // Might use a resource here that returns a JSON array

  var class_id = 0;
  var class_list = {}

  // If the class list does not exist in storage
  if (!localStorage.class_list) {
    // Some fake testing data
    var classes = [{
      id: 0,
      name: 'Foundations of Mobile Design',
      teacher: 'Bryan French',
      location: 'GOL-3123', 
      color: 'SpringGreen',
      start: new Date(2015, 0, 26),
      end: new Date(2015, 4, 13),
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
      assignments: [2]
    }, {
      id: 1,
      name: 'SE Project II',
      teacher: 'Samuel Malachowsky',
      location: 'GOL-1400',
      color: 'SlateBlue',
      start: new Date(2015, 0, 26),
      end: new Date(2015, 4, 13),
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
      assignments: [1]
    }, {
      id: 2,
      name: 'Trends in Software Development Process',
      teacher: 'Samuel Malachowsky',
      location: 'GOL-1650',
      color: 'SkyBlue',
      start: new Date(2015, 0, 26),
      end: new Date(2015, 4, 13),
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
      assignments: [0, 3]
    }, {
      id: 3,
      name: 'Wines of the World II',
      teacher: 'Lorraine Hems',
      color: 'Orchid',
      start: new Date(2015, 0, 26),
      end: new Date(2015, 4, 13),
      location: 'EAS-4125',
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

  var save = function(class_list){
    localStorage.class_list = JSON.stringify(class_list);
  }

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
    },
    getClassForAssignment: function(classId) {
      for (var i = 0; i < class_list.length; i++) {
        if (class_list[i].id === parseInt(classId)) {
          var class_item = {};
          class_item.name = class_list[i].name;
          class_item.color = class_list[i].color;

          return class_item;
        }
      }
      return null;
    },
    create: function(classJson) {
      //Calculate the max class id
      var max = 0;
      for (var i = class_list.length - 1; i >= 0; i--) {
        if(class_list[i].id > max){
          max = class_list[i].id;
        }
      };

      // Set the id
      var class_id = max + 1;
      classJson.id = class_id;

      // Initialize assigments array
      classJson.assignments = []

      // TODO Remove me
      classJson.meetingTimes = []

      class_list.push(classJson);
      save(class_list);
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
    dueDate: moment().set({'year': 2015, 'month': 4, 'date': 13, 'hour': 23, 'minute': 59, 'second': 59}),
    isCompleted: true,
    notes: null,
    grade: 88
  }, {
    id: 1,
    name: 'Assignment #2',
    classId: 0,
    dueDate: moment().set({'year': 2015, 'month': 4, 'date': 15, 'hour': 23, 'minute': 59, 'second': 59}),
    isCompleted: false,
    notes: null,
    grade: null
  }, {
    id: 2,
    name: 'Assignment #3',
    classId: 1,
    dueDate: moment().set({'year': 2015, 'month': 4, 'date': 19, 'hour': 23, 'minute': 59, 'second': 59}),
    isCompleted: false,
    notes: null,
    grade: null
  }, {
    id: 3,
    classId: 2,
    name: 'Assignment #4',
    dueDate: moment().set({'year': 2015, 'month': 4, 'date': 13, 'hour': 23, 'minute': 59, 'second': 59}),
    isCompleted: true,
    notes: null,
    grade: 92
  }];

  return {
    all: function() {
      /*
      for (var i = 0; i < assignments.length; i++) {
        assignments[i].class = Classes.getClassForAssignment(assignments[i].classId);
        delete assignments[i].classId;
      }
      */
      return assignments;
    },
    remove: function(assignment) {
      assignments.splice(assignments.indexOf(assignment), 1);
    },
    get: function(assignmentId) {
      for (var i = 0; i < assignments.length; i++) {
        if (assignments[i].id === parseInt(assignmentId)) {
          var assignment = assignments[i];
          // assignment.class = Classes.getClassForAssignment(assignment.classId);
          // delete assignment.classId;

          return assignment
        }
      }
      return null;
    },
    create: function(assignmentJson) {
      //Calculate the max assignment id
      var max = 0;
      for (var i = assignments.length - 1; i >= 0; i--) {
        if(assignments[i].id > max){
          max = assignments[i].id;
        }
      };

      // Set the id
      var assignment_id = max + 1;
      assignmentJson.id = assignment_id;

      assignments.push(assignmentJson);
      save(assignments);
    }
  };
});
