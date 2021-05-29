const shell = require('shelljs');
const fs = require('fs');

try {
    const skaasJson = JSON.parse(fs.readFileSync('skaas.json'));
    shell.exec(skaasJson['test_command']);

    testResults = JSON.parse(fs.readFileSync('karma-result.json'));
    testResults = testResults['browsers'][0]['results'];

    const results = [];
    for (let i = 0; i < testResults.length; i++) {
        results.push({
            statement_id: i+1,
            is_passed: !!testResults[i].success,
            title: testResults[i].fullName,
            reason: testResults[i].log.length > 0 ? testResults[i].log[0] : ''
        });
    }
    fs.writeFileSync(skaasJson['test_output'], JSON.stringify(results));
  } catch (err) {
    console.error(err);
  }
