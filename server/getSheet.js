var google = require('googleapis');

module.exports = (auth, range) => {
    var sheets = google.sheets('v4');
    return new Promise((resolve, reject) => {
        sheets.spreadsheets.values.get({
            auth: auth,
            spreadsheetId: '1s3siFNVa9gqHc7RVeMNQ5GHCWcYKoabt4uCgBmXkxOs',
            range: range,
        }, function(err, response) {
            if (err) {
                console.log('The API returned an error: ' + err);
                return;
            }
            let rows = response.values;
            if (rows.length == 0) {
                reject('No data found.');
            } else {
                resolve(rows);
            }
        })
    });
};
