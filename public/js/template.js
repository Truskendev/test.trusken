function getWorkTemplate(index, ID) {
    return template = `<div class="panel-body" >
        <div class="col-md-6">
            <form role="form">
            <div class="form-group">
                <label>Title*</label>
                <input class="form-control" id="workTitle`+ index + `" type="text" placeholder="Job Title">
            </div>
            <div class="form-group">
                <label>Company*</label>
                <input class="form-control" id="companyName`+ index + `"  type="email" placeholder="Company">
            </div>
            <div class="form-group" >
                <label>Tenure*</label></br>
                <label>Start Date</label></br>
                <!-- <input class="form-control" id="workstartYear"   type="text" placeholder="Start Year"><br> -->
             
                <input type="text" class="form-control stDate`+ index + `" style="width:15%" placeholder="DD">
                
                <input type="text" class="form-control stMonth`+ index + `" style="width:15%;  float: left; margin-top: -45px; margin-left: 90px;" placeholder="MM">
                
                <input type="text" class="form-control stYear`+ index + `" style="width:15%; float: left; margin-top: -45px; margin-left: 10px;" placeholder="YYYY">
                <br>
                <br>
                 <label>End Date</label></br>
            
                
                    <input type="text" class="form-control enDate`+ index + `" style="width:15%" placeholder="DD" >
                
                <input type="text" class="form-control enMonth`+ index + `" style="width:15%;  float: left; margin-top: -45px; margin-left: 90px;" placeholder="MM">
                
                <input type="text" class="form-control enYear`+ index + `" style="width:15%; float: left;margin-top: -45px; margin-left: 10px;" placeholder="YYYY">
            

            </div>
                <div class="form-group">
                <label>Employee Number </label>
                <input class="form-control" id="employeeNumber`+ index + `" type="text" placeholder="Employee Number">
            </div>
            
                <div class="form-group" id="checkdeck`+ index + `" style="display:none">
                <label>Manager's Name</label>
                <input class="form-control"  id="managerNumber`+ index + `" type="text" placeholder="Manager's Name">
            </div>
            
                <div class="form-group" id="checkdeck`+ index + `" style="display:none">
                <label>Manager's Email* </label>
                <input class="form-control" id="managerEmail`+ index + `"  type="text" placeholder="Manager's Email">
            </div>
            
                                                
            <div class="form-group" id="checkdeck`+ index + `" style="display:none">
                <label>Description of Work*</label>
                <textarea class="form-control"  id="empdesc`+ index + `" rows="3"></textarea>
            </div>
            
            
        
            </div>
            <div class="col-md-5">
                <div class="form-group">
                    <label>Employment Type</label>
                    <div class="radio">
                        <label>
                            <input type="radio" name="employmentType`+ index + `" onclick="dissp(` + index + `)" id="fullTJob" checked value="Full Time Job">Full Time Job 
                        </label>
                    </div>
                    <div class="radio">
                        <label>
                            <input type="radio" name="employmentType`+ index + `"onclick="dissp(` + index + `)" id="partTime" value="Part Time">Part Time

                        </label>
                    </div>
                    <div class="radio">
                        <label>
                            <input type="radio" name="employmentType`+ index + `"  id="Consultant" onclick="dissp(` + index + `)" value="Consultant">Consultant
                        </label>
                    </div>
                    <div class="radio">
                        <label>
                            <input type="radio" name="employmentType`+ index + `" onclick="dissp(` + index + `)" id="Internship" value="Internship">Internship
                        </label>
                    </div>
                    <div class="radio">
                        <label>
                            <input type="radio" name="employmentType`+ index + `" id="Freelance" onclick="dissp(` + index + `)" value="Freelance">Freelance

                        </label>
                    </div>
                    <div class="radio">
                        <label>
                            <input type="radio" name="employmentType`+ index + `" onclick="dissp(` + index + `)" id="Temporary" value="Temporary">Temporary


                        </label>
                    </div>
                    
                </div>
                
                
            </div>
            <div class='col-md-1' style="visibility:hidden;">
            <em class="fa fa-trash" style="font-size:20px;"></em>
            <span id="expID`+ index + `">` + ID + `</span>
            </div>
        </form>
        </div>
        <hr>
        `


}
function getEducationTemplate(cT,ID) {

    return template = `
        <div class="panel-body">
            <div class="col-md-6">
                <form role="form">
                <div class="form-group">
                    <label>University / School / Institution *</label>
                    <input class="form-control" id="eduInstut`+ cT + `"  type="text" placeholder=" ">
                </div>
                <div class="form-group">
                    <label>Degree / Certificate *</label>
                    <input class="form-control" id="degreeCertificate`+ cT + `" type="text" placeholder="">
                </div>
                <div class="form-group">
        <label>Tenure*</label></br>
        <label>Start Year</label>
        <input type="text" class="form-control edstYear`+ cT + `" style="width:25%;" placeholder="YYYY">
        
       
        <label>End Year</label>
        <input type="text" class="form-control edEnYear`+ cT + `" style="width:25%;"  placeholder="YYYY">
        
    </div>
                    <div class="form-group">
                    <label>Specialization  </label>
                    <input class="form-control" id="speciality`+ cT + `" type="text" placeholder="">
                </div>
                
                    <div class="form-group">
                    <label>Membership Number</label>
                    <input class="form-control" id="memNumber`+ cT + `" type="text" placeholder="">
                </div>
                
                
            
               
                </div>
            
                    
                </div>
            </form>
        </div>
    </div>
<span id="eduID`+ cT + `" style="visibility:hidden;">` + ID + `</span>
<hr>`

}
