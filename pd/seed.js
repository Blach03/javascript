const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/AGH', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const studentSchema = new mongoose.Schema({
  name: String,
  subjects: Map
});

const Student = mongoose.model('Student', studentSchema);

const seedData = async () => {
  await Student.deleteMany({});

  const students = [
    {
      name: 'Kamil',
      subjects: {
        informatyka: ['2', '3'],
        matematyka: ['4']
      }
    },
    {
      name: 'Anna',
      subjects: {
        informatyka: ['3'],
        matematyka: ['2']
      }
    }
  ];

  for (const studentData of students) {
    const student = new Student(studentData);
    await student.save();
  }

  console.log('Database seeded!');
  mongoose.connection.close();
};

seedData();
