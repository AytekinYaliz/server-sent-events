const express = require('express');
const cors = require('cors');


const app = express();

app.use(cors({
	// optionsSuccessStatus: 200,
	// origin: 'http://localhost:2000'
	origin: function(origin, callback) {
      console.log( 'ORIGIN:', origin );

      return callback(null, true);
  	}
}));

app.get('/', (request, response) => {
   return setTimeout(() => {
   	return response.send('HOMEE');
   }, 2000);
});


module.exports = app;
