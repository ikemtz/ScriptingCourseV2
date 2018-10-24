const express = require('express');
express()
  .get('/imartinez51/folders.php*', (req, res) => {
    res.type('json');
    res.write(JSON.stringify(['filename1', 'fileName2']));
    //res.write(JSON.stringify(false));
    res.end();
  })
  .get('/imartinez51/files.php*', (req, res) => {
    res.type('txt');
    //res.write(JSON.stringify(['filename1', 'fileName2']));
    res.write('gibberish');
    res.end();
  })
  .use('/imartinez51', express.static('src'))

  .listen(80);
