const linebot = require('linebot');
const express = require('express');

const bot = linebot({
	channelId: process.env.CHANNEL_ID,
	channelSecret: process.env.CHANNEL_SECRET,
	channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

const app = express();

const linebotParser = bot.parser();


// require core module `file system`
var fs = require( 'fs' );
 
// read file
var outputData = fs.readFileSync( './data.dat' ).toString();

app.get('/',function(req,res){
    res.send('TEST:'+outputData);
});

app.post('/linewebhook', linebotParser);

bot.on('message', function (event) {
	event.reply(event.message.text+event.message.text).then(function (data) {
		console.log('Success', data);
	}).catch(function (error) {
		console.log('Error', error);
	});
});

app.listen(process.env.PORT || 80, function () {
	console.log('LineBot is running.');
});
