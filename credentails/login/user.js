const SERVER = require("../../database/dynamodb")
const {user_by_username} = require("../../query/gsi/index");
const {generateToken} = require("../../credentails/token/authentication")
const bcrypt = require("bcrypt");

const tokenCreation = (user) =>{
    const payload = {
        firstname:user.firstname,
        lastname:user.lastname,
        dateOfCreation:user.dateOfCreation,
    }
    const token = generateToken(payload);
    if(token){return {success:true,token:token}}
    return {success:false,message:token,token:"We got Zero Nada In Token"}
}

const getUser = async (username) =>{
    try{
        const {Items} = await SERVER.documentClient.query(user_by_username(username)).promise();
        if(Items){ 
            if(Items.length > 1){  console.info("someone messed up the database, username should only have one 1!"); }
            return {hasUser:true,user:Items[0]} 
        }
        return {hasUser:false,message:""};
    }
    catch(error){ return {hasUser:false,message:error}; }
}

const login = async (username,password) =>{
    const result = await getUser(username);
    if(!result.hasUser){ return {success:false,message: "Incorrect username or password",op:result.message};}
    const user = result.user;
    try{
        const correctPassword = await bcrypt.compare(password,user.password);
        if(!correctPassword){ return {success:false,message:"Incorrect username or password"};}
        return tokenCreation(username);
    }
    catch(error){ return {success:false,message:error} }
}

exports.handler = async (event) =>{

    const {username,password} = event;

    const result = await login(username,password);

    if(result.success){ return SERVER.responses.sendResponse(200,result) }

    return SERVER.responses.sendResponse(400,result);
}