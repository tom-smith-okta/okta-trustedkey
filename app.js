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

// HOME PAGE
app.get('/', function (req, res) {
	fs.readFile('html/index.html', (err, data) => {
		if (err) {
			console.log("error reading the index.html file")
		}

		var page = data.toString()

		page = page.replace(/{{REDIRECT_URI}}/g, process.env.REDIRECT_URI)

		res.send(page)
	})
})
