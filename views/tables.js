const dbHandler = require('./../services/dbHandler');
const handlebars =require('handlebars')
const fs=require('fs');

exports.fetchData=fetchData;

async function fetchData(req,res){
    try {
    let query='SELECT * FROM booking';
    let data=await dbHandler.dbHandlerPromise(query);
    let datas ={bookingid:[],customerid:[],driverid:[],bookingstatus:[],tolat:[],fromlat:[],tolon:[],fromlon:[],ad_id:[],rating:[],feedback:[]};
    data.forEach(element=>{
        datas.bookingid.push({bookingid:element.bookingid,customerid:element.customerid,driverid:element.driverid,bookingstatus:element.bookingstatus,tolat:element.tolat,tolon:element.tolon,fromlat:element.fromlat,fromlon:element.fromlon,ad_id:element.ad_id,rating:element.rating,feedback:element.feedback});
    })
    let source = "<table border=1><tr><th>bookingid</th><th>customerid</th><th>driverid</th><th>bookingstatus</th><th>tolat</th><th>tolon</th><th>fromlat</th><th>fromlon</th><th>ad_id</th><th>rating</th><th>feedback</th></tr>{{#bookingid}}" +
            "<tr><td>{{bookingid}} </td>"+
            "<td>{{customerid}} </td>"+
            "<td>{{driverid}} </td>"+
            "<td>{{bookingstatus}} </td>"+
            "<td>{{tolat}} </td>"+
            "<td>{{tolon}} </td>"+
            "<td>{{fromlat}} </td>"+
            "<td>{{fromlon}} </td>"+
            "<td>{{ad_id}} </td>"+
            "<td>{{rating}} </td>"+
            "<td>{{feedback}}</td></tr>{{/bookingid}}</table>";
    res.render('./table.hbs')
    let templates=handlebars.compile(source);
    var result=templates(datas);
    fs.writeFileSync("./views/table.hbs",result,"utf8");
    console.log(result);
    }
    catch(err){
        console.log(err);
    };
}