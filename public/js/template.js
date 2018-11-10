function getWorkTemplate(index, ID) {
    return template = `<div class="panel-body" >
        <div class="col-md-6">
            <form role="form">
            <div class="form-group">
                <label>Title*</label>
                <input class="form-control infields" id="workTitle`+ index + `" type="text" placeholder="Job Title">
            </div>
            <div class="form-group">
                <label>Company*</label>
                <input class="form-control infields" id="companyName`+ index + `"  type="email" placeholder="Company">
            </div>
            <div class="form-group" >
                <label>Tenure*</label></br>
                <label>Start Date</label></br>
                <!-- <input class="form-control infields" id="workstartYear"   type="text" placeholder="Start Year"><br> -->
                <div class="demo">
                <select id="month" name="month" class="stMonth`+ index + `">
                    <option value="01">January</option> 
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
                <select id="day" name="day" class="stDate`+ index + `">
                    <option value="01">1</option>
                    <option value="02">2</option>
                    <option value="03">3</option>
                    <option value="04">4</option>
                    <option value="05">5</option>
                    <option value="06">6</option>
                    <option value="07">7</option>
                    <option value="08">8</option>
                    <option value="09">9</option>
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
                <select id="year" name="year" class="stYear`+ index + `">
                    <option value="2011">2011</option>
                    <option value="2012">2012</option>
                    <option value="2013">2013</option>
                    <option value="2014">2014</option>
                    <option value="2015">2015</option>
                </select>
                <input type="hidden" id="datepicker" />
                
            </div>
              
                <br>
                <br>
                 <label>End Date</label></br>
            
                 <div class="demo">
                 
                 <select id="day" name="day" calss=" enDate`+ index + `">
                     <option value="01">1</option>
                     <option value="02">2</option>
                     <option value="03">3</option>
                     <option value="04">4</option>
                     <option value="05">5</option>
                     <option value="06">6</option>
                     <option value="07">7</option>
                     <option value="08">8</option>
                     <option value="09">9</option>
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
                 <select id="month" name="month" class=" enMonth`+ index + `">
                     <option value="01">January</option> 
                     <option value="02">February</option>
                     <option value="03">March</option>
                     <option value="04">April</option>
                     <option value="05">May</option>
                     <option value="06">June</option>
                     <option value="07">July</option>
                     <option value="08">August</option>
                     <option value="09">September</option>
                     <option value="10">October</option>
                     <option value="11">November</option>
                     <option value="12">December</option>
                 </select>
                 <select id="year" name="year" class="enYear`+ index + `">
                     <option value="2011">2011</option>
                     <option value="2012">2012</option>
                     <option value="2013">2013</option>
                     <option value="2014">2014</option>
                     <option value="2015">2015</option>
                 </select>
                
                 
             </div>


                

            </div>
                <div class="form-group">
                <label>Employee Number </label>
                <input class="form-control infields" id="employeeNumber`+ index + `" type="text" placeholder="Employee Number">
            </div>
            
                <div class="form-group" id="checkdeck`+ index + `" style="display:none">
                <label>Manager's Name</label>
                <input class="form-control infields"  id="managerNumber`+ index + `" type="text" placeholder="Manager's Name">
            </div>
            
                <div class="form-group" id="checkdeck`+ index + `" style="display:none">
                <label>Manager's Email* </label>
                <input class="form-control infields" id="managerEmail`+ index + `"  type="text" placeholder="Manager's Email">
            </div>
            
                                                
            <div class="form-group" id="checkdeck`+ index + `" style="display:none">
                <label>Description of Work*</label>
                <textarea class="form-control infields"  id="empdesc`+ index + `" rows="3"></textarea>
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
                    <input class="form-control infields" id="eduInstut`+ cT + `"  type="text" placeholder=" ">
                </div>
                <div class="form-group">
                    <label>Degree / Certificate *</label>
                    <input class="form-control infields" id="degreeCertificate`+ cT + `" type="text" placeholder="">
                </div>
                <div class="form-group">
        <label>Tenure*</label></br>
        <label>Start Year</label>
        <input type="text" class=" infields form-control edstYear`+ cT + `" style="width:25%;" placeholder="YYYY">
        
       
        <label>End Year</label>
        <input type="text" class=" infields form-control edEnYear`+ cT + `" style="width:25%;"  placeholder="YYYY">
        
    </div>
                    <div class="form-group">
                    <label>Specialization  </label>
                    <input class=" infields form-control" id="speciality`+ cT + `" type="text" placeholder="">
                </div>
                
                    <div class="form-group">
                    <label>Membership Number</label>
                    <input class="form-control infields" id="memNumber`+ cT + `" type="text" placeholder="">
                </div>
                
                
            
               
                </div>
            
                    
                </div>
            </form>
        </div>
    </div>
<span id="eduID`+ cT + `" style="visibility:hidden;">` + ID + `</span>
<hr>`

 }
// <input type="text" class=" infields form-control stDate`+ index + `" style="width:9%" placeholder="DD">
                
// <input type="text" class=" infields form-control stMonth`+ index + `" style="width:9%;   margin-top: -33px; margin-left: 50px;" placeholder="MM">

// <input type="text" class=" infields form-control stYear`+ index + `" style="width:13%;  margin-top: -34px; margin-left: 100px;" placeholder="YYYY">

/* <input type="text" class="infields form-control enDate`+ index + `" style="width:9%" placeholder="DD" >
                
<input type="text" class="infields form-control enMonth`+ index + `" style="width:10%;  float: left; margin-top: -33px; margin-left: 50px;" placeholder="MM">

<input type="text" class="infields form-control enYear`+ index + `" style="width:13%; float: left;margin-top: -32px; margin-left: 5px;" placeholder="YYYY"> */
