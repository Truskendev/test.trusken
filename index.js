var express = require('express');
var bodyParser = require('body-parser');

app = express();
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

var mysql = require('mysql');

var con = mysql.createConnection({  
    host: "truskendb.cvq9vw8sfsww.us-east-1.rds.amazonaws.com",  
    user: "trusken123",  
    password: "qwerty1995",  
    database : 'trusken'
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

app.post('/registerNewUser',(request,response)=>{
    console.log(JSON.stringify(request.body))
    let guid=guidGenerator()
    var sql = "INSERT INTO user (user_id,user_name, email_id,password) VALUES ('"+guid+"','"+request.body.regUsr+"', '"+request.body.regEmail+"','"+request.body.regPass+"')";
    
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
            //response.status(200).send({message:'Inserted'})
            return response.send({guid:guid,redirectUrl: "/lumino/profile.html"} );
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
    var sql ="SELECT user_name from user where email_id='"+request.body.loginName+"' AND password='"+request.body.loginPass+"'"
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
                response.status(200).send(results[0])
            }
            else
            {
                response.status(200).send({user_name:"User name not found!"})
            }
        }
        
      })
})  


app.post('/addWorkExData',(request,response)=>{
    console.log(JSON.stringify(request.body))
    let guid=guidGeneratorWork()
    uid=request.body.uid
    var sql = "INSERT INTO workex (exp_id,job_title_id, start_date,end_date,emp_num,mgr_name,mgr_email,desc_work,org_id,emp_type_id,user_id) VALUES ('"+guid+"','"+request.body.workTitle+"', '"+request.body.workstartYear+"','"+request.body.workEndYear+"','"+request.body.employeeNumber+"','"+request.body.managerNumber+"','"+request.body.managerEmail+"','"+request.body.empdesc+"','"+request.body.companyName+"','"+request.body.selectedworkexp+"','"+request.body.uid+"')";
    
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
            //response.status(200).send({message:'Inserted'})
            return response.send({uid:uid,redirectUrl: "/lumino/addEdu.html"} );
        }
        
      })
})  


app.post('/addEducationData',(request,response)=>{
    console.log(JSON.stringify(request.body))
    let guid=guidGeneratorEducation()
   uid=request.body.uid
    var sql = "INSERT INTO education (edu_id,org_id,Degree, start_year,end_year,specialization,mem_num,user_id) VALUES ('"+guid+"','"+request.body.eduInstut+"', '"+request.body.degreeCertificate+"','"+request.body.edustartYear+"','"+request.body.workEndYear+"','"+request.body.speciality+"','"+request.body.memNumber+"','"+request.body.uid+"')";
    
    con.query(sql, function (error, results, fields) {
        if (error) 
        {
            response.status(500).send({error:error})
        }
        // console.log('The solution is: ', JSON.stringify(results));
        else{
            //response.status(200).send({message:'Inserted'})
            return response.send({uid:uid,redirectUrl: "/lumino/home.html"} );
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

function guidGenerator(){
    return "TU_"+Math.random().toString(36).substr(2, 9).toUpperCase()
}
function guidGeneratorWork(){
    return "WX_"+Math.random().toString(36).substr(2, 9).toUpperCase()
}
function guidGeneratorEducation(){
    return "ED_"+Math.random().toString(36).substr(2, 9).toUpperCase()
}

