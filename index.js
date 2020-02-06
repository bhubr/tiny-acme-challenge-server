const express = require('express');
chokidar = require('chokidar');

// One-liner for current directory
chokidar.watch('public').on('all', (event, path) => {
  console.log(event, path);
});


const app = express();

const restrict = (req, res, next) => {
  console.log(req.ip, req.path);
  if (!req.path.includes('acme-challenge')) return res.sendStatus(403);
  next();
}

app.use(restrict, express.static('public'));
app.get('*', (req, res) => {
  res.sendStatus(200);
});

app.listen(process.env.PORT || 5555);
