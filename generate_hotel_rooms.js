const { nanoid } = require('nanoid')
const SERVER = require("./database/dynamodb")
//const fs = require('fs')

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const randomRoom = (index) => {
    const roomNumber = `${index}`
    const roomSize = randomIntFromInterval(1,3);
    const roomPrice = 500*roomSize;
    const id = nanoid();
    return{
        PutRequest:{
            Item: {
                PK:`ROOM#${roomNumber}`,
                SK:`${roomPrice}`,
                roomNumber:roomNumber,
                roomSize:roomSize,
                roomPrice:roomPrice,
                PK_1:  "ROOM",
                SK_1: `${roomSize}`,
                bookedDates:[],
            }
        }
    };
}

;(async function generate(){
    console.info("Start writing some hotelrooms....")
    //const AWS = require('aws-sdk');
    //AWS.config.update({region: "eu-north-1"});
    //const documentClient = new AWS.DynamoDB.DocumentClient();
    
    const data = [];
    for(let i = 0;i <20;i++){
        data.push(randomRoom(i+1));
    }

    //let json = JSON.stringify(data);
    //fs.writeFileSync('rooms.json',json);
    
    let params = {
        RequestItems: {
          [SERVER.TABLES.EXAMPLE]: data
        },
      }

    await SERVER.documentClient.batchWrite(params,(err,data) =>{
        if(err){console.info(`we got ourself some errors -> ${err}`);}
        else{console.info(`hurray, we added ${data}`);}
    }).promise();
         
})();