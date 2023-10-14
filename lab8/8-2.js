const expressFunction = require('express');
const expressApp = expressFunction();

const students = [
    { stdid: 'B5111299', name: 'Nuntawut Kaoungku' },
    { stdid: 'B5222299', name: 'Jaidee Deejai' },
];
expressApp.get('/api/resource/students/:stdid', function (req, res) {
    const stdid = req.params.stdid;
    if (stdid == 'B5111299') {
        res.status(200).send(students[0]);
    } else if (stdid == 'B5222299') {
        rres.status(200).send(students[1]);
    } else {
        res.status(404).send('Error 404 not found');
    }
});
expressApp.listen(3000, function () {
    console.log('Listening on port 3000');
});
