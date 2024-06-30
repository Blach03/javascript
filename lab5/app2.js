/**
 * @author Stanisław Polak <polak@agh.edu.pl>
 */
 
import express from 'express';
import morgan from 'morgan';

/* *************************** */
/* Configuring the application */
/* *************************** */
const app = express();

app.locals.pretty = app.get('env') === 'development';

/* ************************************************ */

app.use(morgan('dev')); 

app.set('view engine', 'pug');
app.set('views', './views');


/* ******** */
/* "Routes" */
/* ******** */

/* ------------- */
/* Route 'GET /' */
/* ------------- */
app.get('/', (request, response) => {
    response.render('index'); 
});

/* ************************************************ */

app.listen(8000, () => {
    console.log('The server was started on port 8000');
    console.log('To stop the server, press "CTRL + C"');
});          