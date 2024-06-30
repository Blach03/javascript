use('AGH');

db.students.insertMany([
  { firstName: 'John', lastName: 'Doe', faculty: 'WI' },
  { firstName: 'Jane', lastName: 'Smith', faculty: 'WIET' },
  { firstName: 'Jim', lastName: 'Beam', faculty: 'WMS' },
  { firstName: 'Jill', lastName: 'Stark', faculty: 'WI' }
]);

db.students.find({ faculty: 'WI' });
