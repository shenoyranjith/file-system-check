let shell = require("shelljs");
let { sendMail } = require("./email");

let fixFileSystem = async function () {
  let result = shell.exec("fsck -y <PARTITON>");
  emailBody += result.stdout;
  await sendMail(emailSubject, emailBody);
  console.log("Email sent...");
  console.log("Rebooting...");
  shell.exec("reboot now");
};

let emailBody = "";
let emailSubject = "";

let result = shell.exec("awk '$4~/(^|,)ro($|,)/' /proc/mounts");

emailBody += result.stdout;
emailBody += "\n";

if (result.code == 0) {
  if (result.stdout.includes("<PARTITON>")) {
    emailSubject = "[File-System-Check] Fixed File System";
    console.log("WTF!? Going to have to fix this...");
    fixFileSystem();
  } else {
    emailSubject = "[File-System-Check] No Issues Found";
  }
} else {
  emailSubject = "[File-System-Check] Something went wrong";
}

sendMail(emailSubject, emailBody).then(() => console.log("Email sent..."));
