const CronJob = require("node-cron")
const scheduleServices = require("../service/sheduleServices")
const driverservice = require("../../driver/services/bookingservices")
const ngrok = require("ngrok")


let fun = async () => {

    let driverid = await scheduleServices.nearDriver()
    let email = []
    for (let i = 0; i < driverid.length; i++) {
        let result = await driverservice.driver_emailid(driverid[i])
        email.push(result[0].email)
    }
    for (let i = 0; i < email.length; i++)
   setInterval(()=>console.log(email[i]), 5000) 

}
fun()

exports.accept = (email)=>
{
   await driverservice.statusUpdate(email)
   clearInterval(timerid)
}
let reject = ()=>
{
 fun()
}

 //scheduleServices.sendEmail(email[i])