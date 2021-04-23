require('dotenv').config();

const express   = require('express');
const morgan    = require('morgan');
const cors      = require('cors');
const helmet    = require('helmet');

const connectDB = require('./middlewares/connectDB');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

connectDB();

const routesTws = require('./routes/tw');
const routesUsers = require('./routes/user');
const routesProducts = require('./routes/product')

const server = express();

server.use(morgan('dev'));
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).send("<h1>It works !</h1>");
});

server.use('/', routesTws);
server.use('/', routesUsers);
server.use('/api', routesProducts);

server.use(notFound);
server.use(errorHandler);

const PORT = process.env.PORT || 3000;

server.listen(PORT, function() {
    console.log(`Server ecoute à l'adresse: http://${process.env.URL}:${PORT}`);
});