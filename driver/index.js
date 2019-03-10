const signupValidator=require('./validator/signupValidator');
const signupController=require('./controller/signupController');
const loginValidator=require('./validator/loginValidator');
const loginController=require('./controller/loginController');
const bookingComplete = require("./controller/bookingcomplete")

app.post('/driverSignup',signupValidator.validation,signupController.signup);
app.post('/driverLogin',loginValidator.validation,loginController.login);
app.post('/bookingComplete',bookingComplete.completeBooking)