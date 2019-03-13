
const bookingValidator=require('./validator/bookingValidator');
const bookingController=require('./controller/bookingController');
const rating  = require('./controller/bookingController')

app.post('/booking',bookingValidator.validation,bookingController.booking);
app.post('/rating',bookingValidator.rating,rating.rating);