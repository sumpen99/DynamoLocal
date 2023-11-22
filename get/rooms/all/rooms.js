const SERVER = require("../../../database/dynamodb");
const GSI = require("../../../query/gsi/index");

module.exports.handler = async () => {
  try{
      const {Items} = await SERVER.documentClient.query(GSI.all_rooms_in_the_hotel()).promise();
      return SERVER.responses.sendResponse(200,{success:true,rooms:Items});
  }
  catch(err){
      return SERVER.responses.sendResponse(500,{success:false,msg:err});
  }
}