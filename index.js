import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import webpack from 'webpack';
import mongoose from 'mongoose';
import webpackDevMiddleware from  'webpack-dev-middleware';
import webpackHotMiddleware  from 'webpack-hot-middleware';
import config from './webpack.config';
import router from './router';
const app = new express();
// Utilites
const compiler = webpack(config);

//DB Setup
mongoose.connect('mongodb://localhost:auth/auth');



// Server Setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server is listening on the following port', port);

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type:'*/*' }));
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));

// Call Router with our Application
router(app);
