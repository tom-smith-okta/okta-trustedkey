// Okta + TrustedKey integration

////////////////////////////////////////////////////

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


//////////////////////////////////////////////////

// HOME PAGE
// app.get('/', function (req, res) {
// 	fs.readFile('html/index.html', (err, data) => {
// 		if (err) {
// 			console.log("error reading the index.html file")
// 		}

// 		var page = data.toString()

// 		page = page.replace(/{{baseUrl}}/g, "https://" + process.env.OKTA_TENANT)
// 		page = page.replace(/{{clientId}}/g, process.env.OKTA_CLIENT_ID)
// 		page = page.replace(/{{OKTA_MFA_CLIENT_ID}}/g, process.env.OKTA_MFA_CLIENT_ID)
// 		page = page.replace(/{{OKTA_REDIRECT_URI}}/g, process.env.OKTA_REDIRECT_URI)
// 		page = page.replace(/{{logo}}/g, process.env.OKTA_LOGO)

// 		res.send(page)
// 	})
// })