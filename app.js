// Okta + TrustedKey integration

////////////////////////////////////////////////////

require('dotenv').config()

const bodyParser = require("body-parser")

const express = require('express')

const fs = require('fs')

const request = require("request")

///////////////////////////////////////////////////

// SET UP WEB SERVER
const app = express()

var port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: false }))

app.listen(port, function () {
	console.log('App listening on port ' + port + '...');
})

//////////////////////////////////////////////////

// HOME PAGE
app.get('/', function (req, res) {
	fs.readFile('html/index.html', 'utf8', (err, page) => {
		if (err) {
			console.log("error reading the index.html file")
		}

		page = page.replace(/{{OKTA_CLIENT_ID}}/g, process.env.OKTA_CLIENT_ID)
		page = page.replace(/{{OKTA_IDP_AUTHN}}/g, process.env.OKTA_IDP_AUTHN)
		page = page.replace(/{{OKTA_IDP_REG}}/g, process.env.OKTA_IDP_REG)
		page = page.replace(/{{OKTA_TENANT}}/g, process.env.OKTA_TENANT)
		page = page.replace(/{{REDIRECT_URI}}/g, process.env.REDIRECT_URI)

		res.send(page)
	})
})

app.post('/callback', function (req, res) {
	console.dir(req.body)

	var id_token = req.body.id_token

	console.log("the id token is: " + id_token)

	var options = {
		method: 'POST',
		url: process.env.OKTA_TENANT + '/oauth2/v1/introspect',
		qs: {
			token: id_token,
			token_type_hint: 'id_token',
			client_id: process.env.OKTA_CLIENT_ID,
			client_secret: process.env.OKTA_CLIENT_SECRET
		},
		headers: {
			'cache-control': 'no-cache',
			'Content-Type': 'application/x-www-form-urlencoded',
			Accept: 'application/json'
		}
	}

	request(options, function (error, response, body) {
		if (error) throw new Error(error);

		console.log(body)

		var obj = JSON.parse(body)

		var user_id = obj.sub

		console.log("the user id is: " + user_id)

		var options = {
			method: 'GET',
			url: process.env.OKTA_TENANT + '/api/v1/users/' + user_id,
			headers: {
				'cache-control': 'no-cache',
				Authorization: 'SSWS ' + process.env.OKTA_API_TOKEN,
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		}

		request(options, function (error, response, body) {
			if (error) throw new Error(error)

			console.log(body)

			var obj = JSON.parse(body)

			console.log("the user's email is: " + obj.profile.email)

			fs.readFile('html/index.html', 'utf8', (err, page) => {
				if (err) {
					console.log("error reading the index.html file")
				}

				page = page.replace("{{EMAIL}}", obj.profile.email)
				page = page.replace(/{{OKTA_CLIENT_ID}}/g, process.env.OKTA_CLIENT_ID)
				page = page.replace(/{{OKTA_IDP_AUTHN}}/g, process.env.OKTA_IDP_AUTHN)
				page = page.replace(/{{OKTA_IDP_REG}}/g, process.env.OKTA_IDP_REG)
				page = page.replace(/{{OKTA_TENANT}}/g, process.env.OKTA_TENANT)
				page = page.replace(/{{REDIRECT_URI}}/g, process.env.REDIRECT_URI)

				res.send(page)
			})
		})
	})
})
