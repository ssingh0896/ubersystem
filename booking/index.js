
const bookingValidator=require('./validator/bookingValidator');
const bookingController=require('./controller/bookingController');
const ratingvalidator = require('./validator/ratingValidator')
const rating  = require('./controller/bookingController')

app.post('/booking',bookingValidator.validation,bookingController.booking);
app.post('/rating',ratingvalidator.rating,rating.rating);