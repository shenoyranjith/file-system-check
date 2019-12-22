let shell = require("shelljs");
let { sendMail } = require("./email");

let emailBody = "";
let emailSubject = "";

let result = shell.exec("awk '$4~/(^|,)ro($|,)/' /proc/mounts");

emailBody += result.stdout;
emailBody += "\n";

if (result.code == 0) {
  if (result.stdout.includes("sdb1")) {
    emailSubject = "[File-System-Check] Fixed File System";
    console.log("WTF!? Going to have to fix this.");
    console.log("Sending email...");
  } else {
    emailSubject = "[File-System-Check] No Issues Found";
  }
} else {
  emailSubject = "[File-System-Check] Something went wrong";
}

sendMail(emailSubject, emailBody)
  .then(result => console.log(result))
  .catch(error => console.log(error));
