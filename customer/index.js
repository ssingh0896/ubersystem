
// All API's related to customer
const signupValidator=require('./validator/signupValidator');
const signupController=require('./controller/signupController');
const loginValidator=require('./validator/loginValidator');
const loginController=require('./controller/loginController');

app.post('/customerSignup',signupValidator.validation,signupController.signup);
app.post('/customerLogin',loginValidator.validation,loginController.login);