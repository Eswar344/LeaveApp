var nodemailer = require('nodemailer');
var smtpTransport=require('nodemailer-smtp-transport')

var sendtomail=async(mail)=>{

    var transporter = nodemailer.createTransport(
        smtpTransport({
            host:'smtp.gmail.com',
            port:'587',
            auth:{
                user:"prasadbonthu344@gmail.com",
                pass:"9849801820"
            }
        })
    )
    var mailOptions = {
        from: 'prasadbonthu344@gmail.com',
        to: "eswar@webileapps.com",
        subject: 'Sending Email using Node.js',
        text: `Successfully updated password.`
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