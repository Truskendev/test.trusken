var express = require('express');
var bodyParser = require('body-parser');
var mailer=require('./mailer')
var requestApi=require('request')
app = express();
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "truskendb.cyoekoc1b5ex.us-east-2.rds.amazonaws.com",
  user: "trusken123",
   password: "qwerty1995",
   database : 'truskendb'

// host: "localhost",
//    user: "root",
//    password: "azhar",
//    database : 'truskendb'


});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
 

var server = app.listen(80,function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server listening at http://%s:%s", host, port)
});

app.get('/', function (request, response) {  
     response.sendFile( __dirname + "/public/" + "index.html" );
});
app.get('/linkedinSignin',function(request,response){
    response.redirect('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77nyczoox31is7&redirect_uri=http://test.trusken.com/verifyLinkedin&state=987654321&scope=r_emailaddress,r_basicprofile')
})

app.get('/verifyLinkedin',function(request,response){

var requestbody={
    url:"https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code="+request.query.code+"&redirect_uri=http://test.trusken.com/verifyLinkedin&client_id=77nyczoox31is7&client_secret=9oinTRmmtrm4FRve"
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
                console.log('The solution is: ', JSON.stringify(results))
                if(results.length===1)
                {
                    if(results[0]['wexSubm']==1)
                    {
                        if(results[0]['eduSub']==1)
                        {
                           return response.redirect('/lumino/salaryalc.html?'+results[0].user_id)
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
                        response.redirect('/lumino/addExp.html?'+JSON.parse(body)['id'])
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
app.post('/registerNewUser',(request,response)=>{
    console.log(JSON.stringify(request.body))
    let guid=guidGenerator()
    var sql = "INSERT INTO user (user_id,user_name, email_id,password,signature) VALUES ('"+guid+"','"+request.body.regUsr+"', '"+request.body.regEmail+"','"+request.body.regPass+"','"+request.body.signature+"')";
    
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
            response.send({guid:guid,redirectUrl: "/lumino/addExp.html"} );

            let content=mailer.getMailTemplate(guid,request.body.regUsr)
            mailer.sendMail(request.body.regEmail,'Trusken Registration Verification',content,(res) => {
                if(res.status == 200)
                {
                    console.log("mail success")
                }
                else
                {
                    response.status(500).json('Failed to send mail');
                }
            })
            
        }
        
      })
})  

app.post('/getProfileData',(request,response)=>{
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
            return response.send({guid:request.body.uid,redirectUrl: "/lumino/addExp.html"} );
        }
        
      })
})  

app.post('/loginUser',(request,response)=>{
    console.log(JSON.stringify(request.body))
    // let guid=guidGenerator()
    //var sql = "INSERT INTO user (user_id,user_name, user_email,password) VALUES ('"+guid+"','"+request.body.regUsr+"', '"+request.body.regEmail+"','"+request.body.regPass+"')";
    var sql ="SELECT user_id,is_verified from user where email_id='"+request.body.loginName+"' AND password='"+request.body.loginPass+"'"
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // 
        else
        {
            console.log('The solution is: ', JSON.stringify(results))
            if(results.length===1)
            {
                if(!results[0].is_verified){
                   return response.status(200).send({status:200,user_id:"Please verify your account!"})
                }
                //response.status(200).send(results[0])
                var sql1 ="SELECT * from workex where user_id='"+results[0].user_id+"'"
                con.query(sql1, function (error, results1, fields) {
                        if (error) 
                        {
                            response.status(500).send({error:error})
                        }
                        else{
                           if(results1.length===1) {
                           
                            return response.send({guid:results[0].user_id,redirectUrl: "/lumino/salaryalc.html"} );
                           }else{
                            
                            return response.send({guid:results[0].user_id,redirectUrl: "/lumino/addExp.html"} );
                           }
                            
                        }
                    })
                
            }
            else
            {
                response.status(200).send({status:200,user_id:"User not found!"})
            }
        }
        
      })
})  


app.post('/addWorkExData',(request,response)=>{

    let guid=request.body.expID==='undefined'? guidGeneratorWork():request.body.expID
    uid=request.body.uid
    var sql = "INSERT INTO workex (exp_id,job_title_id, start_date,end_date,emp_num,mgr_name,mgr_email,desc_work,org_id,emp_type_id,user_id) VALUES ('"+guid+"','"+request.body.workTitle+"', '"+request.body.workstartYear+"','"+request.body.workEndYear+"','"+request.body.employeeNumber+"','"+request.body.managerNumber+"','"+request.body.managerEmail+"','"+request.body.empdesc+"','"+request.body.companyName+"','"+request.body.selectedworkexp+"','"+request.body.uid+"') ON DUPLICATE KEY UPDATE job_title_id='"+request.body.workTitle+"', start_date='"+request.body.workstartYear+"',end_date='"+request.body.workEndYear+"',emp_num='"+request.body.employeeNumber+"',mgr_name='"+request.body.managerNumber+"',mgr_email='"+request.body.managerEmail+"',desc_work='"+request.body.empdesc+"', org_id='"+request.body.companyName+"' , emp_type_id='"+request.body.selectedworkexp+"'";
    
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
            //response.status(200).send({message:'Inserted'})
             response.send({uid:uid,redirectUrl: "/lumino/addEdu.html"} );
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
    console.log(JSON.stringify(request.body))
    let guid=request.body.eduID==='undefined'? guidGeneratorEducation():request.body.eduID
    
   uid=request.body.uid
    var sql = "INSERT INTO education (edu_id,org_id,Degree, start_year,end_year,specialization,mem_num,user_id) VALUES ('"+guid+"','"+request.body.eduInstut+"', '"+request.body.degreeCertificate+"','"+request.body.edustartYear+"','"+request.body.eduEndYear+"','"+request.body.speciality+"','"+request.body.memNumber+"','"+request.body.uid+"') ON DUPLICATE KEY UPDATE org_id='"+request.body.eduInstut+"',Degree='"+request.body.degreeCertificate+"', start_year='"+request.body.edustartYear+"',end_year='"+request.body.eduEndYear+"',specialization='"+request.body.speciality+"',mem_num='"+request.body.memNumber+"'";
    
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
            //response.status(200).send({message:'Inserted'})
            return response.send({uid:uid,redirectUrl: "/lumino/salaryalc.html"} );
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


    //var sql = "INSERT INTO basic_profile (user_id,first-name, last-name,formatted-name,phonetic-first-name,phonetic-last-name,formatted-phonetic-name,headline,location,industry,current-share,num-connections,num-connections-capped,summary,specialties,picture-url,site-standard-profile-request,api-standard-profile-request,public-profile-url,email-address) VALUES ('"+guid+"','"+request.body.regUsr+"')";
    var sql = "INSERT INTO user (user_id,user_name, email_id) VALUES ('"+userId+"','"+firstName+" "+lastName+"', '"+email_id+"')";
   
    //positions.Keys
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            console.log(error)
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
            console.log('The solution is: ', JSON.stringify(results));
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
=======
>>>>>>> 9a4709d71f4206d44bb026c4d571e08859f949ec
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
