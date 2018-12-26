// require sse
// var sse = require('server-sent-events');
var bodyParser = require('body-parser')

const SseConnection = require('./src/libs/SseConnection');
const sseConnectionCacheInstance = require('./src/libs/SseConnectionCache');
const app = require('./src/app');


// Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
   const token = req.query.token;

   if(token) {
	   sseConnectionCacheInstance.add(token, new SseConnection(res));
   }

   next();
});



app.get('/events', (req, res, next) => {
   const token = req.query.token;
   const connections = sseConnectionCacheInstance.get(token);

   connections.forEach(connection => {
      if(connection.res === res) {
         connection.setup();
         connection.send({ count: 12, arr: [{name:'a', age:12}, {name:'b', age:55}] });
      }
   })

   res.on('close', function () {
      sseConnectionCacheInstance.remove(token, res);
   });
});


setInterval(() => {
   sseConnectionCacheInstance.keys().forEach( token => {
      const time = Date.now();

      const connections = sseConnectionCacheInstance.get(token);
      connections.forEach(connection => connection.send({ token, time }));
   });
}, 3000);

const port = 4000;
const server = app.listen(port, () => {
   console.log( `RUNNING ON PORT: ${port}` );
});
