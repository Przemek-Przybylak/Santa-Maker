const express = require('express');
const {create} = require('express-handlebars');
const methodOverride = require('method-override');
const {homeRouter} = require("./routers/home");
const {tasksRouter} = require("./routers/tasks");
const {handleError} = require("./utils/error");

const app = express();

const hbs = create({
    extname: '.hbs'
});

app.use(methodOverride('_method'));
app.use(express.json());

app.use(express.urlencoded({
    extended: true,
}));

app.use(express.static('public'));

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');


app.use(handleError);

app.listen(3000, 'localhost', () => {
    console.log('Listening on http://localhost:3000')
})
