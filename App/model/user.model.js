const db = require('./db');
const express = require('express');
const jwt = require('jsonwebtoken');
var  promise = require('promise');
var dateFormat = require('dateformat');

var rowsNumber=0;
db.con.connect(function(err){
  if(err){
    console.log("Baglanti Basarisiz");
  }
  else
    console.log('Connect');
    //console.log(dateFormat(now,"dd,mm,yyyy,h:MM:ss TT"));
});

exports.UserList = function(req){
  return new promise(function(resolve,reject){
    db.con.query("SELECT * FROM tbluser Where Active = 'True' ",function(err,result){
      if(!err){
        console.log(JSON.parse(JSON.stringify(result)));
        resolve(JSON.parse(JSON.stringify(result)));
      }
      else
        console.log("Kullanici listeleme hatali calisti");
    });
  });
};

exports.UserInsert = function(req){
  return new Promise(function(resolve, reject){
   //req.createDate = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
   var username = req.UserName;
   console.log(username);
    db.con.query('SELECT Count(*) as Sonuc FROM tbluser where UserName = ?',username,function(err,result){
      if(!err){
        rowsNumber = result[0].Sonuc;
        if(rowsNumber>=1){
          console.log("Ayni kullanici adi mevcut");  
          resolve(JSON.parse(JSON.stringify({state:'Caught match'})));        
        }
        else{
          console.log(rowsNumber);
          req.AccountDate = dateFormat(Date(),"dd,mm,yyyy, h:MM:ss TT");
          req.UpdateDate = "NULL";
          req.DeleteDate = "NULL";
          req.Active = "True";  
          db.con.query('INSERT INTO tbluser SET ?',req ,function (err, result){
            if (!err)
            {
              if(result.affectedRows>0)
              { 
                console.log('User Insert');
                resolve(JSON.parse(JSON.stringify({state:'Insert Success'})));
              }
              else
              {
                console.log('User Not Insert');
                resolve(JSON.parse(JSON.stringify({state:'Insert Unsuccess'})));
              }
            } 
            else 
            {
              reject(err);
            }
        });
        }
      }
    });   
});
};

exports.UserUpdate = function(req){
  return new Promise(function(resolve, reject){
   //req.createDate = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
   var username = req.UserName;
   console.log(username);
   var param=[
     req,
     username
   ]        
          req.UpdateDate = dateFormat(Date(),"dd,mm,yyyy, h:MM:ss TT");  
          db.con.query('UPDATE tbluser SET ? Where UserName = ?',param,function (err, result){            
            if (!err)
            {
              if(result.affectedRows>0)
              { 
                console.log('User Update');
                resolve(JSON.parse(JSON.stringify({state:'Update Success'})));
              }
              else
              {
                console.log('User Not Update');
                resolve(JSON.parse(JSON.stringify({state:'Update Unsuccess'})));
              }
            } 
            else 
            {
              reject(err);
            }
        });     
           
});
};

exports.UserDelete = function(req){
  return new Promise(function(resolve, reject){
   //req.createDate = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
   var username = req.UserName;
   console.log(username);
   var param=[
     req,
     username
   ]        
          req.DeleteDate = dateFormat(Date(),"dd,mm,yyyy, h:MM:ss TT");
          req.Active ="False";  
          db.con.query('UPDATE tbluser SET ? Where UserName = ?',param,function (err, result){            
            if (!err)
            {
              if(result.affectedRows>0)
              { 
                console.log('User Delete');
                resolve(JSON.parse(JSON.stringify({state:'Delete Success'})));
              }
              else
              {
                console.log('isnt Deleted');
                resolve(JSON.parse(JSON.stringify({state:'Delete Unsuccess'})));
              }
            } 
            else 
            {
              reject(err);
            }
        });     
           
});
};

exports.UserLogin = function(req){
  var params=[
    req.UserName,
    req.Pass
  ];  
  return new promise(function(resolve,reject){    
    if(db.Data.UserName == null && db.Data.Pass == null && db.Data.UserId == null){
      db.con.query("SELECT * FROM tbluser WHERE UserName = ? AND Pass = ?",params,function(err,result){
        if(!err){
          if(result[0]){
            db.Data.UserId =result[0].UserId;
            db.Data.UserName = result[0].UserName;
            db.Data.Pass = result[0].Pass;
            db.Data.Active = result[0].Active; 
            console.log(db.Data.UserId);           
            console.log("UserId = "+db.Data.UserId+" UserName = "+db.Data.UserName);
            const token = jwt.sign(
              {
                email:req.email,
                password:req.password
              },
              'secret_key',
              {
                expiresIn:'12h'
              }
            );
            console.log(token);
          resolve(JSON.parse(JSON.stringify({state: 'Access Success',token: token})));
            //resolve(JSON.parse(JSON.stringify({state: 'Login Succes'})));
          }
          else{
            resolve(JSON.parse(JSON.stringify({state:'Denied'})));
            console.log("Access Denied");
          }
        }
        else{
          console.log("hata mesajı");
          reject(err);
        }
      });    
    }
    else{
      resolve(JSON.parse(JSON.stringify({state: 'Zaten giris yapilmis'})));
      console.log("Sorgu calismadi");
      reject(err);
    }
  });
};

exports.UserExit = function(req){
  return new promise(function(resolve,reject){
    db.Data.UserId = null;
    db.Data.UserName = null;
    db.Data.Pass = null;
    //console.log("UserId = "+db.Data.UserId+" UserName = "+db.Data.UserName);
    resolve(JSON.parse(JSON.stringify({state: 'Exit Succes'})));
  });
};