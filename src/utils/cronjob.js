const cron = require('node-cron');
// CRONTAB FOR REFERENCE

// * * * * * which means you are excluding seconds
//* * * * * * this will trigger on evry second 
// User crontab for the exact expression

cron.schedule("* * * * *",()=>{
    try{
 // BULL MQ TO HANDLE THE MULTIPLE CRONS IN BACTHES
    }
    catch{
        console.log("Caught error while creating cron job")
    }
})