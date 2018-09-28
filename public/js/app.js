
let userNameToDisplay=''

function login(){
	 let loginData=
	 {
	 loginName:$('#uname').val(),
	 loginPass:$('#passw').val()
	}
	$.post( "/loginUser",loginData,function(response) {
		log(response);
	  })
		.done(function() {
		  log( "second success" );
		})
		.fail(function(error) {
		  log(error.responseJSON.error.sqlMessage);
		})
		.always(function() {
		  log( "finished" );
		});
	
}

const log=console.log

function registerUser(){
	 
let userData={
		regUsr:$('#namew').val(),
	 regEmail:$('#emaile').val(),
	 regPass:$('#regpass').val()
	}
	 
	$.post( "/registerNewUser",userData,function(response) {
		log(response.redirectUrl);
		userID=response.guid
		window.location=response.redirectUrl+'?'+userID
	  })
		.done(function() {
		  
		  log( "second success" );
		})
		.fail(function(error) {
		  log(error.responseJSON.error.sqlMessage);
		})
		.always(function() {
		  log( "finished" );
		});

}



function loadProfilePage(uid){
	log(uid)
	$.post( "/getProfileData",{uid:uid},function(response) {
		log(response[0]);
		// userID=response.guid	
		// window.location=response.redirectUrl+'?'+userID
		$('#userNameDisplay').text(response[0].user_name)
		$('#fullName').val(response[0].user_name)
		$('#emailId').val(response[0].email_id)
		
	  })
		.done(function() {
		  
		  log( "second success" );
		})
		.fail(function(error) {
		  log(error.responseJSON.error.sqlMessage);
		})
		.always(function() {
		  log( "finished" );
		});
}

function updateProfile(){
	
	let profileData={
		fullName:$('#fullName').val(),
	 userEmail:$('#emailId').val(),
	 userNumber:$('#phoneNumber').val(),
	  uid:window.location.href.split('?')[1]
	}
	$.post( "/updateProfileData",profileData,function(response) {
		log(response.redirectUrl);
		userID=response.guid
		window.location=response.redirectUrl+'?'+userID
	  })
		.done(function() {
		  
		  log( "second success" );
		})
		.fail(function(error) {
		  log(error.responseJSON.error.sqlMessage);
		})
		.always(function() {
		  log( "finished" );
		});


}

function addWorkex(){
	var selectedworkexp = new Array();
$('input[name="employmentType"]:checked').each(function() {
	selectedworkexp.push(this.value);
});
	let workData={
		workTitle:$('#workTitle').val(),
		companyName:$('#companyName').val(),
		workstartYear:$('#workstartYear').val(),
		workEndYear:$('#workEndYear').val(),
		employeeNumber:$('#employeeNumber').val(),
		managerNumber:$('#managerNumber').val(),
		managerEmail:$('#managerEmail').val(),
		empdesc:$('#empdesc').val(),
		
		selectedworkexp:selectedworkexp,
	  uid:window.location.href.split('?')[1]
	}
	$.post( "/addWorkExData",workData,function(response) {
		log(response.redirectUrl);
		userID=response.uid
		window.location=response.redirectUrl+'?'+userID
	  })
		.done(function() {
		  
		  log( "second success" );
		})
		.fail(function(error) {
		  log(error.responseJSON.error.sqlMessage);
		})
		.always(function() {
		  log( "finished" );
		});


}


function addEducation(){
	
	let eduData={
		eduInstut:$('#eduInstut').val(),
		degreeCertificate:$('#degreeCertificate').val(),
		edustartYear:$('#edustartYear').val(),
		eduEndYear:$('#workEndYear').val(),
		speciality:$('#speciality').val(),
		memNumber:$('#memNumber').val(),
		
		
		
	  uid:window.location.href.split('?')[1]
	}
	$.post( "/addEducationData",eduData,function(response) {
		log(response.redirectUrl);
		userID=response.uid
		window.location=response.redirectUrl+'?'+userID
	  })
		.done(function() {
		  
		  log( "second success" );
		})
		.fail(function(error) {
		  log(error.responseJSON.error.sqlMessage);
		})
		.always(function() {
		  log( "finished" );
		});


}
function loadEmploymentDetails(uid){
	log(uid)
	$.post( "/getEmploymentData",{uid:uid},function(response) {
		log(response[0]);
		// userID=response.guid	
		// window.location=response.redirectUrl+'?'+userID
		$('#userNameDisplay').text(response[0].user_name)
		$('#jobTitle').text(response[0].job_title_id)
		$('#companyName').text(response[0].org_id)
		$('#empNumber').text(response[0].emp_num)
		$('#managerName').text(response[0].mgr_name)
		$('#managerEmail').text(response[0].mgr_email)
		$('#workDescription').text(response[0].desc_work)
		$('#employmentType').text(response[0].emp_type_id)
		
		
	  })
		.done(function() {
		  
		  log( "second success" );
		})
		.fail(function(error) {
		  log(error.responseJSON.error.sqlMessage);
		})
		.always(function() {
		  log( "finished" );
		});
}

function loadEducationDetails(uid){
	log(uid)
	$.post( "/getEducationData",{uid:uid},function(response) {
		log(response[0]);
		// userID=response.guid	
		// window.location=response.redirectUrl+'?'+userID
		$('#userNameDisplay').text(response[0].user_name)
		$('#educationalInstitute').text(response[0].org_id)
		$('#degree').text(response[0].Degree)
		$('#specality').text(response[0].specialization)
		$('#membershipNumber').text(response[0].mem_num)
		
		
		
	  })
		.done(function() {
		  
		  log( "second success" );
		})
		.fail(function(error) {
		  log(error.responseJSON.error.sqlMessage);
		})
		.always(function() {
		  log( "finished" );
		});
}

function redir(uid){
	window.location="employment.html"+'?'+uid
}
function redirEducation(uid){
	window.location="education.html"+'?'+uid
}