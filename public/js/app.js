
let userNameToDisplay=''
let cT=0;
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
function loginHom(){
	let loginDat=
	{
	loginName:$('#unameq').val(),
	loginPass:$('#passwq').val()
 }
 if (isValidEmail(loginDat['loginName']) && (loginDat['loginPass'].length > 1)) {

 $.post( "/loginUser",loginDat,function(response) {
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
 
 alert("please fill in details");
 }
}
const log=console.log
function modalData(){
	
	registerUser();
}
function registerUser(){

	let userData={
		regUsr:$('#namew').val(),
	 regEmail:$('#emaile').val(),
	 regPass:$('#regpass').val(),
	 signature:$('#qwer').attr('src')
	}

	if (isValidEmail(userData['regEmail']) && (userData['regUsr'].length > 1)&& (userData['regPass'].length > 1)) {
	$.post( "/registerNewUser",userData,function(response) {
		log(response.redirectUrl);
		if(response.status== 500){ alert("User already exists")}
		userID=response.guid
		window.location=response.redirectUrl+'?'+userID
	  })
		.done(function() {
		  
		  log( "second success" );
		})
		.fail(function(error) {
		  log(error.responseJSON.error.sqlMessage);
		})
		.always(function(response) {
			if(response.status== 500){ alert("User already exists")}
			$('#myModal2').hide();
		  log( "finished" );
		});
	}
	else{
		$('#myModal2').hide();
		$('#regForm .input-error').delay(500).fadeIn(1000);
		$('#regForm .input-success').fadeOut(500);
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






function addexp(){






	
	
	cT=cT+1
	
	$('#addEx').append(`<div class="panel panel-default" id="addEx">
						<div class="panel-heading">Add Experience</div>
							<div class="panel-body">
								<div class="col-md-6">
									<form role="form">
									<div class="form-group">
										<label>Title*</label>
										<input class="form-control" id="workTitle`+cT+`" type="text" placeholder="Job Title">
									</div>
									<div class="form-group">
										<label>Company*</label>
										<input class="form-control" id="companyName`+cT+`"  type="email" placeholder="Company">
									</div>
									<div class="form-group" >
									<label>Tenure*</label></br>
									<label>start</label>
									<!-- <input class="form-control" id="workstartYear"   type="text" placeholder="Start Year"><br> -->
									<select name="date" class="form-control stMonth`+cT+`" style="width:25%" disabled>
											<option>Date</option>
											<option value="JAN">1</option>
											<option value="FEB">2</option>
											<option value="MAR">3</option>
											<option value="APR">4</option>
											<option value="MAY">5</option>
											<option value="JUN">6</option>
											<option value="JUL">7</option>
											<option value="AUG">8</option>
											<option value="SEP">9</option>
											<option value="OCT">10</option>
											<option value="NOV">11</option>
											<option value="DEC">12</option>
											<option value="DEC">13</option>
											<option value="DEC">14</option>
											<option value="DEC">15</option>
											<option value="DEC">16</option>
											<option value="DEC">17</option>
											<option value="DEC">18</option>
											<option value="DEC">19</option>
											<option value="DEC">20</option>
											<option value="DEC">21</option>
											<option value="DEC">22</option>
											<option value="DEC">23</option>
											<option value="DEC">24</option>
											<option value="DEC">25</option>


											<option value="DEC">26</option>

											<option value="DEC">27</option>
											<option value="DEC">28</option>
											<option value="DEC">29</option>
											<option value="DEC">30</option>
											<option value="DEC">31</option>
	
										</select>
									<select name="month" class="form-control stMonth`+cT+`" style="width:25%;  float: left; margin-top: -35px; margin-left: 130px;">
										<option>MONTH</option>
										<option value="JAN">JAN</option>
										<option value="FEB">FEB</option>
										<option value="MAR">MAR</option>
										<option value="APR">APR</option>
										<option value="MAY">MAY</option>
										<option value="JUN">JUN</option>
										<option value="JUL">JUL</option>
										<option value="AUG">AUG</option>
										<option value="SEP">SEP</option>
										<option value="OCT">OCT</option>
										<option value="NOV">NOV</option>
										<option value="DEC">DEC</option>

									</select>
									
									<select name="year" class="form-control stYear`+cT+`" style="width:25%; float: left; margin-top: -35px; margin-left: 260px;" >
											<option>YEAR</option>
											<option value="1990">1990</option>
											<option value="1991">1991</option>
											<option value="1992">1992</option>
											<option value="1993">1993</option>
											<option value="1994">1994</option>
											<option value="1995">1995</option>
											<option value="1996">1996</option>
											<option value="1997">1997</option>
											<option value="1998">1998</option>
											<option value="1999">1999</option>
											<option value="2000">2000</option>
											<option value="2001">2001</option>
											<option value="2002">2002</option>
											<option value="2003">2003</option>
											<option value="2004">2004</option>
											<option value="2005">2005</option>
											<option value="2006">2006</option>
											<option value="2007">2007</option>
											<option value="2008">2008</option>
											<option value="2009">2009</option>
											<option value="2010">2010</option>
											<option value="2011">2011</option>
											<option value="2012">2012</option>
											<option value="2013">2013</option>
											<option value="2014">2014</option>
											<option value="2015">2015</option>
											<option value="2016">2016</option>
											<option value="2017">2017</option>
											<option value="2018">2018</option>
											
	
	
										</select>
									<label>End</label>
									<!-- <input class="form-control" id="workEndYear"  type="text" placeholder="End Year"> -->

									<!-- <select name="month" class="form-control enMonth`+cT+`">
											<option>MONTH</option>
											<option value="JAN">JAN</option>
											<option value="FEB">FEB</option>
											<option value="MAR">MAR</option>
											<option value="APR">APR</option>
											<option value="MAY">MAY</option>
											<option value="JUN">JUN</option>
											<option value="JUL">JUL</option>
											<option value="AUG">AUG</option>
											<option value="SEP">SEP</option>
											<option value="OCT">OCT</option>
											<option value="NOV">NOV</option>
											<option value="DEC">DEC</option>
	
										</select>
										<br>
										<select name="year" class="form-control enYear`+cT+`">
												<option>YEAR</option>
												<option value="1990">1990</option>
												<option value="1991">1991</option>
												<option value="1992">1992</option>
												<option value="1993">1993</option>
												<option value="1994">1994</option>
												<option value="1995">1995</option>
												<option value="1996">1996</option>
												<option value="1997">1997</option>
												<option value="1998">1998</option>
												<option value="1999">1999</option>
												<option value="2000">2000</option>
												<option value="2001">2001</option>
												<option value="2002">2002</option>
												<option value="2003">2003</option>
												<option value="2004">2004</option>
												<option value="2005">2005</option>
												<option value="2006">2006</option>
												<option value="2007">2007</option>
												<option value="2008">2008</option>
												<option value="2009">2009</option>
												<option value="2010">2010</option>
												<option value="2011">2011</option>
												<option value="2012">2012</option>
												<option value="2013">2013</option>
												<option value="2014">2014</option>
												<option value="2015">2015</option>
												<option value="2016">2016</option>
												<option value="2017">2017</option>
												<option value="2018">2018</option>
												
		
		
											</select> -->
											<select name="date" class="form-control enDays`+cT+`" style="width:25%" disabled>
													<option>Date</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
													<option value="6">6</option>
													<option value="7">7</option>
													<option value="8">8</option>
													<option value="9">9</option>
													<option value="10">10</option>
													<option value="11">11</option>
													<option value="12">12</option>
													<option value="13">13</option>
													<option value="14">14</option>
													<option value="15">15</option>
													<option value="16">16</option>
													<option value="17">17</option>
													<option value="18">18</option>
													<option value="19">19</option>
													<option value="20">20</option>
													<option value="21">21</option>
													<option value="22">22</option>
													<option value="23">23</option>
													<option value="24">24</option>
													<option value="25">25</option>
		
		
													<option value="26">26</option>
		
													<option value="27">27</option>
													<option value="28">28</option>
													<option value="29">29</option>
													<option value="30">30</option>
													<option value="31">31</option>
			
												</select>
											<select name="month" class="form-control enMonth`+cT+`" style="width:25%;  float: left; margin-top: -35px; margin-left: 130px;">
												<option>MONTH</option>
												<option value="JAN">JAN</option>
												<option value="FEB">FEB</option>
												<option value="MAR">MAR</option>
												<option value="APR">APR</option>
												<option value="MAY">MAY</option>
												<option value="JUN">JUN</option>
												<option value="JUL">JUL</option>
												<option value="AUG">AUG</option>
												<option value="SEP">SEP</option>
												<option value="OCT">OCT</option>
												<option value="NOV">NOV</option>
												<option value="DEC">DEC</option>
		
											</select>
											
											<select name="year" class="form-control enYear`+cT+`" style="width:25%; float: left; margin-top: -35px; margin-left: 260px;" >
													<option>YEAR</option>
													<option value="1990">1990</option>
													<option value="1991">1991</option>
													<option value="1992">1992</option>
													<option value="1993">1993</option>
													<option value="1994">1994</option>
													<option value="1995">1995</option>
													<option value="1996">1996</option>
													<option value="1997">1997</option>
													<option value="1998">1998</option>
													<option value="1999">1999</option>
													<option value="2000">2000</option>
													<option value="2001">2001</option>
													<option value="2002">2002</option>
													<option value="2003">2003</option>
													<option value="2004">2004</option>
													<option value="2005">2005</option>
													<option value="2006">2006</option>
													<option value="2007">2007</option>
													<option value="2008">2008</option>
													<option value="2009">2009</option>
													<option value="2010">2010</option>
													<option value="2011">2011</option>
													<option value="2012">2012</option>
													<option value="2013">2013</option>
													<option value="2014">2014</option>
													<option value="2015">2015</option>
													<option value="2016">2016</option>
													<option value="2017">2017</option>
													<option value="2018">2018</option>
													
			
			
												</select>

								</div>
										<div class="form-group">
										<label>Employee Number </label>
										<input class="form-control" id="employeeNumber`+cT+`" type="text" placeholder="Employee Number">
									</div>
									
										<div class="form-group" id="checkdeck" style="display:none">
										<label>Manager's Name</label>
										<input class="form-control"  id="managerNumber`+cT+`" type="text" placeholder="Manager's Name">
									</div>
									
										<div class="form-group" id="checkdeck" style="display:none">
										<label>Manager's Email* </label>
										<input class="form-control" id="managerEmail"  type="text" placeholder="Manager's Email">
									</div>
									
																		
									<div class="form-group" id="checkdeck" style="display:none">
										<label>Description of Work*</label>
										<textarea class="form-control"  id="empdesc`+cT+`" rows="3"></textarea>
									</div>
									
									
								
									<a type="button" onclick="addWorkex()" class="btn btn-primary">SUBMIT</a>
										<a type="button" onclick="addexp();" class="btn btn-primary"><em class="fa fa-plus">&nbsp;</em> Add More Workex </a>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<label>Employment Type</label>
											<div class="radio">
												<label>
													<input type="radio" name="employmentType`+cT+`" onclick="dissp()" id="fullTJob" checked value="Full Time Job">Full Time Job 
												</label>
											</div>
											<div class="radio">
												<label>
													<input type="radio" name="employmentType`+cT+`"onclick="dissp()" id="partTime" value="Part Time">Part Time
	
												</label>
											</div>
											<div class="radio">
												<label>
													<input type="radio" name="employmentType`+cT+`"  id="Consultant" onclick="dissp()" value="Consultant">Consultant
												</label>
											</div>
											<div class="radio">
												<label>
													<input type="radio" name="employmentType`+cT+`" onclick="dissp()" id="Internship" value="Internship">Internship
												</label>
											</div>
											<div class="radio">
												<label>
													<input type="radio" name="employmentType`+cT+`" id="Freelance" onclick="dissp()" value="Freelance">Freelance
	
												</label>
											</div>
											<div class="radio">
												<label>
													<input type="radio" name="employmentType`+cT+`" onclick="dissp()" id="Temporary" value="Temporary">Temporary
	
	
												</label>
											</div>
											
										</div>
										
										
									</div>
								</form>
							</div>
						</div>
					</div>`);
				
	}










function addWorkex(){
	var selectedworkexp = new Array();
		
			var workData=[]
		
		let stMonth=new Array();
		let stYear=new Array();
		let enMonth=new Array();
		let enYear=new Array();

		for(c=0;c<=cT;c++) { 
			
			$('input[name="employmentType'+c+'"]:checked').each(function() {
				selectedworkexp =this.value;
			});
				$(".stMonth"+c+" option:selected").each(function() {
					stMonth =this.value;
				});
				$(".stYear"+c+" option:selected").each(function() {
					stYear =this.value;
				});
				$(".enMonth"+c+" option:selected").each(function() {
					enMonth =this.value;
				});
				$(".enYear"+c+" option:selected").each(function() {
					enYear=this.value;
				});
			
			
			
			workData1={
			workTitle:$('#workTitle'+c).val(),
			
			companyName:$('#companyName'+c).val(),
			workstartYear:stMonth+"/"+stYear,
			workEndYear:enMonth+"/"+enYear,
			employeeNumber:$('#employeeNumber'+c).val(),
			managerNumber:$('#managerNumber'+c).val(),
			managerEmail:$('#managerEmail'+c).val(),
			empdesc:$('#empdesc'+c).val(),
			
			selectedworkexp:selectedworkexp,
			uid:window.location.href.split('?')[1],
		
}
workData[c]=workData1




if ((workData[c]['companyName'].length > 1) && (workData[c]['workstartYear'].length > 1) && (workData[c]['workEndYear'].length > 1) && (workData[c]['workTitle'].length > 1))  {
	$.post( "/addWorkExData",workData[c],function(response) {
		
		
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


		}




		function addedu(){
			cT=cT+1;
			$('#addEd').append(`<div class="panel panel-default" id="addEd">
								<div class="panel-heading">Eduction</div>
									<div class="panel-body">
										<div class="col-md-6">
											<form role="form">
											<div class="form-group">
												<label>University / School / Institution *</label>
												<input class="form-control" id="eduInstut`+cT+`"  type="text" placeholder=" ">
											</div>
											<div class="form-group">
												<label>Degree / Certificate *</label>
												<input class="form-control" id="degreeCertificate`+cT+`" type="text" placeholder="">
											</div>
											<div class="form-group">
									<label>Tenure*</label></br>
									<label>start</label>
									<!-- <input class="form-control" id="edustartYear"  type="text" placeholder="Start Year"><br> -->
									<select name="year" class="form-control edstYear`+cT+`" style="width:25%;">
											<option>YEAR</option>
											<option value="1990">1990</option>
											<option value="1991">1991</option>
											<option value="1992">1992</option>
											<option value="1993">1993</option>
											<option value="1994">1994</option>
											<option value="1995">1995</option>
											<option value="1996">1996</option>
											<option value="1997">1997</option>
											<option value="1998">1998</option>
											<option value="1999">1999</option>
											<option value="2000">2000</option>
											<option value="2001">2001</option>
											<option value="2002">2002</option>
											<option value="2003">2003</option>
											<option value="2004">2004</option>
											<option value="2005">2005</option>
											<option value="2006">2006</option>
											<option value="2007">2007</option>
											<option value="2008">2008</option>
											<option value="2009">2009</option>
											<option value="2010">2010</option>
											<option value="2011">2011</option>
											<option value="2012">2012</option>
											<option value="2013">2013</option>
											<option value="2014">2014</option>
											<option value="2015">2015</option>
											<option value="2016">2016</option>
											<option value="2017">2017</option>
											<option value="2018">2018</option>
										</select>
									<label>End</label>
									<!-- <input class="form-control" id="eduEndYear"  type="text" placeholder="End Year"> -->
									<select name="year" class="form-control edEnYear`+cT+`" style="width:25%;">
											<option>YEAR</option>
											<option value="1990">1990</option>
											<option value="1991">1991</option>
											<option value="1992">1992</option>
											<option value="1993">1993</option>
											<option value="1994">1994</option>
											<option value="1995">1995</option>
											<option value="1996">1996</option>
											<option value="1997">1997</option>
											<option value="1998">1998</option>
											<option value="1999">1999</option>
											<option value="2000">2000</option>
											<option value="2001">2001</option>
											<option value="2002">2002</option>
											<option value="2003">2003</option>
											<option value="2004">2004</option>
											<option value="2005">2005</option>
											<option value="2006">2006</option>
											<option value="2007">2007</option>
											<option value="2008">2008</option>
											<option value="2009">2009</option>
											<option value="2010">2010</option>
											<option value="2011">2011</option>
											<option value="2012">2012</option>
											<option value="2013">2013</option>
											<option value="2014">2014</option>
											<option value="2015">2015</option>
											<option value="2016">2016</option>
											<option value="2017">2017</option>
											<option value="2018">2018</option>
										</select>
								</div>
												<div class="form-group">
												<label>Specialization  </label>
												<input class="form-control" id="speciality`+cT+`" type="text" placeholder="">
											</div>
											
												<div class="form-group">
												<label>Membership Number</label>
												<input class="form-control" id="memNumber`+cT+`" type="text" placeholder="">
											</div>
											
											
										
											<a type="submit" onclick="addEducation()" class="btn btn-primary">SUBMIT</a>
												<a type="submit" onclick="addedu();" class="btn btn-primary"><em class="fa fa-plus">&nbsp;</em> Add Eduction </a>
											</div>
										
												
											</div>
										</form>
									</div>
								</div>
							</div>`);
			
			}
function addEducation(){
	


	var eduData=[]
		
		

		for(c=0;c<=cT;c++) { 
			


	let eduData1={
		eduInstut:$('#eduInstut'+cT).val(),
		degreeCertificate:$('#degreeCertificate'+cT).val(),
		edustartYear:$(".edstYear"+cT+" option:selected").val(),
		eduEndYear:$(".edEnYear"+cT+" option:selected").val(),
		speciality:$('#speciality'+cT).val(),
		memNumber:$('#memNumber'+cT).val(),
		
		
		
	  uid:window.location.href.split('?')[1]
	}
	eduData[c]=eduData1
	if ((eduData[c]['eduInstut'].length > 1) && (eduData[c]['edustartYear'].length > 1) && (eduData[c]['degreeCertificate'].length > 1) && (eduData[c]['eduEndYear'].length > 1) ) {
	$.post( "/addEducationData",eduData[c],function(response) {
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
}
function loadEmploymentDetails(uid){
	log(uid)
	$.post( "/getEmploymentData",{uid:uid},function(response) {
		log(response[0]);




		response.forEach((element) => {
		
		var we=`<li>
		<div class="timeline-badge"><i class="glyphicon glyphicon-pushpin"></i></div>
		<div class="timeline-panel">
			<div class="timeline-heading">
				<h4 class="timeline-title" id="companyName">`+element.org_id+`</h4>
			</div>
			<div class="timeline-body">
					<p id="jobTitle">`+element.job_title_id+`</p>	
				<p id="startDate">`+element.start_date+`</p>
				<p id="endDate">`+element.end_date+`</p>
				<p></p>
			</div>
		</div>
	</li>`
	$('#employmentAppend').append(we);
		
		});
		// userID=response.guid	
		// window.location=response.redirectUrl+'?'+userID
		// $('#userNameDisplay').text(response[0].user_name)
		// $('#jobTitle').text(response[0].job_title_id)
		// $('#companyName').text(response[0].org_id)
		// $('#empNumber').text(response[0].emp_num)
		// $('#startDate').text(response[0].start_date)
		// $('#endDate').text(response[0].end_date)
		// $('#workDescription').text(response[0].desc_work)
		// $('#employmentType').text(response[0].emp_type_id)
		
		
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


		response.forEach((element) => {
		var are=`<li>
		<div class="timeline-badge"><i class="glyphicon glyphicon-pushpin"></i></div>
		<div class="timeline-panel">
			<div class="timeline-heading">
				<h4 class="timeline-title" id="educationalInstitute">`+element.org_id+`</h4>
			</div>
			<div class="timeline-body">
				<p id="degree">`+element.degree+`</p>
				<p id="startDdate">`+element.start_year+`</p>
				<p id="endDdate">`+element.end_year+`</p>
			</div>
		</div>
	</li>`

	$('#appendEducation').append(are);
		})
		// userID=response.guid	
		// window.location=response.redirectUrl+'?'+userID
		// $('#userNameDisplay').text(response[0].user_name)
		// $('#educationalInstitute').text(response[0].org_id)
		// $('#degree').text(response[0].degree)
		// $('#startDdate').text(response[0].start_year)
		// $('#endDdate').text(response[0].end_year)
		
		
		
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
function signupLinkdn(){
window.location="/linkedinSignin"

}


var isSign = false;
		var leftMButtonDown = false;
		
		// jQuery(function(){
		// 	//Initialize sign pad
		// 	init_Sign_Canvas();
		// });
		
		function fun_submit() {
			if(isSign) {
				var canvas = $("#canvas").get(0);
				var imgData = canvas.toDataURL();
				
				jQuery('#mdl-bdy').find('img').remove();
				jQuery('#mdl-bdy').append(jQuery('<p>Your Sign:</p>'));
				jQuery('#mdl-bdy').append($('<img id="qwer"/>').attr('src',imgData));
				modalData();
				
			} else {
				alert('Please sign');
			}
		}
		
		
		
		function init_Sign_Canvas() {
			isSign = false;
			leftMButtonDown = false;
			
			//Set Canvas width
			var sizedWindowWidth = $(window).width();
			if(sizedWindowWidth > 700)
				sizedWindowWidth = $(window).width() /3.5 ;
			else if(sizedWindowWidth > 400)
				sizedWindowWidth = sizedWindowWidth - 100;
			else
				sizedWindowWidth = sizedWindowWidth - 50;
			 
			 $("#canvas").width(sizedWindowWidth);
			 $("#canvas").height(200);
			 $("#canvas").css("border","1px solid #000");
			
			 var canvas = $("#canvas").get(0);
			
			 canvasContext = canvas.getContext('2d');

			 if(canvasContext)
			 {
				 canvasContext.canvas.width  = sizedWindowWidth;
				 canvasContext.canvas.height = 200;

				 canvasContext.fillStyle = "#fff";
				 canvasContext.fillRect(0,0,sizedWindowWidth,200);
				 
				 canvasContext.moveTo(50,150);
				 canvasContext.lineTo(sizedWindowWidth-50,150);
				 canvasContext.stroke();
				
				 canvasContext.fillStyle = "#000";
				 canvasContext.font="20px Arial";
				 canvasContext.fillText("x",40,155);
			 }
			 // Bind Mouse events
			 $(canvas).on('mousedown', function (e) {
				 if(e.which === 1) { 
					 leftMButtonDown = true;
					 canvasContext.fillStyle = "#000";
					 var x = e.pageX - $(e.target).offset().left;
					 var y = e.pageY - $(e.target).offset().top;
					 canvasContext.moveTo(x, y);
				 }
				 e.preventDefault();
				 return false;
			 });
			
			 $(canvas).on('mouseup', function (e) {
				 if(leftMButtonDown && e.which === 1) {
					 leftMButtonDown = false;
					 isSign = true;
				 }
				 e.preventDefault();
				 return false;
			 });
			
			 // draw a line from the last point to this one
			 $(canvas).on('mousemove', function (e) {
				 if(leftMButtonDown == true) {
					 canvasContext.fillStyle = "#000";
					 var x = e.pageX - $(e.target).offset().left;
					 var y = e.pageY - $(e.target).offset().top;
					 canvasContext.lineTo(x,y);
					 canvasContext.stroke();
				 }
				 e.preventDefault();
				 return false;
			 });
			 
			 //bind touch events
			 $(canvas).on('touchstart', function (e) {
				leftMButtonDown = true;
				canvasContext.fillStyle = "#000";
				var t = e.originalEvent.touches[0];
				var x = t.pageX - $(e.target).offset().left;
				var y = t.pageY - $(e.target).offset().top;
				canvasContext.moveTo(x, y);
				
				e.preventDefault();
				return false;
			 });
			 
			 $(canvas).on('touchmove', function (e) {
				canvasContext.fillStyle = "#000";
				var t = e.originalEvent.touches[0];
				var x = t.pageX - $(e.target).offset().left;
				var y = t.pageY - $(e.target).offset().top;
				canvasContext.lineTo(x,y);
				canvasContext.stroke();
				
				e.preventDefault();
				return false;
			 });
			 
			 $(canvas).on('touchend', function (e) {
				if(leftMButtonDown) {
					leftMButtonDown = false;
					isSign = true;
				}
			 
			 });
		}
$(document).ready(function(){
	$("#myModal2").on('shown.bs.modal', function () {
		init_Sign_Canvas();
	});
	$("#myModal").on('shown.bs.modal', function () {
		$('#loginForm .input-error').hide();
		$('#loginForm .input-success').fadeOut(500);
	});
})


function dissp(){

	var checker=$('input[name="employmentType'+cT+'"]:checked').val()
	if(checker=="Freelance" || checker=="Consultant"){
			$('#checkdeck,#checkdeck1,#checkdeck2').show();
	}else{
		$('#checkdeck,#checkdeck1,#checkdeck2').hide();

	}


}