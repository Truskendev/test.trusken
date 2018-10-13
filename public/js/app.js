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

		$('#loginForm .input-error').delay(500).fadeIn(1000);
		$('#loginForm .input-success').fadeOut(500);
	}
}
function loginHom() {
	let loginDat =
	{
		loginName: $('#unameq').val(),
		loginPass: $('#passwq').val()
	}
	if (isValidEmail(loginDat['loginName']) && (loginDat['loginPass'].length > 1)) {

		$.post("/loginUser", loginDat, function (response) {
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
		$('#myModal2').hide();
		$('#regForm .input-error').delay(500).fadeIn(1000);
		$('#regForm .input-success').fadeOut(500);
	}
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

	let stMonth = new Array();
	let stYear = new Array();
	let enMonth = new Array();
	let enYear = new Array();

	for (c = 0; c < expCount; c++) {

		$('input[name="employmentType' + c + '"]:checked').each(function () {
			selectedworkexp = this.value;
		});
		$(".stMonth" + c).each(function () {
			stMonth = this.value;
		});
		$(".stYear" + c).each(function () {
			stYear = this.value;
		});
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
			workstartYear: stMonth + "/" + stYear,
			workEndYear: enMonth + "/" + enYear,
			employeeNumber: $('#employeeNumber' + c).val(),
			managerNumber: $('#managerNumber' + c).val(),
			managerEmail: $('#managerEmail' + c).val(),
			empdesc: $('#empdesc' + c).val(),

			selectedworkexp: selectedworkexp,
			uid: window.location.href.split('?')[1],

		}
		workData[c] = workData1




		if ((workData[c]['companyName'].length > 1) && (workData[c]['workstartYear'].length > 1) && (workData[c]['workEndYear'].length > 1) && (workData[c]['workTitle'].length > 1)) {
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

			var we = `<li>
		<div class="timeline-badge"><i class="glyphicon glyphicon-pushpin"></i></div>
		<div class="timeline-panel">
			<div class="timeline-heading">
				<h4 class="timeline-title" id="companyName">`+ element.org_id + `</h4>
			</div>
			<div class="timeline-body">
					<p id="jobTitle">`+ element.job_title_id + `</p>	
				<p id="startDate">`+ element.start_date + `</p>
				<p id="endDate">`+ element.end_date + `</p>
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
			var are = `<li>
		<div class="timeline-badge"><i class="glyphicon glyphicon-pushpin"></i></div>
		<div class="timeline-panel">
			<div class="timeline-heading">
				<h4 class="timeline-title" id="educationalInstitute">`+ element.org_id + `</h4>
			</div>
			<div class="timeline-body">
				<p id="degree">`+ element.degree + `</p>
				<p id="startDdate">`+ element.start_year + `</p>
				<p id="endDdate">`+ element.end_year + `</p>
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

function redir(uid) {
	window.location = "employment.html" + '?' + uid
}
function redirEducation(uid) {
	window.location = "education.html" + '?' + uid
}
function redirectHome() {


	var uid = window.location.href.split('?')[1]
	window.location = "home.html?" + uid
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
$(document).ready(function () {
	$("#myModal2").on('shown.bs.modal', function () {
		init_Sign_Canvas();
	});
	$("#myModal").on('shown.bs.modal', function () {
		$('#loginForm .input-error').hide();
		$('#loginForm .input-success').fadeOut(500);
	});
})


function dissp(cc) {

	var checker = $('input[name="employmentType' + cc + '"]:checked').val()
	if (checker == "Freelance" || checker == "Consultant") {
		$('#checkdeck' + cc + ',#checkdeck' + cc + ',#checkdeck' + cc + '').show();
	} else {
		$('#checkdeck' + cc + ',#checkdeck' + cc + ',#checkdeck' + cc + '').hide();

	}


}