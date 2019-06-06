
const dbHandler = require('../../services/dbHandler')
const nodmailer = require("nodemailer")
const otp = require("otp-generator")
const promise = require("bluebird")

exports.sendEmail =  (email)=>
{
   
    return new Promise((resolve,reject)=>{
        promise.coroutine(function *(){
        let smptTransport = nodmailer.createTransport({
            service: 'SendGrid',
        auth: {
          user: 'luckybansal13.lb@gmail.com',
          pass: 'Lucky@123'
        }
        })
       let code = otp.generate(4, { digits: true, alphabate: false, upperCase: false, specialChars: false });
      
        var mailOptions = {
            to: email,
            from: 'bookingotp@demo.com',
            subject: 'Opt for booking accept',
            text: 'confirm the booking '+code
          };
        let sendMail= yield smptTransport.sendMail(mailOptions)
        console.log(sendMail)
        resolve(sendMail)
    })()
    })

}

// exports.nearDriver = () => {
//    return new Promise(async(resolve, reject) => {
//       const query = `SELECT d.id,d.name, 
//       3959 * 
//       DEGREES(ACOS(LEAST(COS(RADIANS(d.latitude)) 
//       * COS(RADIANS(b.to_latitude)) 
//       * COS(RADIANS(d.Longitude - b.to_longitude)) 
//       + SIN(RADIANS(d.latitude)) 
//       * SIN(RADIANS(b.to_latitude)), 1.0))) AS distance 
//       FROM driver AS d 
//       JOIN booking AS b ON d.id = b.driverid`;
//       let result = await dbHandler.dbHandlerPromise(query);
//       resolve(result);
      
//    })
// }

exports.nearDriver = () => {
    return new Promise(async(resolve, reject) => {
       const query = `SELECT 
       id,( 
       3959 * 
       acos(cos(radians(37)) * 
       cos(radians(latitude)) * 
       cos(radians(longitude) - 
       radians(-122)) + 
       sin(radians(37)) * 
       sin(radians(latitude ))) 
       ) AS distance 
       FROM driver
       ORDER BY distance LIMIT 0, 20`;
       let result = await dbHandler.dbHandlerPromise(query);
       let arr=[]
       for(let i=0;i<result.length;i++)
        arr.push(result[i].id)
        resolve(arr)   
     })
 }




// SELECT 
// id,( 
// 3959 * 
// acos(cos(radians(37)) * 
// cos(radians(latitude)) * 
// cos(radians(longitude) - 
// radians(-122)) + 
// sin(radians(37)) * 
// sin(radians(latitude ))) 
// ) AS distance 
// FROM driver
// ORDER BY distance LIMIT 0, 20