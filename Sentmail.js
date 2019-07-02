var nodemailer = require('nodemailer');
var smtpTransport=require('nodemailer-smtp-transport')

var sendtomail=async(mail)=>{

    var transporter = nodemailer.createTransport(
        smtpTransport({
            host:'smtp.gmail.com',
            port:'587',
            auth:{
                user:process.env.EMAIL_NAME,
                pass:process.env.EMAIL_PASS
            }
        })
    )
    var mailOptions = {
        from: 'prasadbonthu344@gmail.com',
        to: mail,
        subject: 'Sending Email using Node.js',
        html: `<a href="http://192.168.1.220:8090/api/admin/login">Click Me</a>`,
        attachments: {
                //filename:'Git_Setting.txt',
                path:'./public/Git_Setting.txt'
            }
  // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
    };

    transporter.verify((err, success) => {
        if (err) console.error(err);
        console.log('Your config is correct');
    });
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports={sendtomail}