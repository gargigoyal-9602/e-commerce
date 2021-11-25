const { exec } = require("child_process");
var config = require('../src/config')
var host = require('../../../framework/src/config').baseURL.replace("http://", '').replace("https://", '');

var cmd = `cd ../../../../ && node endPointTest.js --host ${host} --path ${config.getContactUsAPiEndPoint} --method GET`

console.log(cmd);

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

var data = JSON.stringify({
    data: {
        attributes: {
            name: 'Firstname LastName',
            phone_number: '13105551212',
            email: `${Math.random().toString(36).slice(2)}@email.com`,
            description: 'Automated Test'

        }
    }
})

exec(`cd ../../../.. && node endPointTest.js --host ${host} --path ${config.saveContactUsApiEndPoint} --body '${data}'`, (error, stdout, stderr) => {
    if (error) {
        console.log(`EndPoint Failed`);
    }
    
    if (stderr) {
        console.log(`stderr: ${stderr}`);
    }
    console.log(`stdout: ${stdout}`);
});
