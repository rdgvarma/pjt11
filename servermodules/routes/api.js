const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

var db = "mongodb://192.168.1.55:27017/gopal";

//user input data schemas link
const Formdata = require('../models/feeddata');
const Userping = require('../models/pingdata');
const UserGfi = require ('../models/gfidata');


//machine input data schema link
const mchdata = require('../models/machinedate');
const packetone = require('../models/packtone');
const packettwo = require ('../models/packtwo');
const packetthree = require ('../models/packthree');
const packetfour = require ('../models/packfour');
const packetfive = require ('../models/packfive');

//FD OnDemand Configuration Update (CONF data schema)
const config = require('../models/conf.data');
const confres = require('../models/confpacktRes');
const pconfresdata = require('../models/confrecdata')

//127.0.0.1
//connect to mongodb
mongoose.Promise = global.Promise;
mongoose.connect(db, { useUnifiedTopology: true,useNewUrlParser: true,
    useFindAndModify: false
      });

mongoose.connect(db,err => {
    if(err){
        console.log("ERROR : "+err);
    }else{
        console.log("connected to the db");
    }
})

var mpudid;
var mgwid;
var murl_token_id;
var CTN;
var CTN1;
var userSystime;
var count = -1;
var countarray = [];
var transactionNo = 1001;
var testercount;
var spcatd;
var confgwid;

 

/* -------> getting 4 different post 
    requests and saving it into
     database starts here <--------
*/


//getting conf data from user starts here .

    router.post('/feed-dis/conf-data',(req,res) => {
         console.log("line 61 : "+ JSON.stringify(req.body));
         confgwid = req.body.gwid;
      
        const a = (req.body.csv[1]);
        var arr = a.split(',');
        var arraycsvdata = []
        arr.forEach(element => console.log("line 66 : "+ arraycsvdata.push(element) ) );
        var slc = arraycsvdata[12];
        var rest = slc.slice(1,3);
        //console.log("slice 30 : "+ rest)
        var cls= arraycsvdata[15];
        var tser = cls.slice(0,3);
        console.log("slice 120 : "+ tser);
        console.log("li 70 : "+ arraycsvdata[12]+","+arraycsvdata[13]+","+arraycsvdata[14]+","+arraycsvdata[15]);
        spcatd = rest+","+arraycsvdata[13]+","+arraycsvdata[14]+","+tser;
        console.log("spcatd : "+ spcatd);
     
        var user = new config({
            udid : req.body.udid,
            gwid : req.body.gwid,
            seedcount : arraycsvdata[0],
            totslots: arraycsvdata[1],
            starttime: arraycsvdata[2],
            slotinterval: arraycsvdata[3],
            totfeedfortoday: arraycsvdata[4],
            slot_1: arraycsvdata[5],
            slot_2: arraycsvdata[6],
            slot_3: arraycsvdata[7],
            slot_4: arraycsvdata[8],
            slot_5: arraycsvdata[9],
            slot_6: arraycsvdata[10],
            fav: arraycsvdata[11],
            atd : spcatd,
        })
    
        user.save(function(err) {
            if (err) throw err;
            else 
            console.log('save user successfully...');
        });
        res.status(200).send({'message':'data received '})
    
    })

//getting conf data from user ends here .

// getting DF data from user (udid/gwid/weight/time) start **
router.post('/feed-dis/data',(req,res)=>{
    console.log(req.body);
   userSystime = req.body.usersystime;
   mpudid = req.body.udid;
   console.log("line no 43  : "+ mpudid);
    var user = new Formdata({
        udid: req.body.udid,
        gwid: req.body.gwid,
        name: req.body.name,
        weight : req.body.weight,
        time : req.body.time,
        usersystime : req.body.usersystime,  
    });
    //saving user to mongodb
    user.save(function(err) {
        if (err) throw err;
        else 
        console.log('save user successfully...');
    });
    res.status(200).send({'message':'data received '})

})
//getting DF data from user (udid/gwid/weight/time) end **


//getting the PING data and saving it into db (gwid/udid/name) starts **

    router.post('/feed-dis/ping-data',(req,res)=>{
        console.log(req.body);
        let ping = req.body;
        let userping = new Userping(ping);
        userping.save((err,doc)=>{
            if(!err){
                console.log(doc);
                res.status(200).send({"message":"sucessfully saved the ping data"})
            }else{
                console.log("ERROR : "+err);
                res.status(500).send({"message": "there is an error while saving the data to db"});
            }
        })
    })

//getting the PING data and ssaving it into db (gwid/udid/name) ends **


// getting the GFI data and saving it into db (gwid/udid/name) starts ***
router.post('/feed-dis/gfi-data',(req,res)=>{
    console.log(req.body);
    let gfidta = req.body;
    let userGfi = new UserGfi(gfidta);
    userGfi.save((err,doc)=>{
        if(!err){
            console.log(doc);
            res.status(200).send({"message":"sucessfully saved the gfi data"})
        }else{
            console.log("ERROR : "+err);
            res.status(500).send({"message": "there is an error while saving the data to db"});
        }
    })
})
// getting the GFI data and saving it into db (gwid/udid/name) ends ***

/* 
-------> getting 4 different post 
        requests and saving it into
         database ends here 
<--------
*/

//getting request from the machine (gwid) (gwid/udid/URL_TOKEN_ID) start **
router.get("/feed-dispencer",function(req,res){
    mgwid = req.query.GWID;
    mudid = req.query.UDID;
    murl_token_id = req.query.URL_TOKEN_ID;

    console.log("mgwid : line 66 :  "+ mgwid);

    if(mudid == undefined & murl_token_id == undefined){
        console.log("entered into line 187 the step one");
        stepone(req,res);
    }else {
        if (murl_token_id == "DF"){
        console.log("step 2 line 190 should start");
        second(req,res);
        }else if ( murl_token_id == "CONF" ) {
        console.log("step 3 line 193 should start");
        third(req,res);
        }
    }
})
//getting request from the machine (gwid/udid) end **

//first step
function stepone(req,res){
    var machine = new mchdata({
        gwid : mgwid       
    });
    machine.save(function(err) {
        if (err) throw err;
        else 
        console.log('save user successfully...');
    });
    methordcheckone(req,res);
}
//first step



//methord to check whether the user data & machine data is same or not present 
function methordcheckone(req,res){
    console.log("mgwid line 150 : "+ mgwid);
    console.log("mudid line 151 : "+ mpudid);
    var query = {"gwid":mgwid};
    Formdata.find(query,function(err,doc){
        console.log("line 218 of  formdata : "+ doc)
        if(!err){
            if(doc[0]== null){
                console.log("there is no work here");
            } else {
                console.log(doc);
                console.log("line 218 : initial count before : "+ count);
                count ++;
                console.log("line 219 : count :  "+ count);
                countarray.push('DF');
            }
        } else { 
            console.log("there is an error occured : "+err)
        }
    }) 
    //set 2 check for ping data 
    Userping.find(query,function(err,doc){
        if(!err){
            if(doc[0]== null){
                console.log("there is no work here in line 260. ");
            } else {
                console.log(doc);
                console.log("line 263 : initial count before : "+ count);
                count ++;
                console.log("line 265 : count :  "+ count);
                countarray.push('PING');
            }
        } else { 
            console.log("there is an error occured : "+err)
        }
    }) 
    //set 2 check for ping data 

    //set 3 check for GFI data

    UserGfi.find(query,function(err,doc){
        if(!err){
            if(doc[0]== null){
                console.log("there is no work here in line 279. ");
            } else {
                console.log(doc);
                console.log("line 282 : initial count before : "+ count);
                count ++;
                console.log("line 284 : count :  "+ count);
                countarray.push('GFI');
                
            }
        } else { 
            console.log("there is an error occured : "+err)
        }
    }) 

    //set 3 check for GFI data

    // set 4 check for CONF data

    config.find(query,function(err,doc){
        if(!err){
            if(doc[0] == undefined){
                console.log("there is no work here in line 277. ");
            } else if (doc[0].gwid == mgwid){
                console.log("line 284 : "+doc);
                console.log("line 285 : initial count before : "+ count);
                count ++;
                console.log("line 288 : count :  "+ count);
                countarray.push('CONF');
                console.log("line 284 : "+countarray.length );
                for (var i = 0; i < countarray.length; i++) {
                    console.log("countarray in line 286 : "+ countarray[i]);
            }
            } else {
                console.log("no work to be done on line 296.");
            }
        } else { 
            console.log("there is an error occured : "+err)
        }
    }) 

    // set 4 check for CONF data

    console.log("this is line 303 before the loop");
    setTimeout(function() {   
        console.log("setTimeout: Hey! 1000 millisecond completed!..");  
        checkarray(req,res);
    }, 2000);  
   
};
//methord to check whether the user data & machine data is same or not present 


//second step starts here
    function second(req,res){
     console.log("mgwid"+ mgwid + " # "+"mudid"+mudid + "murl_token_id" + murl_token_id);
     var query = {"gwid":mgwid,"udid":mpudid};
     Formdata.find(query,function(err,doc){
        if(!err){
            console.log("this is from second with doc : "+ doc);
            //res.status(200).send({doc});
            var ud = doc[0].udid;
            var gw = doc[0].gwid;
            var wt = doc[0].weight;
            var tm = doc[0].time;

            var ccc ={
                "DispenseFeed": {
                    "Weight":wt,
                    "Time":tm
                }
            }

            var cc = JSON.stringify(ccc);
            var c = cc.length;
            var  tzoffset = (new Date()).getTimezoneOffset()* 60000;
            var  todayISOString = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5);
            
            var bbb = {
                "UDID":ud,
                "GWID":gw,
                "TS": todayISOString,
                "PktType":0xA9,
                "Priority": "PRIORITY_LEVEL_3",
                "SZ":c,
                "APD" : ccc
            }
           
            console.log("this is from line 98 second  : "+ JSON.stringify(a));
            const Packettwo = new packettwo(a);
            console.log("line 102 check : "+Packettwo);
            Packettwo.save((err,docs)=> {
                if(!err){
                    console.log("done : "+ docs)
                }else {
                    console.log("error : line 119 : "+err)
                }
                transactionNo++;
                console.log("line no 194 :"+transactionNo);
                testercount = transactionNo;
                console.log("line 196 :"+testercount);
                CTN =  testercount;  
            })
           
            var a = {
                "TN":testercount,
                "PD":bbb
            }
            
            console.log("line no 114 check : "+ transactionNo);
            res.status(200).send({
                 "TN": transactionNo,
                "PD": bbb
            });
            
        }else{ 
             console.log("there is an error occured : "+err)
        }
        
     })
    }
//second step ends here


// step three starts here

    function third(req,res){
        console.log("mgwid : "+ mgwid + " # "+" mudid : "+mudid +" #" +" murl_token_id : " + murl_token_id);
        var query = {"gwid":mgwid,"udid":mudid};
        config.find(query,function(err,doc){
            if(!err){
                //console.log("this is from second with doc : "+ doc[0]);
              var   udid= doc[0].udid;
              var   awid= doc[0].gwid;
              var   seedcount= doc[0].seedcount;
              var   totslots= doc[0].totslots;
              var   starttime= doc[0].starttime;
              var   slotinterval= doc[0].slotinterval;
              var   totfeedfortoday= doc[0].totfeedfortoday;
              var   slot_1 = doc[0].slot_1;
              var   slot_2 = doc[0].slot_2;
              var   slot_3 = doc[0].slot_3;
              var   slot_4 = doc[0].slot_4;
              var   slot_5 = doc[0].slot_5;
              var   slot_6 = doc[0].slot_6;
              var   fav = doc[0].fav;
              var   b = doc[0].atd;

            //   var repl = b.replaceAt("0","9");

               console.log(" repl in 413 : "+ b);
        
            //   var atd = b.split('/')
            //   console.log("line 414 "+ atd);
            //   console.log("type of in 416 : "+ typeof atd);
            //   console.log("line 418 atd : "+ atd);
            //   const ddlj = atd[0]+","+atd[1]+","+atd[2]+","+atd[3];
            //   console.log("line 419 : "+ ddlj);
            //   console.log("type of in 416 : "+ typeof ddlj);
            //   var d = parseInt(atd);        
            //   console.log("line 416 ::::::::::: "+ d);

            ddd = {
                "%FeedPerSlot":{
                    "Slot_1":slot_1,
                    "Slot_2":slot_2,
                    "Slot_3":slot_3,
                    "Slot_4":slot_4,
                    "Slot_5":slot_5,
                    "Slot_6":slot_6
                }
            }

            ccc = {
                "SeedCount": seedcount,
                "SlotsData": {
                    "TotSlots":totslots,
                    "StartTime":starttime,	
                    "SlotInterval":slotinterval,
                    "TotFeedforToday":totfeedfortoday	
                },
                "SlotsInternalData":ddd,
                "FAV": fav,
		        "!ATD": b,
		        "AltStt":[]
              }

              var cc = JSON.stringify(ccc);
              var c = cc.length;

              var  tzoffset = (new Date()).getTimezoneOffset()* 60000;
              var  todayISOString = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5);

              var bbb = {
                "UDID":udid,
                "GWID": awid,
                "TS": todayISOString,
                "PktType":0xA5,
                "Priority": "PRIORITY_LEVEL_3",
                "SZ":c,
                "APD" : ccc
            }

            
           
          
           CTN1 = transactionNo;
            var a = {
                "TN": transactionNo,
                "PD": bbb
            }

            //console.log("line 477 : "+ JSON.stringify(a));
            const Confres = new confres(a);
            console.log("line 462 : "+ Confres);
             Confres.save((err,docs)=>{
                if(!err){
                    console.log("done : "+ docs)
                }else {
                    console.log("error : line 119 : "+err)
                }
            })


              res.status(200).send({ 
                "TN": transactionNo,
                "PD": bbb
              });
            }else{ 
                console.log("there is an error occured : "+err)
           }
           
        })
    }



// step three ends here



// sending the json response to first machine get request starts 
    function checkarray(req,res){

          /*     
            i need to use if condition to check if the countarray 
            of notifications is null then i can send a dummy 
            packet other wise the flow  will be normally goes on
         */

         if(!countarray.length == 0){
            var aaa = {
                'Notifications': countarray
            }
    
            var b = JSON.stringify(aaa);
            var bbb = b.length;
            var  tzoffset = (new Date()).getTimezoneOffset()* 60000;
            var  todayISOString = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5);
            
    
               var aa = {
                        'UDID': mpudid,
                        'GWID': mgwid, 
                        'TS': todayISOString ,
                        'PktType':0xA3,
                        'Priority': 0,
                        'SZ':bbb,
                        'APD': aaa 
                    }
           var a  = {
                        'TN':6598,
                        'PD': aa
                    }
                    const Packetone = new packetone(a);
                    Packetone.save((err,docs)=>{
                        if (!err){
                            console.log("line 175 : "+ docs);
                        }else {
                            console.log("Error in line 177 : "+ err);
                        }
                        transactionNo++;
                    })
                    res.status(200).send({
                        'TN': transactionNo ,
                        'PD': aa
                    })

         }else {

            const  tzoffset = (new Date()).getTimezoneOffset()* 60000;
            const  todayISOString = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5);

            transactionNo++;

            var aa = {
                'GWID': mgwid, 
                'TS': todayISOString,
                'PktType':0xF0,
                'Priority': 0
            }

            res.status(404).send({
                'TN': transactionNo ,
                'PD': aa
            })
         }      
    }

// sending the json response to first machine get request ends 

//***Acknowledgment by feed dis device starts here ***
router.post("/ack-by-fd-device",(req,res)=>{
    console.log(" line 197 : "+ JSON.stringify(req.body));
    var transNo = req.body.TN;
    //var onelevel = req.body.PD.APD.Status;
    var scndlevel = req.body.PD.APD.DF_RESP;
    var recStatus = req.body;
    console.log("line 201 : transNo : "+transNo);
    console.log("line 378 : CTN : "+CTN);
    console.log("line 378 : CTN1 : "+CTN1);
    if(transNo == CTN){
        if(scndlevel === undefined){
            var Packetthree = new packetthree(recStatus);
            Packetthree.save((err,docs)=>{
                if(!err){
                    console.log("done line 206 : "+ docs)
                }else {
                    console.log("error : line 207 : "+err)
                }
                transactionNo++;
            })
            const  tzoffset = (new Date()).getTimezoneOffset()* 60000;
            const  todayISOString = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5);

            res.status(200).send({
                /* line 354
                Server responds through POST method response
                with a Dummy packet toclose the connection
                (Server to FD)
                */ 
                   'TN': transactionNo ,
                   'PD':{
                    'GWID': mgwid, 
                    //'TS': userSystime ,
                    'TS': todayISOString,
                    'PktType':0xF0,
                    'Priority': 0
                    }
                });
        }else{
            var Packetfour = new packetfour(recStatus);
            Packetfour.save((err,docs)=>{
                if(!err){
                    console.log("done line 221 : "+ docs)
                }else {
                    console.log("error : line 223 : "+err)
                }
            })
            
            const  tzoffset = (new Date()).getTimezoneOffset()* 60000;
            const  todayISOString = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5);

            var aa = {
                'UDID': req.body.PD.UDID,
                'TS': todayISOString,
                'PktType': req.body.PD.PktType,
                'Priority':req.body.PD.Priority,
                'SZ':req.body.PD.SZ,
                'APD': {
                    'Status': 'OK'
                }      
            }
            var a = {
                'TN': req.body.TN,
                'PD': aa
            }
            var Packetfive = new packetfive(a);
            Packetfive.save((err,docs)=>{
                if(!err){
                    console.log("done line 239 : "+ docs)
                }else {
                    console.log("error : line 241 : "+err)
                }
            })
            res.status(200).send({ 
                'TN': req.body.TN,
                'PD': aa
            });
        }
    }else if (transNo == CTN1){
        console.log("testing at line 657 line .");
        var Pconfresdata = new pconfresdata(recStatus);
        Pconfresdata.save((err,docs)=>{
            if(!err){
                console.log("done line 670 : "+ docs)
            }else {
                console.log("error : line 672 : "+err)
            }
            transactionNo++;

        })

        const  tzoffset = (new Date()).getTimezoneOffset()* 60000;
        const  todayISOString = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5);

        res.status(200).send({
            'TN': transactionNo ,
            'PD':{
             'GWID': confgwid, 
             'TS': todayISOString,
             'PktType':0xF0,
             'Priority': 0
             }
        })
    }else {
        console.log("TRANSACTION CAME HERE IS DIFFERENT PLZ CHECK IT ONCE .............")
    }
})

//***Acknowledgment by feed dis device ends here ***
module.exports = router;