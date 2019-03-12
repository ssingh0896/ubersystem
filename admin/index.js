// All API's related to admin

const loginValidator=require('./validator/loginValidator');
const loginController=require('./controller/loginController')
const  adminservices = require('./services/adminservice')
const assignbooking = require("./controller/assginBooking")

app.post('/adminLogin',loginValidator.validation,loginController.login);
app.get('/getcustomer',adminservices.getAllCustomer)
app.get('/getdriver',adminservices.getAllDrivers)
app.get('/freecustomer',adminservices.getfreeCustomer)
app.get('/freedriver',adminservices.getfreeDriver)
app.post('/confirmbooking',assignbooking.assignBooking)
app.get('/allbookingdetails',assignbooking.getAllBookingDetails)
app.get('/neardriver',assignbooking.getNearDrivers)