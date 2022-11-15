let request = require('request');

const get = (reqData) => {
    return new Promise((resolve, reject) => {
        request.get(reqData, (err, res, body) => { 
            if(err) {
                reject(err);
            }

            resolve({ res, body });
        });
    });
};

module.exports = {
    get
}