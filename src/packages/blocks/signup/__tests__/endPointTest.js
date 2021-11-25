const { exec } = require("child_process");
var config = require('../src/config')
var host = require('../../../framework/src/config').baseURL.replace("http://", '').replace("https://", '');

//GET

var cmd = `cd ../../../../ && node endPointTest.js --host ${host} --path ${config.helpCenterApiEndPoint} --method GET`

exec(cmd, (error, stdout, stderr) => {
    if (error) {
        console.error(`EndPoint Failed::${error}`);
        process.exit(-1);
    }
    
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

// POST

const guestData = JSON.stringify({
    data: {
        type: "guest_account",
        attributes: {
            uuid: "ABC1234"
        }
    }
});

exec(`cd ../../../.. && node endPointTest.js --host ${host} --path ${config.guestLoginAPiEndPoint} --body '${guestData}'`, (error, stdout, stderr) => {
    if (error) {
        console.error(`EndPoint Failed::${error}`);
        process.exit(-1);
    }
    
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

let signUpData = JSON.stringify({
    data: {
        type: "email_account",
        process: "register",
        attributes: {
            email: `${Math.random().toString(36).slice(2)}@email.com`,
            full_name: 'Full Name'
        }
    }
});

exec(`cd ../../../.. && node endPointTest.js --host ${host} --path ${config.sendOtpApiEndPoint} --body '${signUpData}'`, (error, stdout, stderr) => {
    if (error) {
        console.error(`EndPoint Failed::${error}`);
        process.exit(-1);
    }
    
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

// const socialData = JSON.stringify({
//     data: {
//         type: "social_account",
//         attributes: {}
//     }
// });

// exec(`cd ../../../.. && node endPointTest.js --host ${host} --path ${config.socialLoginAPiEndPoint} --body '${socialData}'`, (error, stdout, stderr) => {
//     if (error) {
//         console.error(`EndPoint Failed::${error}`);
//         process.exit(-1);
//     }
    
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });
