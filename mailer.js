var nodemailer = require('nodemailer');
function sendMail(recepients, subject, text, callback){

    var transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
               user: 'gamiacdev@gmail.com',
               pass: 'gamiac123'
           }
       });
    
       let mailOptions = {
        from: 'ravi@trusken.com', // sender address
        to: recepients, // list of receivers
        subject: subject, // Subject line
        html: text, // plain text body
      };
      
       transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            callback({status:512,value:"Error in send mail"});
        }
        callback({status:200,value:"Send mail success"});
    });
    return;
}
function getMailTemplate(uid,username){
    var mailTemplate=`<head></head>

    <body>
      <div style="background-color:#fff;margin:0 auto 0 auto;padding:30px 0 30px 0;color:#4f565d;font-size:13px;line-height:20px;font-family:'Helvetica Neue',Arial,sans-serif;text-align:left;">
        <center>
          <table style="width:550px;text-align:center">
            <tbody>
              <tr>
                <td style="padding:0 0 20px 0;border-bottom:1px solid #e9edee;">
                  <a href="http://www.trusken.com" style="display:block; margin:0 auto;" target="_blank">
                    <img src="http://beta.trusken.com/images/ts1.png" width="150" height="75" style="border: 0px;">
                  </a>
                </td>
              </tr>
              <tr>
                <td colspan="2" style="padding:30px 0;">
                  <p style="color:#1d2227;line-height:28px;font-size:22px;margin:12px 10px 20px 10px;font-weight:400;">Hi `+username+`, it's great to meet you.</p>
                  <p style="margin:0 10px 10px 10px;padding:0;">We'd like to make sure we got your email address right.</p>
                  <p>
                    <a style="display:inline-block;text-decoration:none;padding:15px 20px;background-color:#2baaed;border:1px solid #2baaed;border-radius:3px;color:#FFF;font-weight:bold;" href="http://beta.trusken.com/verification?uid=`+uid+`" target="_blank">Yes, it's me – let's get started</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td colspan="2" style="padding:30px 0 0 0;border-top:1px solid #e9edee;color:#9b9fa5">
                  If you have any questions you can contact us at <a style="color:#666d74;text-decoration:none;" href="mailto:support@trusken.com" target="_blank">support@trusken.com</a>
                </td>
              </tr>
            </tbody>
          </table>
        </center>
      </div>
    </body>`

    return mailTemplate
}


module.exports = {sendMail,getMailTemplate}