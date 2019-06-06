
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi  = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const signup = require("./admin/controller/signupController");
const mongo = require("./services/mongoHandler");

const exphbs  = require('express-handlebars');
app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

require('./customer');
require('./booking');
require('./driver');
require("./admin");


const table=require('./views/tables');
app.engine('.hbs', exphbs({ extname: '.hbs'}));
app.set('view engine', '.hbs');

app.set('view engine', 'handlebars')
app.get('/handlebars',table.fetchData);
app.use('/uber', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000,()=>
{
    signup.signup1();
    signup.signup2();
    //mongo.mongo();
});
