{/* <div class="form-group">
                <label>State*</label>
                <input class="form-control infields" id="state`+ cT + `"  type="text" placeholder="State">
                </div>
                <div class="form-group">
                <label>Country*</label>
                <input class="form-control infields" id="country`+ cT + `"  type="text" placeholder="Country">
                </div> */}




{/* <input class="form-control infields" id="state`+ index + `"  type="text" placeholder="State"></input> */ }
{/* <input class="form-control infields" id="country`+ index + `"  type="text" placeholder="Country"> */ }



function getWorkTemplate(index, ID) {
    var cn = [];
    // $.post("/companyName",  function (response) {
    //     //log(response);
    //     if (response.status == 200) { console.log() }
    //     else {
    //         response.forEach(element => {
    //             cn.push(element);

    //         });
    //     }
    // })

    return template = `<div class="panel-body" >
        <div class="col-md-6">
            <form role="form">
            <div class="form-group">
                <label>Title*</label>
                    <input class="form-control infields" id="workTitle`+ index + `" list="jTitles" type="text" placeholder="Job Title">
                    <datalist id="jTitles" name="jTitle">
                    </datalist>
            </div>        
            <div class="form-group">
                <label>Company*</label>
                    <input class="form-control infields" id="companyName`+ index + `"  type="text" list="companyName" placeholder="Company">
                    <datalist id="companyName" name="companyName">
                    </datalist>
            </div>
           
            <div class="form-group">
                <label>Location*</label>
                    <input class="form-control infields" id="city`+ index + `"  type="text" list="allCities" placeholder="Location" title="Enter a City">
                    <datalist id="allCities" name="Cities">
                    </datalist>
            </div>
        
            <div class="form-group" >
                <label>Start Date</label></br>
                <!-- <input class="form-control infields" id="workstartYear"   type="text" placeholder="Start Year"><br> -->
                <div class="demo">
                <select id="day" name="day" class="stDate`+ index + `">
                    <option value="null">DD</option>
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
                <select id="month" name="month" class="stMonth`+ index + `">
                    <option value="null">MON</option>
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

                <select id="year" name="year" class="stYear`+ index + `">
                    <option value="null">YYYY</option>
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
                <input type="hidden" id="datepicker" />
                
            </div>
                <br>
                 <label>End Date</label></br>
            
                 <div class="demo">
                 
                 <select id="day" name="day" class=" enDate`+ index + `">
                     <option value="null">DD</option>
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
                     <option value="null">MON</option> 
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
                    <option value="null">YYYY</option>
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
            
            <div class="form-group">
            <label>Alias Name</label>
              <input class="form-control infields" id="alias`+ index + `"  type="text" placeholder="Enter Name as per your company records">
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
function getEducationTemplate(cT, ID) {

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
               
                </div>
           
                <div class="form-group">
                    <label>Location*</label>
                        <input class="form-control infields" id="city`+ cT + `"  list="allCities" type="text" placeholder="City">
                        <datalist id="allCities" name="Cities">
                        </datalist>
                </div>
                <div class="form-group">

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
