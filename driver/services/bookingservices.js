const dbHandler    =   require("../../services/dbHandler")
const promise      =   require("bluebird")
const mongoHandler =   require("../../services/mongoHandler")

exports.bookingComplete = (driverid)=>
{
    return new Promise((resolve, reject)=>{
        promise.coroutine(function * (){
            let query1= `SELECT rating FROM booking WHERE  driverid=${driverid} AND bookingstatus=1`
            let rating= yield dbHandler.dbHandlerPromise(query1)
            let query2=`SELECT total_rating, no_of_trips FROM driver`;
            let res=yield dbHandler.dbHandlerPromise(query2)
            let totalrating=res[0].total_rating+rating[0].rating;
            let totaltrips =res[0].no_of_trips+1;
            let avg_rating=totalrating/totaltrips;
            let query=`UPDATE driver d,booking b SET d.status=0,b.bookingstatus=0,d.total_rating=${totalrating},d.no_of_trips=${totaltrips},d.avg_rating=${avg_rating} where d.id=${driverid} AND b.driverid=${driverid} AND d.status=1`;
            let result = yield dbHandler.dbHandlerPromise(query)
            if(result.affectedRows==0)
            reject({
                "mgs":"error during complete booking"
            })
            resolve(result)
           // mongoHandler.addCompletionTime(driverid);
        })()
    })
}

exports.driver_id = (opts) => {
    return new Promise((resolve, reject) => {
        promise.coroutine(function* () {
            let values=[];
            values.push(opts);
            const query = 'SELECT id FROM driver WHERE access_token=?';
            let result = yield dbHandler.dbHandlerPromise(query, values)
            resolve(result)
        })();
    })
}
