/**
 * SERVER
 */
const app = require('./src/app');


const port = 4000;
const server = app.listen(port, () => {
   console.log( `RUNNING ON PORT: ${port}` );
});

server.on('listening', () => {
   const io = require('socket.io')(server);
   const sockets = new Map();

   (function recursiveTimeout(count) {
      if(count > 50) return;

      setTimeout(() => {
         let index = 0;
         sockets.forEach((socket, token) => {
            if(count % sockets.size === index) {
               console.log( '-> emitting to:', token, { count, index } )
               socket.emit('getNotifications', { count, index });
            }
            index++;
         });
         recursiveTimeout(count+1);
     	}, 2000);
   })(3);

   // middleware
   io.use((socket, next) => {
      let token = socket.handshake.query.token;

      console.log( 'SOCKET REQUEST:', token );

      if (token) {
         if(!sockets.has(token)) {
            sockets.set(token, socket);
         }
         return next();
      }

      return next(new Error('authentication error'));
   });

   io.on('connection', function(socket) {
      const token = socket.handshake.query.token;

      console.log( '-> connected:', token );
      socket.emit('getNotifications', { count, index });

      socket.on('disconnect', function() {
         sockets.delete(token);
         console.log( '-> disconnected:', token );
      });
   });
});
server.on('error', err => {
	console.log( 'ERROR:', err );
});
server.on('close', () => {
  console.log( 'CLOSED' );
});
