var express = require('express');
const users = require('../database/users');
const USERS = users.model;
const USERSCHEMA = users.schema;
var valid = require("../utils/valid");
var router = express.Router();

router.post('/user',async(req,res) => {
  var params = req.body;
  params["registerdate"]= new Date();
  if(!valid.checkParams(USERSCHEMA, params)){
    res.status(300).json({
      msn:"parametros incorrectos"
    });
    return;
  }
  if(!valid.checkEmail(params.email)) {
    res.status(300).json({
    msn:"Email invalido"
  });
  return;
}
if(!valid.checkPassword(params.password)) {
  res.status(300).json({
  msn:"password invalido"
});
return;
}
  var users = new USERS(params);
  var result = await users.save();
  res.status(200).json(result)
});

 router.get("/user",(req, res)=> {
   var params = req.query;
   console.log(params);
   var limit = 100;
   if(params.limit != null){
     limit = parseInt(params.limit);
   }
   var order = -1;
   if(params.order != null){
     if(params.order == "desc"){
      order = -1;
 } else if (params.order =="asc"){
   order = 1;
 }
}
var skip = 10;
if(params.skip != null){
  skip = parseInt(params.skip);
}
USERS.find({}).limit(limit).sort({_id:order}).skip(skip).exec((err,docs)=>{
  res.status(200).json(docs);
});
});

router.patch("/user",(req,res)=>{
  if(req.query.id == null){
    res.status(300).json({
      msn:"Error no existe id"
    });
    return;
  }
  var id = req.query.id;
  var params = req.body;
  USERS.findOneAndUpdate({_id:id},params,(err,docs)=>{
    res.status(200).json(docs);
  });
});

router.delete("/user",async(req,res)=>{
  if(req.query.id == null){
    res.status(300).json({
      msn:"error no existe id "
    });
    return;
  }
  var r = await USERS.remove({_id:req.query.id});
  res.status(300).json(r);
});
module.exports = router;
