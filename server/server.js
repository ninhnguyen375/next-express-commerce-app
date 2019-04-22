require('dotenv/config');
const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const https = require('https');

const PORT = process.env.PORT || 3002;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const MONGO_URI = dev
    ? 'mongodb://127.0.0.1:27017/webbanhangdb'
    : process.env.MONGO_URI;

  // config middleware
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  // connect to mongodb
  mongoose.connect(MONGO_URI, { useNewUrlParser: true }).catch(err => {
    if (err) console.log(err);
    else console.log('Connected to MongoDB');
  });

  // API route
  const apiProductRoute = require('./api/routes/product.api.route');
  const apiUserRoute = require('./api/routes/user.api.route');
  const apiBillRoute = require('./api/routes/bill.api.route');
  const apiProducerRoute = require('./api/routes/producer.api.route');
  const apiCartRoute = require('./api/routes/cart.api.route');
  const apiDashboard = require('./api/routes/dashboard.route');

  server.use('/api/products', apiProductRoute);
  server.use('/api/users', apiUserRoute);
  server.use('/api/bills', apiBillRoute);
  server.use('/api/producers', apiProducerRoute);
  server.use('/api/carts', apiCartRoute);
  server.use('/api/dashboard', apiDashboard);

  // handle next app
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  // const options = {
  //   key: fs.readFileSync('/home/ninh/ninh.key'),
  //   cert: fs.readFileSync('/home/ninh/ninh.crt'),
  //   passphrase: 'ninh',
  //   requestCert: false,
  //   rejectUnauthorized: false
  // };

  // const localServer = https.createServer(options, server);

  // localServer.listen(PORT, function() {
  //   console.log('Start at https://ninh:' + PORT);
  // });

  // server listen
  server.listen(PORT, () => {
    console.log('Ready on http://localhost:' + PORT);
  });
});
