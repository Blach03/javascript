const http = require('http');
const { URL } = require('url');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

const studentsFile = path.join(__dirname, 'students.json');
const subjectsFile = path.join(__dirname, 'subjects.json');

function readJsonFileSync(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (error) {
    return {};
  }
}

function writeJsonFileSync(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

const server = http.createServer((req, res) => {
  const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);
  
  if (req.method === 'GET' && pathname === '/') {

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <html>
      <body>
        <h1>Student Grades Management</h1>
        <form action="/submit" method="POST">
          <label for="student">Student:</label>
          <select name="student">
            ${Object.keys(readJsonFileSync(studentsFile)).map(name => `<option value="${name}">${name}</option>`).join('')}
          </select><br>

          <label for="subject">Subject:</label>
          <select name="subject">
            ${Object.keys(readJsonFileSync(subjectsFile)).map(name => `<option value="${name}">${name}</option>`).join('')}
          </select><br>

          <label for="grade">Grade:</label>
          <input type="text" name="grade"><br>

          <input type="radio" name="action" value="add" checked>Add
          <input type="radio" name="action" value="remove">Remove
          <input type="radio" name="action" value="modify">Modify<br>

          <input type="submit" value="Submit">
        </form>
      </body>
      </html>
    `);
    res.end();
  } else if (req.method === 'POST' && pathname === '/submit') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      const { student, subject, grade, action } = parse(body);
      const students = readJsonFileSync(studentsFile);
      const subjects = readJsonFileSync(subjectsFile);

      if (!students[student] || !subjects[subject]) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid student or subject');
        return;
      }

      if (action === 'add') {
        students[student][subject] = students[student][subject] || [];
        students[student][subject].push(grade);
      } else if (action === 'remove') {
        if (students[student][subject]) {
          const index = students[student][subject].indexOf(grade);
          if (index !== -1) students[student][subject].splice(index, 1);
        }
      } else if (action === 'modify') {
        if (students[student][subject] && students[student][subject].length > 0) {
          students[student][subject][0] = grade;
        }
      }

      writeJsonFileSync(studentsFile, students);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Grade updated successfully');
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(8000, () => console.log('Server listening on port 8000'));
