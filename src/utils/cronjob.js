const cron = require('node-cron');
// CRONTAB FOR REFERENCE

cron.schedule("* * * * *",()=>{
    try{
 // BULL MQ TO HANDLE THE MULTIPLE CRONS IN BACTHES
    }
    catch{
        console.log("Caught error while creating cron job")
    }
})