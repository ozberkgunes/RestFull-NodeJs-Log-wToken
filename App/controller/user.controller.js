  const UserModel = require('../model/user.model');
  const info = require('../model/db');
  const Logger = require('../middleware/logService');
  const logger = new Logger('app'); 
  const db = require('../model/db');
  var express = require('express');
  let reqBody;
  
  exports.Login = function(req,res,next){
    //db.Data = req.body;
    UserModel.UserLogin(req.body)
    .then(result=>{res.send(result);})
    .catch(err=>{
      res.send('error'+ err);
    });
    reqBody = req.body;
    logger.setLogData(reqBody)
    logger.info("Request recieved at /Login",reqBody)
    let error = {};
    if (reqBody.UserName == null || reqBody.UserName == "") {
    logger.error("UserName field is empty")
    error["UserName"] = "UserName field is empty"
    }
  }
  exports.Insert = function(req,res,next){
    UserModel.UserInsert(req.body)
    .then(result=>{res.send(result);})
    .catch(err=>{
      res.send('error'+ err);
    });
    reqBody = req.body;
    logger.setLogData(reqBody)
    logger.info("Request recieved at /Insert",reqBody)
    let error = {};
    if (reqBody.UserName == null || reqBody.UserName == "") {
    logger.error("UserName field is empty")
    error["UserName"] = "UserName field is empty"
    }

  }
  
  exports.List= function(req,res,next){
    UserModel.UserList()
    .then(result=>{res.send(result);})
    .catch(err=>{
      res.send('error'+err);
    });
    reqBody = req.body;
    logger.setLogData(reqBody)
    logger.info("Request recieved at /List",{username : info.Data.UserName})
    let error = {};
    if (info.Data.UserName == null || info.Data.UserName == "") {
    logger.error("UserName field is empty")
    error["UserName"] = "UserName field is empty"
    }
  
  }

  exports.Update = function(req,res,next){
    UserModel.UserUpdate(req.body)
    .then(result=>{res.send(result);})
    .catch(err=>{
      res.send('error'+ err);
    });
    
    reqBody = req.body;
    logger.setLogData(reqBody)
    logger.info("Request recieved at /Update",reqBody)
    let error = {};
    if (reqBody.UserName == null || reqBody.UserName == "") {
    logger.error("UserName field is empty")
    error["UserName"] = "UserName field is empty"
    }
  }
  exports.Delete = function(req,res,next){
    UserModel.UserDelete(req.body)
    .then(result=>{res.send(result);})
    .catch(err=>{
      res.send('error'+ err);
    });
    
    reqBody = req.body;
    logger.setLogData(reqBody)
    logger.info("Request recieved at /Delete",reqBody)
    let error = {};
    if (reqBody.UserName == null || reqBody.UserName == "") {
    logger.error("UserName field is empty")
    error["UserName"] = "UserName field is empty"
    }
  }
  exports.Exit = function(req,res,next){
    UserModel.UserExit(req.body)
    .then(result=>{res.send(result);})
    .catch(err=>{
      res.send('error'+ err);
    });
    
    reqBody = req.body;
    logger.setLogData(reqBody)
    logger.info("Request recieved at /Exit",{UserName : info.Data.UserName});
    let error = {};
    if (reqBody.UserName == null || reqBody.UserName == "") {
    logger.error("UserName field is empty")
    error["UserName"] = "UserName field is empty"
    }
  }