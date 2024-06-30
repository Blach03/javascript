const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/AGH', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const studentSchema = new mongoose.Schema({
  name: String,
  subjects: {
    type: Map,
    of: [String]
  }
});

const Student = mongoose.model('Student', studentSchema);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/students', async (req, res) => {
  const students = await Student.find({});
  const studentData = {};
  students.forEach(student => {
    studentData[student.name] = Object.fromEntries(student.subjects);
  });
  res.json(studentData);
});

app.get('/subjects', (req, res) => {
  const subjects = ['matematyka', 'informatyka'];
  res.json(subjects);
});

app.post('/submit', async (req, res) => {
  const { action, student, subject, grade } = req.body;

  const studentDoc = await Student.findOne({ name: student });
  if (!studentDoc) {
    return res.status(404).json({ error: "Student not found" });
  }

  switch (action) {
    case 'add':
      if (!studentDoc.subjects.has(subject)) {
        studentDoc.subjects.set(subject, []);
      }
      studentDoc.subjects.get(subject).push(grade);
      break;
    case 'remove':
      if (!studentDoc.subjects.has(subject) || !studentDoc.subjects.get(subject).includes(grade)) {
        return res.status(400).json({ error: "Grade or subject does not exist for this student" });
      }
      studentDoc.subjects.set(subject, studentDoc.subjects.get(subject).filter(g => g !== grade));
      break;
    case 'modify':
      if (!studentDoc.subjects.has(subject) || !studentDoc.subjects.get(subject).includes(grade)) {
        return res.status(400).json({ error: "Grade or subject does not exist for this student" });
      }
      const index = studentDoc.subjects.get(subject).indexOf(grade);
      studentDoc.subjects.get(subject)[index] = req.body.new_grade;
      break;
    default:
      return res.status(400).json({ error: "Invalid action" });
  }

  await studentDoc.save();
  res.json(Object.fromEntries(studentDoc.subjects));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
