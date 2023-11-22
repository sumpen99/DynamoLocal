const SERVER = require("../../database/dynamodb");
const {nanoid} = require("nanoid");
const bcrypt = require("bcrypt");


const createAccount = async (username,password,userId,firstname,lastname) =>{
    try{
        const dateOfCreation = new Date().toISOString();
        await SERVER.documentClient.put({
            TableName:SERVER.TABLES.EXAMPLE,
            Item:{
                PK:userId,
                SK:lastname,
                PK_1:username,
                SK_1:`${dateOfCreation}&${firstname}#${lastname}`,
                username:username,
                password:password,
                firstname:firstname,
                lastname:lastname,
                dateOfCreation:dateOfCreation
            }
        }).promise();

        return {success:true,userId:userId}
    }
    catch(error){ return {success:false,message:`Could not create account see error [${error}]`} }
}

const signUp = async (username,password,firstname,lastname) =>{
    try{
        const hash = await bcrypt.hash(password,10);
        if(!hash){ return {success:false,message:"Unexpected error... oops"};}
        const userId = nanoid();
        return createAccount(username,hash,userId,firstname,lastname);
    }
    catch(error){  return {success:false,message:error} }
}

exports.handler = async (event) =>{

    const {username,password,firstname,lastname} = event;

    const result = await signUp(username,password,firstname,lastname);

    if(result.success){ return SERVER.responses.sendResponse(200,result) }

    return SERVER.responses.sendResponse(400,result);
}