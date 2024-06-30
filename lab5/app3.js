import express from 'express';
import morgan from 'morgan';
import { MongoClient } from 'mongodb';

const app = express();

const uri = "mongodb://localhost:27017"; 
const client = new MongoClient(uri);

async function getStudents() {
    try {
        await client.connect();
        const database = client.db('AGH');
        const students = database.collection('students');
        return await students.find({}).toArray();
    } finally {
        await client.close();
    }
}

app.locals.pretty = app.get('env') === 'development';
app.set('view engine', 'pug');
app.set('views', './views');
app.use(morgan('dev')); 

app.get('/', async (request, response) => {
    const students = await getStudents();
    response.render('index2', { students }); 
});

app.listen(8000, () => {
    console.log('The server was started on port 8000');
    console.log('To stop the server, press "CTRL + C"');
});
