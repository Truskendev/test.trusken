
let userNameToDisplay=''
function isValidEmail(emailAddress) {
	var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

	return pattern.test(emailAddress);

}

function login(){
	 let loginData=
	 {
	 loginName:$('#uname').val(),
	 loginPass:$('#passw').val()
	}
	if (isValidEmail(loginData['loginName']) && (loginData['loginPass'].length > 1)) {

	$.post( "/loginUser",loginData,function(response) {
		log(response);
		if(response.status== 200){ alert(response.user_id)}
		else{
		userID=response.guid
		window.location=response.redirectUrl+'?'+userID
		}
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
	else {
	
	$('#loginForm .input-error').delay(500).fadeIn(1000);
	$('#loginForm .input-success').fadeOut(500);
	}
}
const log=console.log

function registerUser(){
	 
let userData={
		regUsr:$('#namew').val(),
	 regEmail:$('#emaile').val(),
	 regPass:$('#regpass').val()
	}
	if (isValidEmail(userData['regEmail']) && (userData['regUsr'].length > 1)&& (userData['regPass'].length > 1)) {
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
	else{
		$('#loginForm .input-error').delay(500).fadeIn(1000);
		$('#loginForm .input-success').fadeOut(500);
	}
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
	stMonth=$(".stMonth option:selected").val();
	stYear=$(".stYear option:selected").val();

	enMonth=$(".enMonth option:selected").val();
	enYear=$(".enYear option:selected").val();

	let workData={
		workTitle:$('#workTitle').val(),
		companyName:$('#companyName').val(),
		workstartYear:stMonth+"/"+stYear,
		workEndYear:enMonth+"/"+enYear,
		employeeNumber:$('#employeeNumber').val(),
		managerNumber:$('#managerNumber').val(),
		managerEmail:$('#managerEmail').val(),
		empdesc:$('#empdesc').val(),
		
		selectedworkexp:selectedworkexp,
	  uid:window.location.href.split('?')[1]
	}
	if ((workData['companyName'].length > 1) && (workData['workstartYear'].length > 1) && (workData['workEndYear'].length > 1) && (workData['workTitle'].length > 1))  {
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
	else{
		alert("please fill in the data")
	}

}


function addEducation(){
	
	let eduData={
		eduInstut:$('#eduInstut').val(),
		degreeCertificate:$('#degreeCertificate').val(),
		edustartYear:$('#edustartYear').val(),
		eduEndYear:$('#eduEndYear').val(),
		speciality:$('#speciality').val(),
		memNumber:$('#memNumber').val(),
		
		
		
	  uid:window.location.href.split('?')[1]
	}
	if ((eduData['eduInstut'].length > 1) && (eduData['edustartYear'].length > 1) && (eduData['degreeCertificate'].length > 1) && (eduData['eduEndYear'].length > 1) ) {
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
	else{
		alert("fill in the data");
	}

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
		$('#startDate').text(response[0].start_date)
		$('#endDate').text(response[0].end_date)
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
		$('#degree').text(response[0].degree)
		$('#startDdate').text(response[0].start_year)
		$('#endDdate').text(response[0].end_year)
		
		
		
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
function redirectHome(){


var uid=window.location.href.split('?')[1]
window.location="home.html?"+uid
}
// $(document).ready(function(){

// 	$(".monthPicker").datepicker({
// 	dateFormat: 'MM yy',
// 	changeMonth: true,
// 	changeYear: true,
// 	showButtonPanel: true,

// 	onClose: function(dateText, inst) {
// 			var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
// 			var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
// 			$(this).val($.datepicker.formatDate('MM yy', new Date(year, month, 1)));
// 	}
// });

// $(".monthPicker").focus(function () {
// 	$(".ui-datepicker-calendar").hide();
// 	$("#ui-datepicker-div").position({
// 			my: "center top",
// 			at: "center bottom",
// 			of: $(this)
// 	});
// });
// });
