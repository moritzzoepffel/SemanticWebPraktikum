const express = require('express');
const {spawn} = require('child_process');
const app = express();
const port = 3000;

app.get('/script1', (req, res) => {
    let data1;
    const pythonOne = spawn('python3', ['../python/main.py']);
    pythonOne.stdout.on('data', function (data) {
        //data return buffer
        data1 = data.toString();
    });
    pythonOne.on('close', (code) => {
        console.log('code', code);
        res.send(data1);
    })
});

app.listen(port, () => console.log('Server running on: http://localhost:' + port + "/script1"))