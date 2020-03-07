import * as config from 'config';
import { Request, Response } from 'express'
import * as dbUtils from './utils/db-utils';
import * as server from './server'
import * as net from 'net'
var fetch = require('node-fetch');
const Bluebird = require('bluebird');
fetch = Bluebird.promisifyAll(fetch);
var http = require('http');
const { WebClient } = require('@slack/web-api');
const token = ""

const web = new WebClient(token);
const SLACK_SIGNING_SECRET = "ebb75768daafbe658fe008af9575cfed"
const { createEventAdapter } = require('@slack/events-api');
const slackEvents = createEventAdapter(SLACK_SIGNING_SECRET);
const { createMessageAdapter } = require('@slack/interactive-messages');
const slackInteractions = createMessageAdapter(SLACK_SIGNING_SECRET);


function runner(genFun) {
	const itr = genFun();
	function run(arg) {
		const result = itr.next(arg);
		if (result.done) {
			return result.value;
		} else {
			return Promise.resolve(result.value).then(run);
		}
	}
	return run(undefined);
}

export function sendMessage(req,res){
	var conversationId = req.body.conversationId;
	var message = req.body.message;
	(async () => {

		try {
		
		 // var imList = await web.im.list();
        //console.log(imList)
  
		// Use the `chat.postMessage` method to send a message from this app
			await web.chat.postMessage({
			  channel: conversationId,
			  text: message,
			  "username":"apexLenegds"

			});
		} catch (error) {
			console.log(error);
		}

		console.log('Message posted!');
	})();
	res.send();
}

function performPostRequest(data, callback) {

	let post_data = JSON.stringify(data);

	var options = {
		host: "",
		port: 8080,
		path: '/',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(post_data),
			'Postman-Token': '52b3a298-7520-4592-b50c-9a499ad1e3ae',
			'cache-control': 'no-cache'
		}
	};


	var req = http.request(options, function (res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			callback(chunk);
		});
	});

	req.on('error', function (e) {
		callback(500);
	});

	// write data to request body
	req.write(post_data);
	req.end();

}


function performGetRequest(data, newOptions, callback) {

	var options = {
		host:  "",
		port: 5000,
		encoding: null,
		path: '/',
		method: 'GET'
	};

	if (newOptions) {
		options.port = newOptions.port;
		options.path = newOptions.path
	}

	console.log(options)
	var req = http.request(options, function (res) {
		res.on('data', function (chunk) {
			callback(chunk);
		});
	});

	req.on('error', function (e) {
		callback(500);
	});

	req.end();

}


//refrences
/*

*/









