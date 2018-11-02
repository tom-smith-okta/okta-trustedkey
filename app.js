// Okta + TrustedKey integration

////////////////////////////////////////////////////

require('dotenv').config()

const express = require('express')

///////////////////////////////////////////////////

// SET UP WEB SERVER
const app = express()

var port = process.env.PORT || 4512

app.use(express.static('public'))

app.listen(port, function () {
	console.log('App listening on port ' + port + '...');
})

//////////////////////////////////////////////////
