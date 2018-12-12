#!/usr/bin/env node
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mailer=require('./mailer')
var requestApi=require('request')
var session = require('express-session');
app = express();
// app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    name:'user_sid',
    secret: 'SE98UK268MH_N50X5E14W_IB0ASOTKNJA',
    resave: false,
    saveUninitialized: false
}));
// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

// to run app in prod/dev mode
if (process.env.NODE_ENV === 'production') {
    app.set('port', 80);

// additional prod environment configuration
}

// forever service to run app

// var forever = require('forever-monitor');

//   var child = new (forever.Monitor)('index.js', {
//     max: 3,
//     silent: true,
//     args: []
//   });

//   child.on('exit', function () {
//     console.log('index.js has exited after 3 restarts');
//   });

//   child.start();

// var child = new (forever.Monitor)('index.js');

// child.on('watch:restart', function(info) {
//     console.error('Restaring script because ' + info.file + ' changed');
// });

// child.on('restart', function() {
//     console.error('Forever restarting script for ' + child.times + ' time');
// });

// child.on('exit:code', function(code) {
//     console.error('Forever detected script exited with code ' + code);
// });

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "142.93.218.67",
    user: "truskendbuser",
    password: "Authtruskendb@18",
    database: 'truskendb'
});


// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "truskendb.cyoekoc1b5ex.us-east-2.rds.amazonaws.com",
//   user: "trusken123",
//    password: "qwerty1995",
//    database : 'truskendb'

// });

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
 
var created=new Date();
var server = app.listen(3000,'localhost', function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server listening at http://%s:%s", host, port)
});

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.cookies.user_sid && req.session.user) {
        console.log('user session active')
        let userData=req.session.user
        if(userData['password']===undefined)
        {
            res.redirect('/linkedinSignin')
            return
        }

        loginChecks(userData.email,userData.password).then((data)=>{
            console.log(data)
            if(data.redirectUrl!=undefined)
            {
                res.redirect(data.redirectUrl.split('.')[0]+'?'+data['guid'])
            }else{
                res.sendFile( __dirname + "/public/" + "inde.html" );
            }
            //response.status(200).send(data)
        }).catch((error)=>{
            console.log(error)
            //response.status(500).send(error)
        })

    } else {
        next();
    }    
};
// middleware function to check for logged-in users
var PostLoginChecker = (req, res, next) => {
    if (req.cookies.user_sid && req.session.user) {
        next();
    }
    else {
        res.send({redirectFlag:true})
    }   
};
app.get('/', sessionChecker,function (request, response) {  
     response.sendFile( __dirname + "/public/" + "inde.html" );
});
app.get('/linkedinSignin',function(request,response){

    response.redirect('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=8179orcfe50tvu&redirect_uri=http://beta.trusken.com/verifyLinkedin&state=987654321&scope=r_emailaddress,r_basicprofile')
})

app.get('/verifyLinkedin',function(request,response){

var requestbody={
    url:"https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code="+request.query.code+"&redirect_uri=http://beta.trusken.com/verifyLinkedin&client_id=8179orcfe50tvu&client_secret=tH3kv033TiyCi1ST"
    ,method:"POST"
}
requestPromiseAPI(requestbody).then((body)=>{
    var accessToken=JSON.parse(body)['access_token']
    var requestData={
        'url':"https://api.linkedin.com/v1/people/~:(id,email-address)?format=json",
       'headers':
       { 
           'Authorization':"Bearer "+accessToken
        }
    }
    requestPromiseAPI(requestData).then((body)=>{
       
        var loginName=JSON.parse(body)['emailAddress'] 
        var sql ="SELECT user_id,wexSubm,eduSub from user where email_id='"+loginName+"'"
        con.query(sql, function (error, results, fields) {
            if (error) 
            {
                response.status(500).send({error:error})
            }
            // 
            else
            {
                request.session.user={
                   email:loginName
                }
                console.log('The solution is: ', JSON.stringify(results))
                if(results.length===1)
                {
                    if(results[0]['wexSubm']==1)
                    {
                        if(results[0]['eduSub']==1)
                        {
                           return response.redirect('/referral_landing.html?'+results[0].user_id)
                        }
                        return response.redirect('/lumino/addEdu.html?'+results[0].user_id)
                    }
                    return response.redirect('/lumino/addExp.html?'+results[0].user_id)
                    // return response.send({guid:results[0].user_id,redirectUrl: "/lumino/home.html"} );
                }else{
                    requestData.uri="https://api.linkedin.com/v1/people/~:(id,first-name,email-address,num-connections,formatted-name,site-standard-profile-request,api-standard-profile-request,public-profile-url,num-connections-capped,current-share,phonetic-first-name,phonetic-last-name,formatted-phonetic-name,last-name,headline,picture-url,industry,location,summary,specialties,positions:(id,title,summary,start-date,end-date,is-current,company:(id,name,type,size,industry,ticker)),educations:(id,school-name,field-of-study,start-date,end-date,degree,activities,notes),associations,interests,num-recommenders,date-of-birth,publications:(id,title,publisher:(name),authors:(id,name),date,url,summary),patents:(id,title,summary,number,status:(id,name),office:(name),inventors:(id,name),date,url),languages:(id,language:(name),proficiency:(level,name)),skills:(id,skill:(name)),certifications:(id,name,authority:(name),number,start-date,end-date),courses:(id,name,number),recommendations-received:(id,recommendation-type,recommendation-text,recommender),honors-awards,three-current-positions,three-past-positions,volunteer)?format=json"
                    requestPromiseAPI(requestData)
                    .then((body)=>{
                        processLinkedInData(body)

                        let linkedinData=JSON.parse(body)
                        let email_id=linkedinData['emailAddress']                    
                        response.redirect('/refferalsignup.html?'+JSON.parse(body)['id'])
                    })
                    .catch((error)=>{
                        console.log(error)
                    })
                    //response.redirect('/lumino/home.html?error=User not found!')
                }
            }
        })
    }).catch((error)=>{
        console.log(error)
    })
}).catch((error)=>{
    console.log(error)
})



// requestApi(requestbody,function(error,res,body){
    //     if(error){
    //         console.log(error)
    //     }
    //     else{
    //         console.log(body)
    //         var accessToken=JSON.parse(body)['access_token']
    //         var requestData={
    //             'url':"https://api.linkedin.com/v1/people/~:(id,email-address)?format=json",
    //            'headers':
    //            { 
    //                'Authorization':"Bearer "+accessToken
    //             }
    //         }
    //         requestApi(requestData,function(error,res,body){
    //             if(error){
    //                 console.log(error)
    //             }else
    //             {
    //                 console.log(body)
    //                 var loginName=JSON.parse(body)['emailAddress'] 
    //                 var sql ="SELECT user_id from user where email_id='"+loginName+"'"
    //                 con.query(sql, function (error, results, fields) {
    //                     if (error) 
    //                     {
    //                         response.status(500).send({error:error})
    //                     }
    //                     // 
    //                     else
    //                     {
    //                         console.log('The solution is: ', JSON.stringify(results))
    //                         if(results.length===1)
    //                         {
    //                             response.redirect('/lumino/home.html?'+results[0].user_id)
    //                             // return response.send({guid:results[0].user_id,redirectUrl: "/lumino/home.html"} );
    //                         }else{

    //                             //response.redirect('/lumino/home.html?error=User not found!')
    //                         }
    //                     }
    //                 })
    //             }
    //         })
    //     }
    // })
})

app.get('/verification', function (request, response) {
  var uid=request.query.uid
  var sql = "UPDATE user SET is_verified=1 where user_id='"+uid+"'";
    
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            response.status(500)
        }
        else{
            response.sendFile( __dirname + "/public/" + "verification.html" )
        }
    })
})

app.get('/referral_landing',function(request,response){
    response.sendFile( __dirname + "/public/" + "referral_landing.html")
})

app.get('/refferalsignup',function(request,response){
    response.sendFile( __dirname + "/public/" + "refferalsignup.html")
})

app.post('/registerNewUser',sessionChecker,(request,response)=>{
    console.log(JSON.stringify(request.body))
    let guid=guidGenerator()
    let ciid=guidGeneratorCoin()
    var sql = "INSERT INTO user (user_id,user_name, email_id,password,created_at,last_updated,created_by) VALUES ('"+guid+"','"+request.body.regUsr+"', '"+request.body.regEmail+"','"+request.body.regPass+"','"+created+"','"+created+"','"+guid+"')";
    
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
           
            var sql1="select * from coins_allocation where activity_type='SIGNUP'"
            con.query(sql1, function (errorw, resultse, fieldqs) {
                if (errorw) 
                {
                   // response.status(500).send({error:error})
                }
                // console.log('The solution is: ', JSON.stringify(results));
                else{
                    console.log(resultse)
                    request.session.user={
                        guid:guid,
                        email:request.body.regEmail,
                        password:request.body.regPass
                    }
                    response.send({guid:guid,redirectUrl: "/refferalsignup.html"} );
                    insertcoinsIssued(ciid,guid,resultse)
                }
            })

            let content=mailer.getMailTemplate(guid,request.body.regUsr)
            mailer.sendMail(request.body.regEmail,'Trusken Registration Verification',content,(res) => {
                if(res.status == 200)
                {
                    console.log("mail success")
                }
                else
                {
                    console.log("mail failed")
                }
            })
           
        }
        
      })

     

})

function insertcoinsIssued(ciid,guid,resultse){

 var sql2="insert into coins_issued_details (coins_issued_details_id,user_id,coins_earned,issued_date,created_at,created_by,last_updated,coins_alloc_id) values('"+ciid+"','"+guid+"', '"+resultse[0].coins_alloc+"','"+created+"','"+created+"','"+guid+"','"+created+"', '"+resultse[0].coins_alloc_id+"')";
            con.query(sql2, function (errorw, resultse, fieldqs) {
                if (errorw) 
                {
                   // response.status(500).send({error:error})
                }
                // console.log('The solution is: ', JSON.stringify(results));
                else{
                    console.log(resultse)
      
                    
                }
            })
    }


app.post('/getProfileData',PostLoginChecker,(request,response)=>{
    console.log(JSON.stringify(request.body))
   // let guid=guidGenerator()
    var sql = "select * from user where user_id='"+request.body.uid+"'";
    
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
            //response.status(200).send({message:'Inserted'})
            return response.send(results);
        }
        
      })
})  

app.post('/updateProfileData',(request,response)=>{
    console.log(JSON.stringify(request.body))
    
    var sql = "UPDATE user SET user_name = '"+request.body.fullName+"',email_id = '"+request.body.userEmail+"',phone_number = '"+request.body.userNumber+"' WHERE user_id = '"+request.body.uid+"';";
    
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
            //response.status(200).send({message:'Inserted'})
            return response.send({guid:request.body.uid,redirectUrl: "/lumino/dashb.html"} );
        }
        
      })
})  

app.get('/logout',(req,res)=>{
    if (req.cookies.user_sid && req.session.user) {
        res.clearCookie('user_sid');
        res.sendFile( __dirname + "/public/" + "inde.html" );       
    }
})

app.post('/loginUser',sessionChecker,(request,response)=>{
    console.log(JSON.stringify(request.body))
    // let guid=guidGenerator()
    //var sql = "INSERT INTO user (user_id,user_name, user_email,password) VALUES ('"+guid+"','"+request.body.regUsr+"', '"+request.body.regEmail+"','"+request.body.regPass+"')";
    loginChecks(request.body.loginName,request.body.loginPass).then((data)=>{
        if(data['guid']!=undefined){
            request.session.user={
                guid:data['guid'],
                email:request.body.loginName,
                password:request.body.loginPass
            }
        }
        response.status(200).send(data)
    }).catch((error)=>{
        response.status(500).send(error)
    })

})  

function loginChecks(loginName,loginPass){
 return new Promise((resolve,reject)=>{
    var sql ="SELECT user_id,is_verified from user where email_id='"+loginName+"' AND password='"+loginPass+"'"
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            //response.status(500).send({error:error})
            reject({error:error})
        }
        // 
        else
        {
            console.log('The solution is: ', JSON.stringify(results))
            if(results.length===1)
            {
                if(!results[0].is_verified){
                   //return response.status(200).send({status:200,user_id:"Please verify your account!"})
                   resolve({status:200,user_id:"Please verify your account!"})
                }
                //response.status(200).send(results[0])
                var sql1 ="SELECT * from workex where user_id='"+results[0].user_id+"'"
                con.query(sql1, function (error, results1, fields) {
                        if (error) 
                        {
                            //response.status(500).send({error:error})
                            reject({error:error})
                        }
                        else{
                           if(results1.length!=0) {
                           
                            //return response.send({guid:results[0].user_id,redirectUrl: "/referral_landing.html"} );
                            resolve({guid:results[0].user_id,redirectUrl: "/referral_landing.html"})
                           }else{
                            resolve({guid:results[0].user_id,redirectUrl: "/refferalsignup.html"})
                            //return response.send({guid:results[0].user_id,redirectUrl: "/refferalsignup.html"} );
                           }
                            
                        }
                    })
                
            }
            else
            {
                resolve({status:200,user_id:"User not found!"})
                //response.status(200).send({status:200,user_id:"User not found!"})
            }
        }
        
      })
})


}

app.post('/addWorkExData',(request,response)=>{
    let ciid=guidGeneratorCoin();
    let guid=request.body.expID==='undefined'? guidGeneratorWork():request.body.expID
    uid=request.body.uid
    var sql = "INSERT INTO workex (exp_id,job_title_id, start_date,end_date,emp_num,mgr_name,mgr_email,desc_work,org_id,emp_type_id,user_id,alias_name,state,country,city) VALUES ('"+guid+"','"+request.body.workTitle+"', '"+request.body.workstartYear+"','"+request.body.workEndYear+"','"+request.body.employeeNumber+"','"+request.body.managerNumber+"','"+request.body.managerEmail+"','"+request.body.empdesc+"','"+request.body.companyName+"','"+request.body.selectedworkexp+"','"+request.body.uid+"','"+request.body.alias+"','"+request.body.state+"','"+request.body.country+"','"+request.body.city+"') ON DUPLICATE KEY UPDATE job_title_id='"+request.body.workTitle+"', start_date='"+request.body.workstartYear+"',end_date='"+request.body.workEndYear+"',emp_num='"+request.body.employeeNumber+"',mgr_name='"+request.body.managerNumber+"',mgr_email='"+request.body.managerEmail+"',desc_work='"+request.body.empdesc+"', org_id='"+request.body.companyName+"' , emp_type_id='"+request.body.selectedworkexp+"', alias_name='"+request.body.alias+"', state='"+request.body.state+"', country='"+request.body.country+"', emp_type_id='"+request.body.city+"'";
    
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
            //response.status(200).send({message:'Inserted'})
            

              var sql1="select * from coins_allocation where activity_type='ADD_WORKEX'"
            con.query(sql1, function (errorw, resultse, fieldqs) {
                if (errorw) 
                {
                   // response.status(500).send({error:error})
                }
                // console.log('The solution is: ', JSON.stringify(results));
                else{
                    console.log(resultse)
      
                    response.send({uid:uid,redirectUrl: "/lumino/addEdu.html"} );
                    insertcoinsIssued(ciid,request.body.uid,resultse)

                }
            })

        }
        
      })
      var sq="update user set wexSubm=1 where user_id='"+uid+"' and wexSubm=0"
      con.query(sq, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
            //response.status(200).send({message:'Inserted'})
           // return response.send({uid:uid,redirectUrl: "/lumino/addEdu.html"} );
           console.log("Submitted!")
        }
        
      })

})  




app.post('/addWorkExDataa',(request,response)=>{
    let ciid=guidGeneratorCoin();
    let guid=request.body.expID==='undefined'? guidGeneratorWork():request.body.expID
    uid=request.body.uid
    var sql = "INSERT INTO workex (exp_id,job_title_id, start_date,end_date,emp_num,mgr_name,mgr_email,desc_work,org_id,emp_type_id,user_id,alias_name,state,country,city) VALUES ('"+guid+"','"+request.body.workTitle+"', '"+request.body.workstartYear+"','"+request.body.workEndYear+"','"+request.body.employeeNumber+"','"+request.body.managerNumber+"','"+request.body.managerEmail+"','"+request.body.empdesc+"','"+request.body.companyName+"','"+request.body.selectedworkexp+"','"+request.body.uid+"','"+request.body.alias+"','"+request.body.state+"','"+request.body.country+"','"+request.body.city+"') ON DUPLICATE KEY UPDATE job_title_id='"+request.body.workTitle+"', start_date='"+request.body.workstartYear+"',end_date='"+request.body.workEndYear+"',emp_num='"+request.body.employeeNumber+"',mgr_name='"+request.body.managerNumber+"',mgr_email='"+request.body.managerEmail+"',desc_work='"+request.body.empdesc+"', org_id='"+request.body.companyName+"' , emp_type_id='"+request.body.selectedworkexp+"', alias_name='"+request.body.alias+"', state='"+request.body.state+"', country='"+request.body.country+"', emp_type_id='"+request.body.city+"'";
    
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
            //response.status(200).send({message:'Inserted'})
            

              var sql1="select * from coins_allocation where activity_type='ADD_WORKEX'"
            con.query(sql1, function (errorw, resultse, fieldqs) {
                if (errorw) 
                {
                   // response.status(500).send({error:error})
                }
                // console.log('The solution is: ', JSON.stringify(results));
                else{
                    console.log(resultse)
      
                    response.send({uid:uid,redirectUrl: "/lumino/dashb.html"} );
                    insertcoinsIssued(ciid,request.body.uid,resultse)

                }
            })

        }
        
      })
      var sq="update user set wexSubm=1 where user_id='"+uid+"' and wexSubm=0"
      con.query(sq, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
            //response.status(200).send({message:'Inserted'})
           // return response.send({uid:uid,redirectUrl: "/lumino/addEdu.html"} );
           console.log("Submitted!")
        }
        
      })

})  


app.post('/addEducationData',(request,response)=>{
    let ciid=guidGeneratorCoin();
    console.log(JSON.stringify(request.body))
    let guid=request.body.eduID==='undefined'? guidGeneratorEducation():request.body.eduID
    
   uid=request.body.uid
    var sql = "INSERT INTO education (edu_id,org_id,Degree, start_year,end_year,specialization,mem_num,user_id,state,country,city) VALUES ('"+guid+"','"+request.body.eduInstut+"', '"+request.body.degreeCertificate+"','"+request.body.edustartYear+"','"+request.body.eduEndYear+"','"+request.body.speciality+"','"+request.body.memNumber+"','"+request.body.uid+"','"+request.body.state+"','"+request.body.country+"','"+request.body.city+"') ON DUPLICATE KEY UPDATE org_id='"+request.body.eduInstut+"',Degree='"+request.body.degreeCertificate+"', start_year='"+request.body.edustartYear+"',end_year='"+request.body.eduEndYear+"',specialization='"+request.body.speciality+"',mem_num='"+request.body.memNumber+"',city='"+request.body.city+"',state='"+request.body.state+"',country='"+request.body.country+"'";
    
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
            //response.status(200).send({message:'Inserted'})
           

            var sql1="select * from coins_allocation where activity_type='ADD_EDU'"
            con.query(sql1, function (errorw, resultse, fieldqs) {
                if (errorw) 
                {
                   // response.status(500).send({error:error})
                }
                // console.log('The solution is: ', JSON.stringify(results));
                else{
                    console.log(resultse)
                    insertcoinsIssued(ciid,request.body.uid,resultse)
                    return response.send({uid:uid,redirectUrl: "/lumino/salaryalc.html"} );
                   

                }
            })

        }
        
      })
      var sq="update user set eduSub=1 where user_id='"+uid+"' and eduSub=0"
      con.query(sq, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
            //response.status(200).send({message:'Inserted'})
           // return response.send({uid:uid,redirectUrl: "/lumino/addEdu.html"} );
           console.log("Submitted!")
        }
        
      })
})  

app.post('/addEducationDataw',(request,response)=>{
    let ciid=guidGeneratorCoin();
    console.log(JSON.stringify(request.body))
    let guid=request.body.eduID==='undefined'? guidGeneratorEducation():request.body.eduID
    
   uid=request.body.uid
   var sql = "INSERT INTO education (edu_id,org_id,Degree, start_year,end_year,specialization,mem_num,user_id,state,country,city) VALUES ('"+guid+"','"+request.body.eduInstut+"', '"+request.body.degreeCertificate+"','"+request.body.edustartYear+"','"+request.body.eduEndYear+"','"+request.body.speciality+"','"+request.body.memNumber+"','"+request.body.uid+"','"+request.body.state+"','"+request.body.country+"','"+request.body.city+"') ON DUPLICATE KEY UPDATE org_id='"+request.body.eduInstut+"',Degree='"+request.body.degreeCertificate+"', start_year='"+request.body.edustartYear+"',end_year='"+request.body.eduEndYear+"',specialization='"+request.body.speciality+"',mem_num='"+request.body.memNumber+"',city='"+request.body.city+"',state='"+request.body.state+"',country='"+request.body.country+"'";
    
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
            //response.status(200).send({message:'Inserted'})
           

            var sql1="select * from coins_allocation where activity_type='ADD_EDU'"
            con.query(sql1, function (errorw, resultse, fieldqs) {
                if (errorw) 
                {
                   // response.status(500).send({error:error})
                }
                // console.log('The solution is: ', JSON.stringify(results));
                else{
                    console.log(resultse)
                    insertcoinsIssued(ciid,request.body.uid,resultse)
                    return response.send({uid:uid,redirectUrl: "/lumino/dashb.html"} );
                   

                }
            })

        }
        
      })
      var sq="update user set eduSub=1 where user_id='"+uid+"' and eduSub=0"
      con.query(sq, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
            //response.status(200).send({message:'Inserted'})
           // return response.send({uid:uid,redirectUrl: "/lumino/addEdu.html"} );
           console.log("Submitted!")
        }
        
      })
}) 


app.post('/getEmploymentData',(request,response)=>{
    console.log(JSON.stringify(request.body))
   // let guid=guidGenerator()
    var sql = "select * from workex where user_id='"+request.body.uid+"'";
    
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
            //response.status(200).send({message:'Inserted'})
            return response.send(results);
        }
        
      })
})  

app.post('/getEducationData',(request,response)=>{
    console.log(JSON.stringify(request.body))
   // let guid=guidGenerator()
    var sql = "select * from education where user_id='"+request.body.uid+"'";
    
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
            //response.status(200).send({message:'Inserted'})
            return response.send(results);
        }
        
      })
})  

app.post('/getCompareSalaryData',(request,response)=>{
    console.log(JSON.stringify(request.body))
   // let guid=guidGenerator()
    var sql = "select * from compareSalary";
    
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
            //response.status(200).send({message:'Inserted'})
            return response.send(results);
        }
        
      })
})  

function guidGenerator(){
    return "TU_"+Math.random().toString(36).substr(2, 9).toUpperCase()
}
function guidGeneratorWork(){
    return "WX_"+Math.random().toString(36).substr(2, 9).toUpperCase()
}
function guidGeneratorEducation(){
    return "ED_"+Math.random().toString(36).substr(2, 9).toUpperCase()
}
function guidGeneratorCompSal(){
    return "CS_"+Math.random().toString(36).substr(2, 9).toUpperCase()
}
function guidGeneratorCoin(){
    return "CI_"+Math.random().toString(36).substr(2, 9).toUpperCase()
}
function guidGeneratoriTrust(){
    return "IT_"+Math.random().toString(36).substr(2, 9).toUpperCase()
}



const requestPromiseAPI=(requestbody)=>{
    return new Promise((resolve,reject)=>{
        requestApi(requestbody,function(error,res,body){
            if(error){
                reject(error)
            }else
            {
                resolve(body)
            }
        })
    })
}

function processLinkedInData(body){

    let guid=guidGeneratorWork()

    let linkedinData=JSON.parse(body)
    let email_id=linkedinData['emailAddress']
    let firstName=linkedinData['firstName']
    let lastName=linkedinData['lastName']
    let headline=linkedinData['headline']
    let userId=linkedinData['id']
    let picture_url=linkedinData['pictureUrl']
    let industry=linkedinData['industry']
    let location=linkedinData['location']
    let specialties=linkedinData['specialties']

    let summary=linkedinData['summary']
    let num_connections=linkedinData['numConnections']
    let positions=linkedinData['positions'].values;
    let formatted_name=linkedinData['formattedName']
    let phonetic_first_name=linkedinData['phoneticFirstName']
    let phonetic_last_name=linkedinData['phoneticLastName']
    let formatted_phonetic_name=linkedinData['formattedPhoneticName']
    let num_connections_capped=linkedinData['numConnectionsCapped']
    let ciid=guidGeneratorCoin()

    //var sql = "INSERT INTO basic_profile (user_id,first-name, last-name,formatted-name,phonetic-first-name,phonetic-last-name,formatted-phonetic-name,headline,location,industry,current-share,num-connections,num-connections-capped,summary,specialties,picture-url,site-standard-profile-request,api-standard-profile-request,public-profile-url,email-address) VALUES ('"+guid+"','"+request.body.regUsr+"')";
    var sql = "INSERT INTO user (user_id,user_name, email_id,created_at,last_updated,created_by) VALUES ('"+userId+"','"+firstName+" "+lastName+"', '"+email_id+"', '"+created+"', '"+created+"', '"+userId+"')";
   
    //positions.Keys
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            console.log(error)
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
            console.log('The solution is: ', JSON.stringify(results));
            var sql1="select * from coins_allocation where activity_type='SIGNUP'"
            con.query(sql1, function (errorw, resultse, fieldqs) {
                if (errorw) 
                {
                   // response.status(500).send({error:error})
                }
                // console.log('The solution is: ', JSON.stringify(results));
                else{
                    console.log(resultse)
      
                   // response.send({guid:guid,redirectUrl: "/lumino/addExp.html"} );
                    insertcoinsIssued(ciid,userId,resultse)
                }
            })
        }
    })
    for(var i=0;i<positions.length;i++){
        let guid=guidGeneratorWork()
        var st="INSERT INTO workex (exp_id,";
        var st1="VALUES ('"+guid+"',";
        if(typeof positions[i].title !="undefined"){
        st+="job_title_id,"
        st1+="'"+ positions[i].title +"',";
        }
        if(typeof positions[i].startDate !="undefined"){
        st+="start_date,"
        st1+="'"+ positions[i].startDate.month +"/";
        st1+= positions[i].startDate.year +"',";
        }
        if(typeof positions[i].company !="undefined"){
        st+="org_id,"
        st1+="'"+ positions[i].company.name +"',";
        }
      
        st+="user_id)";
        st1 +="'"+userId+"')";
     st=st+st1;
    // positions.
    // var st= "INSERT INTO workex (exp_id,job_title_id, start_date,org_id,user_id) VALUES ('"+guid+"','"+ positions.values[1].title +"','"+positions.values[1].startDate.month+"/"+positions.values[1].startDate.year+"','"+positions.values[1].company.name+"','"+userId+"')";
    con.query(st, function (error, results, fields) {
        if (error) 
        {
            console.log(error)
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
            console.log('The solution is: ', JSON.stringify(results));
        }
    })
}
}



app.post('/checkSalaryDetails',(request,response)=>{
    console.log(JSON.stringify(request.body))
    let guid=guidGeneratorCompSal()
    var sql = "select * from compareSalary where job_title='"+request.body.jobTitle+"'";
    
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
          response.send(results);
        }
        
      })
})  
app.post('/getTriviaQuestions',(request,response)=>{
    console.log(JSON.stringify(request.body))
    //let guid=guidGeneratorCompSal()
    var sql = "select * from trivia where qid not in(select qid from trivia_marksheet where user_id='"+request.body.uid+"') limit 1";
    
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
          response.send(results);
        }
        
      })
})  
app.post('/getMarksheet',(request,response)=>{
    var sql = "SELECT SUM(mark) as marks FROM trivia_marksheet where user_id='"+request.body.uid+"'";
    
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
          response.send(results);
        }
        
      })
})

app.post('/getAllCompanyNames',(request,reponse)=>{
    var sql = "SELECT * from company_names"
    con.query(sql, function(error, results, fields){
        if(error){
            response.status(500).send({error:error})
        }
        else{
            reponse.send(results);
        }
    })
})

app.post('/updateMarksheet',(request,response)=>{
    console.log(JSON.stringify(request.body))
    //let guid=guidGeneratorCompSal()
    var sql = "insert into trivia_marksheet (qid,user_id,mark) values('"+request.body.qid+"','"+request.body.uid+"','"+request.body.mark+"')";
    
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
          response.send(results);
        }
        
      })
})  

app.post('/getItrustData',(request,response)=>{
//var sql ="SELECT * from workex where user_id='"+request.body.uid+"'"
var sql="SELECT user_name,user_id FROM truskendb.user where user_id in (select user_id from truskendb.workex where org_id in (select org_id from truskendb.workex where user_id='"+request.body.uid+"') and start_date >=( select start_date from truskendb.workex where user_id='"+request.body.uid+"' )) and user_id not like '"+request.body.uid+"' and user_id not in (select trusted_user_id from itrust where trusted_by_user_id='"+request.body.uid+"')"
con.query(sql, function (error, results, fields) {
    if (error) 
    {
        response.status(500).send({error:error})
    }
    // 
    else
    {
        console.log('The solution is: ', JSON.stringify(results))
        response.send(results)
        // var sqq="select user_id from workex where org_id='"+results[0].org_id+"'"
        // con.query(sqq, function (error, results1, fields) {
        //     if (error) 
        //     {
        //         response.status(500).send({error:error})
        //     }
        //     // 
        //     else
        //     {
        //         var resultse=[]
                
              
        //         results1.forEach((element,index) => {
        //         var sqq1="select user_name,email_id,user_id from user where user_id='"+element.user_id+"'"
        //         con.query(sqq1, function (error, results2, fields) {
                    
        //             if (error) 
        //             {
        //                 response.status(500).send({error:error})
        //             }
        //             // 
        //             else
        //             {
                      
        //                 resultse[index]=results2;
        //                 if(resultse.length==results1.length){
        //                 response.send(resultse);
        //                // response.send(results);
        //                 }
                        
                
        //                 }
                            
                    
                        
        //           })
                 
        
        //         })
            
                
           
            
        //     }
        // })
        }
        
   
    
  })
})

app.post('/getEmployeDate',(request,response)=>{
   
    var sql = "SELECT * from workex where user_id='"+request.body.uid+"'";
    
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
          response.send(results);
        }
        
      })
})

app.post('/getCurrentUserDate',(request,response)=>{
   
    var sql = "SELECT * from workex where user_id='"+request.body.uid+"'";
    
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
          response.send(results);
        }
        
      })
})
let meat=[];
app.post('/getBadgeDetails',(request,response)=>{
   
    //var sql = "select verification_status from workex where user_id='"+request.body.uide+"'";
    var sql="SELECT * FROM truskendb.badges where badge_id in (select badge_id from workex where user_id='"+request.body.uide+"')"
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
            response.send(results)
            
        //     results.forEach((elements)=>{
        //         if(elements.verification_status==1){
        //             var sq = "select * from badges where badge_id='1'";
        
        // con.query(sq, function (error, picto, fields) {
        //     if (error) 
        //     {
        //         response.status(500).send({error:error})
        //     }
        //     else{
        //         meat[0]=picto;
        //         meat[1]=results;
        //         response.send(meat);
                
        //        // response.send(results);
        //     }
        
        //     })
        //   }else{
        //     // var sq = "select * from badges where badge_id='2'";
        
        //     // con.query(sq, function (error, picto, fields) {
        //     //     if (error) 
        //     //     {
        //     //         response.status(500).send({error:error})
        //     //     }
        //     //     else{
        
        //     //         //if(meat[0]!=""){
        //     //         meat[0]=picto;
        //     //         meat[1]=results;
        //     //     //     }else{
        //     //     //     meat[0]=picto;
        //     //     // meat[1]=results;
            
        //     //     response.send(meat);
        //     //     }
            
                
        //     // })
            
        //     }
            
        // })
            
            
            
    
        }
        
      })
})

app.post('/getbadDetails',(request,response)=>{
    console.log(JSON.stringify(request.body))
   // let guid=guidGenerator()
    var sql = "select * from badges where badge_id='"+request.body.bid+"'";
    
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
            //response.status(200).send({message:'Inserted'})
            return response.send(results);
        }
        
      })
})  


app.post('/trustMe',(request,response)=>{
  
  let values=[]
  request.body.for_user.forEach((user)=>{
    let guid= guidGeneratoriTrust()
    values.push("('"+guid+"','"+user+"','"+request.body.by_user+"')")
  })
    var sql = "insert into itrust (itrust_id,trusted_user_id,trusted_by_user_id) values "+values.toString();
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            console.log(results)
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
            let ciid=guidGeneratorCoin()
         var sql1="select * from coins_allocation where activity_type='ITRUST_U'"
         con.query(sql1, function (errorw, resultse, fieldqs) {
             if (errorw) 
             {
                // response.status(500).send({error:error})
             }
             // console.log('The solution is: ', JSON.stringify(results));
             else{
                 console.log(resultse)
   
                
                 insertcoinsIssued(ciid,request.body.by_user,resultse)
             }
         })
         var sql2="select * from coins_allocation where activity_type='U_TRUST_ME'"
         let ciqid=guidGeneratorCoin()
         con.query(sql2, function (errorw, resultse, fieldqs) {
             if (errorw) 
             {
                // response.status(500).send({error:error})
             }
             // console.log('The solution is: ', JSON.stringify(results));
             else{
                 console.log(resultse)
   
                 response.send(results)
                 insertcoinsIssued(ciqid,request.body.for_user[0],resultse)
             }
         })
        }
        
      })
    
})

app.post('/totalCoins',(request,response)=>{
    var sql2="select sum(coins_earned) as coinsTot from coins_v where user_id='"+request.body.uid+"'";
               con.query(sql2, function (errorw, results, fieldqs) {
                   if (errorw) 
                   {
                    console.log(errorw)
                      // response.status(500).send({error:error})
                   }
                   // console.log('The solution is: ', JSON.stringify(results));
                   else{
                    response.send(results)
                    
                       
                   }
               })

        })

        app.post('/registerRefferedUser',(request,response)=>{
            console.log(JSON.stringify(request.body))
            let guid=guidGenerator()
            let ciid=guidGeneratorCoin()
            var sql = "INSERT INTO user (user_id,user_name, email_id,password,signature,referral_id,created_at,created_by,last_updated) VALUES ('"+guid+"','"+request.body.regUsr+"', '"+request.body.regEmail+"','"+request.body.regPass+"','"+request.body.signature+"','"+request.body.refId+"','"+created+"','"+guid+"','"+created+"')";
            
            con.query(sql, function (error, results, fields) {
                if (error) 
                {
                    response.status(500).send({error:error})
                }
                // console.log('The solution is: ', JSON.stringify(results));
                else{
                   
                    var sql1="select * from coins_allocation where activity_type='SIGNUP'"
                    con.query(sql1, function (errorw, resultse, fieldqs) {
                        if (errorw) 
                        {
                           // response.status(500).send({error:error})
                        }
                        // console.log('The solution is: ', JSON.stringify(results));
                        else{
                            console.log(resultse)
              
                          //  response.send({guid:guid,redirectUrl: "/lumino/addExp.html"} );
                            insertcoinsIssued(ciid,guid,resultse)
                        }
                    })
                    let cqid=guidGeneratorCoin()
                    var sql3="select * from coins_allocation where activity_type='REFFERED'"
                    con.query(sql3, function (errorw, resultsee, fieldqs) {
                        if (errorw) 
                        {
                           // response.status(500).send({error:error})
                        }
                        // console.log('The solution is: ', JSON.stringify(results));
                        else{
                            console.log(resultsee)
              
                            response.send({guid:guid,redirectUrl: "/refferalsignup.html"} );
                            insertcoinsIssued(cqid,request.body.refId,resultsee)
                        }
                    })
        
                    let content=mailer.getMailTemplate(guid,request.body.regUsr)
                    mailer.sendMail(request.body.regEmail,'Trusken Registration Verification',content,(res) => {
                        if(res.status == 200)
                        {
                            console.log("mail success")
                        }
                        else
                        {
                            console.log("mail failed")
                        }
                    })
                   
                }
                
              })
        
             
        
            }) 
         
            app.post('/passRequest',(request,response)=>{
                
                
                let content=mailer.getFpassMailTemplate(request.body.fpass)
                mailer.sendMail(request.body.fpass,'Trusken New Password Request',content,(response) => {
                    if(response.status == 200)
                    {
                        console.log("mail success")
                        
                    }
                    else
                    {
                        console.log("mail failed")
                        response.status(500);
                    }
                })



            })

            app.post('/passReset', function (request, response) {
                
                
                var sql = "UPDATE user SET password='"+request.body.passd+"',last_updated='"+created+"' where email_id='"+request.body.eid+"'";
                  
                  con.query(sql, function (error, results, fields) {
                      if (error) 
                      {
                          response.status(500)
                      }
                      else{
                        response.send({redirectUrl: "/inde.html"} );
                      }
                  })
              })


              app.post('/companyName', function (request, response) {
                
                
                var sql = "select * from company_names";
                  
                  con.query(sql, function (error, results, fields) {
                      if (error) 
                      {
                          response.status(500)
                      }
                      else{
                        response.send(results);
                      }
                  })
              })
