let userNameToDisplay = ''
let cT = 0;

function isValidEmail(emailAddress) {
	var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

	return pattern.test(emailAddress);

}

function login() {
	let loginData =
	{
		loginName: $('#uname').val(),
		loginPass: $('#passw').val()
	}
	if (isValidEmail(loginData['loginName']) && (loginData['loginPass'].length > 1)) {

		$.post("/loginUser", loginData, function (response) {
			log(response);
			if (response.status == 200) { alert(response.user_id) }
			else {
				userID = response.guid
				window.location = response.redirectUrl + '?' + userID
			}
		})
			.done(function () {
				log("second success");
			})
			.fail(function (error) {
				log(error.responseJSON.error.sqlMessage);
			})
			.always(function () {
				log("finished");
			});

	}
	else {

		alert("please fill in the details")
	}
}
function loginHom(rid) {
	let loginDat =
	{
		regUsr: $('#unameq').val(),
		regEmail: $('#unemaill').val(),
		regPass: $('#passwq').val(),
		refId:rid
	}
	if (isValidEmail(loginDat['regEmail']) && (loginDat['regPass'].length > 1)&& (loginDat['regUsr'].length > 1)) {

		$.post("/registerRefferedUser", loginDat, function (response) {
			log(response);
			if (response.status == 500) { alert("User already exists") }
			userID = response.guid
			window.location = response.redirectUrl + '?' + userID
			
		})
			.done(function () {
				log("second success");
			})
			.fail(function (error) {
				log(error.responseJSON.error.sqlMessage);
			})
			.always(function (response) {
				if (response.status == 500) { alert("User already exists") }
				//$('#myModal2').hide();
				log("finished");
			});

	}
	else {

		alert("please fill in details");
	}
}
const log = console.log
function modalData() {

	registerUser();
}
function registerUser() {

	let userData = {
		regUsr: $('#namew').val(),
		regEmail: $('#emaile').val(),
		regPass: $('#regpass').val(),
		signature: $('#qwer').attr('src')
	}

	if (isValidEmail(userData['regEmail']) && (userData['regUsr'].length > 1) && (userData['regPass'].length > 1)) {
		$.post("/registerNewUser", userData, function (response) {
			log(response.redirectUrl);
			if (response.status == 500) { alert("User already exists") }
			userID = response.guid
			window.location = response.redirectUrl + '?' + userID
		})
			.done(function () {

				log("second success");
			})
			.fail(function (error) {
				log(error.responseJSON.error.sqlMessage);
			})
			.always(function (response) {
				if (response.status == 500) { alert("User already exists") }
				$('#myModal2').hide();
				log("finished");
			});
	}
	else {
		
		alert("please fill in the details")
	}
}
function loadaddExperiance(uid){
	var qwe = getWorkTemplate(0)
	$('#addExpBtn').attr("onclick", "addexp(1)")
	$('#submitWrkExp').attr("onclick", "addWorkex(1)")
	$('#addEx').append(qwe);
}
function loadaddExp(uid) {
	log(uid)
	$.post("/getEmploymentData", { uid: uid }, function (response) {
		log(response[0]);
		len = response.length
		if (len == 0) {
			var qwe = getWorkTemplate(0)
			$('#addExpBtn').attr("onclick", "addexp(1)")
			$('#submitWrkExp').attr("onclick", "addWorkex(1)")

			$('#addEx').append(qwe);
		}
		else {

			for (var i = 0; i < len; i++) {
				if (response[i].start_date !== null) {
					var month = response[i].start_date.split('/')[0];
					var year = response[i].start_date.split('/')[1];
				}
				if (response[i].end_date !== null) {
					var emonth = response[i].end_date.split('/')[0];
					var eyear = response[i].end_date.split('/')[1];
				}

				var qwe = getWorkTemplate(i, response[i].exp_id)
				$('#addExpBtn').attr("onclick", "addexp(" + (i + 1) + ")")
				$('#submitWrkExp').attr("onclick", "addWorkex(" + (i + 1) + ")")

				$('#addEx').append(qwe);
				$('#workTitle' + i).val(response[i].job_title_id);
				$('#companyName' + i).val(response[i].org_id);
				$('.stMonth' + i).val(month);
				$('.stYear' + i).val(year);
				$('.enMonth' + i).val(emonth);
				$('.enYear' + i).val(eyear);
				$('#employeeNumber' + i).val(response[i].emp_num);
				$('#managerNumber' + i).val(response[i].mgr_name);
				$('#managerEmail' + i).val(response[i].mgr_email);
				$('#empdesc' + i).val(response[i].desc_work);
				month = ""
				year = ""
				emonth = ""
				eyear = ""
			}




		}


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
		.done(function () {

			log("second success");
		})
		.fail(function (error) {
			log(error.responseJSON.error.sqlMessage);
		})
		.always(function () {
			log("finished");
		});
}

function loadProfilePage(uid) {

	log(uid)
	$.post("/getProfileData", { uid: uid }, function (response) {
		log(response[0]);
		// userID=response.guid	
		// window.location=response.redirectUrl+'?'+userID
		$('#userNameDisplay').text(response[0].user_name)
		$('#userNameDispla').text(response[0].user_name)
		$('#fullName').val(response[0].user_name)
		$('#emailId').val(response[0].email_id)

	})
		.done(function () {

			log("second success");
		})
		.fail(function (error) {
			log(error.responseJSON.error.sqlMessage);
		})
		.always(function () {
			log("finished");
		});
}

function updateProfile() {

	let profileData = {
		fullName: $('#fullName').val(),
		userEmail: $('#emailId').val(),
		userNumber: $('#phoneNumber').val(),
		uid: window.location.href.split('?')[1]
	}
	$.post("/updateProfileData", profileData, function (response) {
		log(response.redirectUrl);
		userID = response.guid
		window.location = response.redirectUrl + '?' + userID
	})
		.done(function () {

			log("second success");
		})
		.fail(function (error) {
			log(error.responseJSON.error.sqlMessage);
		})
		.always(function () {
			log("finished");
		});


}

function addexp(index) {
	// var a;
	// if(lar==-1){
	// 	cT=cT+1
	// }
	// else{

	// 	if(lar==undefined){
	// 		cT=cT+1
	// 	}
	// 	else{
	// 		cT=lar;
	// 	a=lar+1;
	// 	}
	// }
	let template = getWorkTemplate(index)
	$('#addExpBtn').attr("onclick", "addexp(" + (index + 1) + ")")
	$('#submitWrkExp').attr("onclick", "addWorkex(" + (index + 1) + ")")
	$('#addEx').append(template)

}

function addWorkex(expCount) {
	var selectedworkexp = new Array();

	var workData = []
	let stDate = new Array();
	let stMonth = new Array();
	let stYear = new Array();
	let enDate = new Array();
	let enMonth = new Array();
	let enYear = new Array();
	
	for (c = 0; c < expCount; c++) {
var selectedworkexp = new Array();

		$('input[name="employmentType' + c + '"]:checked').each(function () {
			selectedworkexp = this.value;
		});
		if($(".stDate" + c).val()!=""){
		$(".stDate" + c).each(function () {
			stDate = this.value;
		});
	}else{
		$(".enDate" + c).each(function () {
			stDate = "01";
		});
	}
		$(".stMonth" + c).each(function () {
			stMonth = this.value;
		});
		$(".stYear" + c).each(function () {
			stYear = this.value;
		});
		if($(".enDate" + c)!=""){
			$(".enDate" + c).each(function () {
				enDate = this.value;
			});
		}else{
			$(".enDate" + c).each(function () {
				enDate = "01";
			});
		}
		$(".enMonth" + c).each(function () {
			enMonth = this.value;
		});
		$(".enYear" + c).each(function () {
			enYear = this.value;
		});



		workData1 = {
			expID: $('#expID' + c).text(),
			workTitle: $('#workTitle' + c).val(),

			companyName: $('#companyName' + c).val(),
			workstartYear: stDate + "/" + stMonth + "/" + stYear,
			
			workEndYear:  enDate + "/"+enMonth + "/" + enYear,
			employeeNumber: $('#employeeNumber' + c).val(),
			managerNumber: $('#managerNumber' + c).val(),
			managerEmail: $('#managerEmail' + c).val(),
			empdesc: $('#empdesc' + c).val(),

			selectedworkexp: selectedworkexp,
			uid: window.location.href.split('?')[1],

		}
		workData[c] = workData1




		if ((workData[c]['companyName'].length > 1) && (workData[c]['workstartYear'].length > 1)  && (workData[c]['workTitle'].length > 1)) {
			$.post("/addWorkExData", workData[c], function (response) {


				log(response.redirectUrl);
				userID = response.uid
						
				window.location = response.redirectUrl + '?' + userID

			})
				.done(function () {

					log("second success");
				})
				.fail(function (error) {
					log(error.responseJSON.error.sqlMessage);
				})
				.always(function () {
					log("finished");
				});
		}
		else {
			alert("please fill in the data")
		}

	}


}

function addedu(index) {
	var qwe = getEducationTemplate(index)
	$('#addEdu').attr("onclick", "addedu(" + (index + 1) + ")")
				$('#addEduSubmit').attr("onclick","addEducation(" + (index + 1) + ")")

		$('#addEd').append(qwe);

}
function addEducation(cT) {



	var eduData = []



	for (c = 0; c < cT; c++) {



		let eduData1 = {
			eduInstut: $('#eduInstut' + c).val(),
			degreeCertificate: $('#degreeCertificate' + c).val(),
			edustartYear: $(".edstYear" + c).val(),
			eduEndYear: $(".edEnYear" + c).val(),
			speciality: $('#speciality' + c).val(),
			memNumber: $('#memNumber' + c).val(),
			eduID:$('#eduID' + c).text(),
			uid: window.location.href.split('?')[1]
		}
		eduData[c] = eduData1
		if ((eduData[c]['eduInstut'].length > 1) && (eduData[c]['edustartYear'].length > 1) && (eduData[c]['degreeCertificate'].length > 1) && (eduData[c]['eduEndYear'].length > 1)) {
			$.post("/addEducationData", eduData[c], function (response) {
				log(response.redirectUrl);
				userID = response.uid
				window.location = response.redirectUrl + '?' + userID
			})
				.done(function () {

					log("second success");
				})
				.fail(function (error) {
					log(error.responseJSON.error.sqlMessage);
				})
				.always(function () {
					log("finished");
				});
		}
		else {
			alert("fill in the data");
		}
	}
}

function loadaddEducate(uid){
	var qwe = getEducationTemplate(0)
	$('#addEdu').attr("onclick", "addedu(1)")
	$('#addEduSubmit').attr("onclick","addEducation(1)")

	$('#addEd').append(qwe);
}

function loadaddEdu(uid) {
	log(uid)
	$.post("/getEducationData", { uid: uid }, function (response) {
		log(response[0]);
		len = response.length
		if (len == 0) {
			var qwe = getEducationTemplate(0)
			$('#addEdu').attr("onclick", "addedu(1)")
			$('#addEduSubmit').attr("onclick","addEducation(1)")

			$('#addEd').append(qwe);
		}
		else {

			for (var i = 0; i < len; i++) {
				// if (response[i].start_date !== null) {
				// 	var month = response[i].start_date.split('/')[0];
				// 	var year = response[i].start_date.split('/')[1];
				// }
				// if (response[i].end_date !== null) {
				// 	var emonth = response[i].end_date.split('/')[0];
				// 	var eyear = response[i].end_date.split('/')[1];
				// }

				var qwe = getEducationTemplate(i, response[i].edu_id)
				$('#addEdu').attr("onclick", "addedu(" + (i + 1) + ")")
				$('#addEduSubmit').attr("onclick","addEducation(" + (i + 1) + ")")

				$('#addEd').append(qwe);
				$('#eduInstut' + i).val(response[i].org_id);
				$('#degreeCertificate' + i).val(response[i].degree);
				$('.edstYear' + i).val(response[i].start_year);
				$('.edEnYear' + i).val(response[i].end_year);
				// $('.enMonth' + i).val(emonth);
				// $('.enYear' + i).val(eyear);
				$('#speciality' + i).val(response[i].specialization);
				$('#memNumber' + i).val(response[i].mem_num);
				// $('#managerEmail' + i).val(response[i].job_title_id);
				// $('#empdesc' + i).val(response[i].job_title_id);
				month = ""
				year = ""
				emonth = ""
				eyear = ""
			}




		}


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
		.done(function () {

			log("second success");
		})
		.fail(function (error) {
			log(error.responseJSON.error.sqlMessage);
		})
		.always(function () {
			log("finished");
		});
}


function loadEmploymentDetails(uid) {
	log(uid)
	$.post("/getEmploymentData", { uid: uid }, function (response) {
		log(response[0]);




		response.forEach((element) => {
			var status= element.verification_status==0 ? "Verification in progress" : "Verified";
			var we = `<li >
		<div class="timeline-badge"><i class="glyphicon glyphicon-pushpin"></i></div>
		<div class="timeline-panel" style="background-color: #dcf8c6;">
			<div class="timeline-heading">
				<h4 class="timeline-title" id="companyName"><b style="color:#000;">Company Name:</b> `+ element.org_id + `</h4>
			</div>
			<div class="timeline-body">
					<p id="jobTitle"><b style="color:#000;">Job Title:</b> `+ element.job_title_id + `</p>	
				<p id="startDate"><b style="color:#000;">Start Date:</b> `+ element.start_date + `</p>
				<p id="endDate"><b style="color:#000;">End Date:</b> `+ element.end_date + `</p>
				<p id="endDate"><b style="color:#2ecc71;">Status:</b> `+ status + `</p>
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
		.done(function () {

			log("second success");
		})
		.fail(function (error) {
			log(error.responseJSON.error.sqlMessage);
		})
		.always(function () {
			log("finished");
		});
}

function loadEducationDetails(uid) {
	log(uid)

	$.post("/getEducationData", { uid: uid }, function (response) {
		log(response[0]);


		response.forEach((element) => {
	

	var are = `<tr>	<td>`+ element.org_id + `</td>
				<td>`+ element.degree + `</td>
				<td>`+ element.start_year + `</td>
				<td> `+ element.end_year + `</td>
				</tr>
			
	`

			$('#customers').append(are);
		})
	

	}).done(function () {

			log("second success");
		})
		.fail(function (error) {
			log(error.responseJSON.error.sqlMessage);
		})
		.always(function () {
			log("finished");
		});


		$.post("/getEmploymentData", { uid: uid }, function (respons) {
			
			respons.forEach((element,index) => {
				var status= element.badge_id==0 ? "Verification in progress" : "Verified";
	
		var we = `<tr>	<td>`+ element.org_id + `</td>
				<td>`+ element.job_title_id + `</td>
				<td>`+ element.start_date + `</td>
				<td>`+ element.end_date + `</td>
				<td> `+ status + `</td>
				<td id="Badge`+index+`"> </td>
				</tr>
			
	`

			$('#employment').append(we);
		})
			
			})
			
			.done(function () {
	
				log("second success");
			})
			.fail(function (error) {
				log(error.responseJSON.error.sqlMessage);
			})
			.always(function () {
				log("finished");
			});
	

			$.post("/getBadgeDetails", {uide:uid}, function (response) {
				var urlforshare;
					log(response)

				response.forEach((elemo,index)=>{
				urlforshare="http://localhost:3000/lumino/badgeDetails.html?"+uid+"/"+elemo.badge_id+""
				let badge=` 
					<img src="`+elemo.badge_name+`" style="width:100px;height:100px;" onclick="redirbdgdatails('`+uid+`',`+elemo.badge_id+`)">
					
							
					<a class=" fa fa-share-alt qq" onclick="accm('`+urlforshare+`')"  data-toggle="modal" data-target="#myModal21" id="stroedval" ></a>
					
					</div>
				`
				$('#Badge'+index).append(badge);
				})
				// 	response[1].forEach((elements)=>{
				// 		if(elements.verification_status==1){
				// 			response[0].forEach((elemo)=>{
				// 				urlforshare="http://localhost:3000/lumino/badgeDetails.html?"+uid+"/"+elemo.badge_id+""
				// 		let badge=` 
				// 		<img src="`+elemo.badge_name+`" style="width:200px;height:200px;" onclick="redirbdgdatails('`+uid+`',`+elemo.badge_id+`)">
						
								
				// 		<a class=" fa fa-share-alt qq" onclick="accm('`+urlforshare+`')"  data-toggle="modal" data-target="#myModal21" id="stroedval" ></a>
						
				// 		</div>
				// 	`
				// 	//$('#atachUrl').attr("data-a2a-url","http://localhost:3000/lumino/badgeDetails.html?'"+uid+"'/'"+elemo.badge_id+"'")
				// 	$('#Badge0').append(badge);
					
				// })
				// }else{
				// 	response[0].forEach((elemo)=>{
				// 		urlforshare="http://localhost:3000/lumino/badgeDetails.html?"+uid+"/"+elemo.badge_id+""
				// 	let badge=` 
			
				// 	<img src="`+elemo.badge_name+`" style="width:200px;height:200px;" onclick="redirbdgdatails('`+uid+`',`+elemo.badge_id+`)">
				// 	<a class=" fa fa-share-alt qq" onclick="accm('`+urlforshare+`')"  data-toggle="modal" data-target="#myModal21" id="stroedval" ></a>
					
				// `
				// //class="a2a_kit a2a_kit_size_32 a2a_default_style"
				// //class="a2a_button_linkedin"
				// $('#Badge0').append(badge);
				
				// 	})
				// }
				// 	})
				
					}).done(function () {
						log("second success");
					})
					.fail(function (error) {
						log(error.responseJSON.error.sqlMessage);
					})
					.always(function () {
						log("finished");
					});
				
					

			}






		




function redirCompSalary(uid){
	window.location.href = "salaryalc.html?"+ uid
}
function redir(uid) {
	window.location = "employment.html" + '?' + uid
}
function redirEducation(uid) {
	window.location = "dashb.html" + '?' + uid
}
function redirtricia(uid) {
	window.location = "trivia.html" + '?' + uid
}
function redirtrust(uid) {
	window.location = "trust.html" + '?' + uid
}
function redirbdgdatails(uid,bid){
	window.location = "badgeDetails.html" + '?' + uid + '/' + bid

}
function redirbadg(uid) {
	window.location = "badge.html" + '?' + uid
}
function redirectHome() {


	var uid = window.location.href.split('?')[1]
	window.location = "salaryalc.html?" + uid
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
function signupLinkdn() {
	window.location = "/linkedinSignin"

}


var isSign = false;
var leftMButtonDown = false;

// jQuery(function(){
// 	//Initialize sign pad
// 	init_Sign_Canvas();
// });

function fun_submit() {
	if (isSign) {
		var canvas = $("#canvas").get(0);
		var imgData = canvas.toDataURL();

		jQuery('#mdl-bdy').find('img').remove();
		jQuery('#mdl-bdy').append(jQuery('<p>Your Sign:</p>'));
		jQuery('#mdl-bdy').append($('<img id="qwer"/>').attr('src', imgData));
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
	if (sizedWindowWidth > 700)
		sizedWindowWidth = $(window).width() / 3.5;
	else if (sizedWindowWidth > 400)
		sizedWindowWidth = sizedWindowWidth - 100;
	else
		sizedWindowWidth = sizedWindowWidth - 50;

	$("#canvas").width(sizedWindowWidth);
	$("#canvas").height(200);
	$("#canvas").css("border", "1px solid #000");

	var canvas = $("#canvas").get(0);

	canvasContext = canvas.getContext('2d');

	if (canvasContext) {
		canvasContext.canvas.width = sizedWindowWidth;
		canvasContext.canvas.height = 200;

		canvasContext.fillStyle = "#fff";
		canvasContext.fillRect(0, 0, sizedWindowWidth, 200);

		canvasContext.moveTo(50, 150);
		canvasContext.lineTo(sizedWindowWidth - 50, 150);
		canvasContext.stroke();

		canvasContext.fillStyle = "#000";
		canvasContext.font = "20px Arial";
		canvasContext.fillText("x", 40, 155);
	}
	// Bind Mouse events
	$(canvas).on('mousedown', function (e) {
		if (e.which === 1) {
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
		if (leftMButtonDown && e.which === 1) {
			leftMButtonDown = false;
			isSign = true;
		}
		e.preventDefault();
		return false;
	});

	// draw a line from the last point to this one
	$(canvas).on('mousemove', function (e) {
		if (leftMButtonDown == true) {
			canvasContext.fillStyle = "#000";
			var x = e.pageX - $(e.target).offset().left;
			var y = e.pageY - $(e.target).offset().top;
			canvasContext.lineTo(x, y);
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
		canvasContext.lineTo(x, y);
		canvasContext.stroke();

		e.preventDefault();
		return false;
	});

	$(canvas).on('touchend', function (e) {
		if (leftMButtonDown) {
			leftMButtonDown = false;
			isSign = true;
		}

	});
}



function loadCompareSalary(uid) {
	log(uid)
	$.post("/getCompareSalaryData", { uid: uid }, function (response) {
		log(response[0]);




		response.forEach((element) => {

			var wer = `
				<option value="`+element.job_title+`" > `+ element.job_title + `</option>
				`
			$('#jTitle').append(wer);

		});
		


	})
		.done(function () {

			log("second success");
		})
		.fail(function (error) {
			log(error.responseJSON.error.sqlMessage);
		})
		.always(function () {
			log("finished");
		});
}

function calcSalaryAvg(userSalary,industryAvg){
	return (userSalary/(industryAvg*2)).toFixed(4)
}

function compareSalary(bar) {
let expList=['freashers','beginers','intermediates','expers','seniorlevel']
	let salaryData = {
		jobTitle: $('#jTitle').val(),
	//	function: $('#jobCategory').val(),
		industry: $('#industry').val(),
		experiance: $('#experiance').val(),
		region: $('#region').val(),
		uid: window.location.href.split('?')[1],
		annualSalary: $('#annualSalary').val()

	}
	$('#inrAmnt').html("<i>INR"+salaryData['annualSalary']+"</i>");
	
	if ((salaryData['jobTitle'].length > 1) && (salaryData['industry'].length > 1)&& (salaryData['experiance'].length >= 1 )  && (salaryData['region'].length > 1) && (salaryData['annualSalary'].length >= 1)) {
		$.post("/checkSalaryDetails", salaryData, function (response) {
			

			var currentExpLevel=expList[salaryData['experiance']]
			// if(salaryData['experiance']==0){
				var percentage=calcSalaryAvg(salaryData['annualSalary'],response[0][currentExpLevel])
				$('#aveerr').html("<b>AVG "+response[0][currentExpLevel]+"</b>");
				if(percentage<=0.3999){
					bar.animate(percentage)
					$('svg').attr("stroke", "red")

				}else if(percentage>=.4 && percentage<=0.5){
					bar.animate(percentage)
					$('svg').attr("stroke", "orange")
				}else if(percentage>=0.5 && percentage<=1) 
				{
					
					bar.animate(percentage)
					$('svg').attr("stroke", "green")
				}
				else if(percentage>1)
				{
					bar.animate(1)
					$('svg').attr("stroke", "green")
				}
				
				if(salaryData['annualSalary'] > response[0][currentExpLevel])
				{
					var amn=salaryData['annualSalary']-response[0][currentExpLevel]
					$('#inrAmnt').html("<i>INR "+amn+"</i> more than average salary")

				}else if(salaryData['annualSalary'] <= response[0][currentExpLevel])
				{
					var amn=response[0][currentExpLevel]-salaryData['annualSalary']
					$('#inrAmnt').html("<i>INR "+(amn)+"</i> less than average salary")

				}
		}).done(function () {

				log("second success");
			})
			.fail(function (error) {
				log(error.responseJSON.error.sqlMessage);
			})
			.always(function (response) {
				//if (response.status == 500) { alert("User already exists") }
				//$('#myModal2').hide();
				//log("finished");
			});
	}
	else {
		alert("Please fill in all the details")
	}
}
function loadTriviaPage(uid){
	$.post("/getTriviaQuestions", { uid: uid }, function (response) {
		log(response[0]);
		//var merge=0;

		response.forEach((element,merge) => {

			
			var correctAnwser=element.correctAnwser				
				var tri=`<div class="panel " id="tag`+merge+`" style="display:none">
			<div class="panel-heading" id="questionHeading" style="text-align:center">
			Question`+element.qid+`
			<svg style="display:none" id="checkCorrect" class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
			</div>
			<div class="panel-body"  style="text-align:center">
			<h4 style="color:#000000"  id="quest`+merge+`">`+element.questions+`</h4>
						<br>
						<div style="text-align:left">
						<div style="padding:2%;">
						<a type="button"  class="btn" onclick="getAnswer(this.id,`+element.qid+`,'`+correctAnwser+`')" id="optionOne"  style="  background-color:#0B4CFF; color:#fff; border:1px solid #0B4CFF; border-radius: 0;">`+element.optionOne+`</a>
						</div>
						<div style="padding:2%;">
						<a type="button"  class="btn" onclick="getAnswer(this.id,`+element.qid+`,'`+correctAnwser+`')" id="optionTwo" style="background-color:#0B4CFF; color:#fff; border:1px solid #0B4CFF; border-radius: 0;">`+element.optionTwo+`</a>
						</div>
						<div style="padding:2%;">
						<a type="button"  class="btn"  onclick="getAnswer(this.id,`+element.qid+`,'`+correctAnwser+`')" id="optionThree" style="background-color:#0B4CFF; color:#fff; border:1px solid #0B4CFF; border-radius: 0;">`+element.optionThree+`</a>
						</div>
						<div style="padding:2%;">
						<a type="button"  class="btn mng"   onclick="getAnswer(this.id,`+element.qid+`,'`+correctAnwser+`')"id="optionFour" style="background-color:#0B4CFF; color:#fff; border:1px solid #0B4CFF; border-radius: 0;">`+element.optionFour+`</a>
						</div>
						</div>
						</div>
						</div>`
						//merge=merge+1
			$('#triPanel').html(tri);
			

		});
		$('#tag0').css("display", "block");
	})
		.done(function () {

			log("second success");
			$.post("/getMarksheet", {uid:uid}, function (response) {
				// log(response[0]);
				$("#ScoreCard").text(response[0]['marks'])
				}).done(function () {
					log("second success");
				})
				.fail(function (error) {
					log(error.responseJSON.error.sqlMessage);
				})
				.always(function () {
					log("finished");
				});
		})
		.fail(function (error) {
			log(error.responseJSON.error.sqlMessage);
		})
		.always(function () {
			log("finished");
		});			
}

function getAnswer(id,mer,correctAnwser){
	// let	triviaData={
		
	// 	id : $('#'+id).text(),
	// 	region: $('#quest'+mer).val(),
	// 	}


		let trivData = {
			qid: mer,
			id: $('#'+id).text()	
		}
		if(trivData['id']==correctAnwser){
			$('#checkCorrect').show();

			setTimeout(function () {
				var uid=window.location.href.split('?')[1]
				// $("#myModal22").hide();
				$.post("/updateMarksheet", {uid:uid,qid:mer,mark:1}, function (response) {
					log(response[0]);
					loadTriviaPage(uid)
					$('#triPanel').fadeIn()
					}).done(function () {
						log("second success");
					})
					.fail(function (error) {
						log(error.responseJSON.error.sqlMessage);
					})
					.always(function () {
						log("finished");
					});
					$('#triPanel').fadeOut()
			}, 2000);
		}else{

			$('#questionHeading').css('color','red')
			$('#questionHeading').text('INCORRECT ✗')
			setTimeout(function () {
				var uid=window.location.href.split('?')[1]
				// $("#myModal22").hide();
				$.post("/updateMarksheet", {uid:uid,qid:mer,mark:0}, function (response) {
					log(response[0]);
					loadTriviaPage(uid)
					$('#triPanel').fadeIn()
					}).done(function () {
						log("second success");
					})
					.fail(function (error) {
						log(error.responseJSON.error.sqlMessage);
					})
					.always(function () {
						log("finished");
					});
					$('#triPanel').fadeOut()
			}, 2000);
		}
}

function loadItrustData(uid){

	$("#checkboxMaster").click(function () {
		$('input:checkbox').not(this).prop('checked', this.checked);
	});
	var fakeServerResponse = [];
		// var datalist = document.getElementById('names');

		// document.getElementById('name').addEventListener('keyup', function (event) {
			
		// 		if (this.value.length === 0) {
		// 			return;
		// 		}
		// 		if(event.keyCode === 13)
		// 		{
		// 			event.preventDefault();
		// 			console.log(this.value)
		// 		}
		// 		// Send Ajax request and loop of its result

		// 		datalist.textContent = '';
		// 		for (var i = 0; i < fakeServerResponse.length; i++) {
		// 			if (fakeServerResponse[i].indexOf(this.value.toUpperCase()) !== 0) {
		// 				continue;
		// 			}
		// 			var option = document.createElement('option');
		// 			option.value = fakeServerResponse[i];
		// 			datalist.appendChild(option);
		// 		}
		// 	});

	$.post("/getItrustData", { uid:uid }, function (response) {
			log(response);
			response.forEach((user,index)=>{
				var trust=`&nbsp;&nbsp;<input type="checkbox" name="checkbo`+index+`" id="checkbo`+index+`" value="`+user.user_id+`" />
				<label for="checkbo`+index+`">`+user.user_name+`</label>`
				$('#testAttach').append(trust);
				fakeServerResponse.push(user.user_name)
			})

	// 		let rest=[];
	// 		response.forEach((element,index) => {
	// 			element.forEach((elem)=>{
	// 		$.post("/getEmployeDate", { uid:elem.user_id }, function (res) {
	// 			log(res);
				

	// 			rest[index]=res
	// 	})

	// 		.done(function (res) {
	// 			;
	// 			log("second success");


	// 		})
	// 		.fail(function (error) {
	// 			log(error.responseJSON.error.sqlMessage);
	// 		})
	// 		.always(function () {
	// 			log("finished");
	// 		});
	// 	})
	// 	})		
	
	// $.post("/getCurrentUserDate", { uid:uid }, function (resu) {
	// 	log(rest);
	// 	car=0;
	// 	rest.forEach((element)=>{
	// 		element.forEach((eleme,indu)=>{
	// 			if((eleme.end_date>=resu[0].start_date)&&(resu[0].end_date<=eleme.start_date)){
	// 				$.post("/getProfileData", { uid: eleme.user_id }, function (respe) {
					
	// 					var trust=`&nbsp;&nbsp;<input type="checkbox" name="checkbo`+car+`" id="checkbo`+car+`" value="`+respe[0].user_id+`" />
	// 					<label for="checkbo`+car+`">`+respe[0].user_name+`</label>`
	// 					$('#testAttach').append(trust);
	// 					fakeServerResponse[car]=respe[0].user_name
	// 					car++	

	// 				})

						
	// 			}
	// 		})		
	// 	})
		

	// })
}).done(function () {
			log("second success");
		})
		.fail(function (error) {
			log(error.responseJSON.error.sqlMessage);
		})
		.always(function () {
			log("finished");
		});
		coinsTotal(uid)

}

function loadMyBadge(uid){
	
	$.post("/getBadgeDetails", {uide:uid}, function (response) {
	var urlforshare;
		log(response)
		response[1].forEach((elements)=>{
			if(elements.verification_status==1){
				response[0].forEach((elemo)=>{
					urlforshare="http://localhost:3000/lumino/badgeDetails.html?"+uid+"/"+elemo.badge_id+""
			let badge=` 
			<img src="`+elemo.badge_name+`" style="width:200px;height:200px;" onclick="redirbdgdatails('`+uid+`',`+elemo.badge_id+`)">
			
					
			<a class=" fa fa-share-alt qq" onclick="accm('`+urlforshare+`')"  data-toggle="modal" data-target="#myModal21" id="stroedval" ></a>
			
			</div>
		`
		//$('#atachUrl').attr("data-a2a-url","http://localhost:3000/lumino/badgeDetails.html?'"+uid+"'/'"+elemo.badge_id+"'")
		$('#badgepage').append(badge);
		
	})
	}else{
		response[0].forEach((elemo)=>{
			urlforshare="http://localhost:3000/lumino/badgeDetails.html?"+uid+"/"+elemo.badge_id+""
		let badge=` 

		<img src="`+elemo.badge_name+`" style="width:200px;height:200px;" onclick="redirbdgdatails('`+uid+`',`+elemo.badge_id+`)">
		<a class=" fa fa-share-alt qq" onclick="accm('`+urlforshare+`')"  data-toggle="modal" data-target="#myModal21" id="stroedval" ></a>
		
	`
	//class="a2a_kit a2a_kit_size_32 a2a_default_style"
	//class="a2a_button_linkedin"
	$('#badgepage').append(badge);
	
		})
	}
		})
	
		}).done(function () {
			log("second success");
		})
		.fail(function (error) {
			log(error.responseJSON.error.sqlMessage);
		})
		.always(function () {
			log("finished");
		});
	
		
	
}

function loadMbdetails(uidi,uuid){
	$.post("/getbadDetails", { bid: uuid }, function (response) {
		log(response[0]);
		// userID=response.guid	
		// window.location=response.redirectUrl+'?'+userID
		let badge=` 
		<img src="`+response[0].badge_name+`" style="width:300px;height:300px;" >
		<div class="a2a_kit a2a_kit_size_32 a2a_default_style" data-a2a-url="http://localhost:3000/lumino/badgeDetails.html?QYySAnTx5d/1" style="text-align:center;  ">
                                           
		<a class="a2a_button_linkedin"></a>
		<a class="a2a_button_facebook"></a>
		<a class="a2a_button_twitter"></a>
		<a class="a2a_button_google_plus"></a>
		<a class="a2a_button_whatsapp"></a>
		<a class="a2a_button_google_gmail"></a>
		<a class="a2a_button_copy_link"></a>
		<a class="a2a_button_telegram"></a>
		</div>

	`
	$('#badger').append(badge);

	})
		.done(function () {

			log("second success");
		})
		.fail(function (error) {
			log(error.responseJSON.error.sqlMessage);
		})
		.always(function () {
			log("finished");
		});
}

function trustMe(uid){



var selectedusers = new Array()

var inputs = document.getElementsByTagName("input"); 
var cbs = []; 

for (var i = 0; i < inputs.length; i++) {
  if (inputs[i].type == "checkbox") {
    cbs.push(inputs[i]);

  }
}
var nbCbs = cbs.length; //number of checkboxes

for(indu=0;indu<nbCbs;indu++){
		$('input[name="checkbo'+indu+'"]:checked').each(function () {
			selectedusers.push(this.value);
		});
}
	if(selectedusers.length===0)
	{
		return
	}
	let trustData =
	{
		by_user: window.location.href.split('?')[1],
		for_user: selectedusers
	}
	$.post("/trustMe", trustData, function (response) {
		log(response)
		location.reload()
	})
		.done(function () {
			
		})
		.fail(function (error) {
			log(error.responseJSON.error.sqlMessage);
		})
		.always(function () {
			log("finished");
		});
}



$(document).ready(function () {
	
	$("#myModal2").on('shown.bs.modal', function () {
		init_Sign_Canvas();
	});
	$("#myModal").on('shown.bs.modal', function () {
		$('#loginForm .input-error').hide();
		$('#loginForm .input-success').fadeOut(500);
	});

	
})
function coinsTotal(uid){

	$.post("/totalCoins", {uid:uid}, function (response) {
		log(response);
		
		$('#qweer').html(response[0].coinsTot)
			
		
	})
		.done(function () {
			
		})
		.fail(function (error) {
			log(error.responseJSON.error.sqlMessage);
		})
		.always(function () {	
			log("finished");
		});
}

function accm(ur){
	$('#atachUrl').attr("data-a2a-url",ur);
	$.getScript("https://static.addtoany.com/menu/page.js");
}
function dissp(cc) {

	var checker = $('input[name="employmentType' + cc + '"]:checked').val()
	if (checker == "Freelance" || checker == "Consultant") {
		$('#checkdeck' + cc + ',#checkdeck' + cc + ',#checkdeck' + cc + '').show();
	} else {
		$('#checkdeck' + cc + ',#checkdeck' + cc + ',#checkdeck' + cc + '').hide();

	}


}
<<<<<<< HEAD

=======
>>>>>>> 6465692687d23161e6e7135ecec932fec5d81752
