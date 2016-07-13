const feathers = require('feathers');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const service = require('feathers-mongoose');

const Game = require('./models/game');

mongoose.Promise = global.Promise;

const mongo_url = process.env.MONGODB_URI || 'mongodb://localhost:27017/rockpaperscissors';
mongoose.connect(mongo_url);

const app = feathers()
  .configure(socketio())
  .configure(rest())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}));

app.use('/games', service({
  Model: Game,
  paginate: {
    default: 30,
    max: 50
  }
}));

var port = process.env.PORT || 3030;
var server = app.listen(port);
server.on('listening', function() {
  console.log('Feathers Message MongoDB service running on ' + port);
});
