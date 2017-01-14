'use strict'

const token = process.env.FB_PAGE_ACCESS_TOKEN
const request = require('request')

function sendTextMessage (sender, text) {
  var messageData = { text: text }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: token},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: messageData
    }
  }, function (error, response, body) {
    if (error) {
      console.log('Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  })
}

function sendGenericMessage (sender) {
  let messageData = {
    'attachment': {
      'type': 'template',
      'payload': {
        'template_type': 'generic',
        'elements': [{
          'title': 'First card',
          'subtitle': 'Element #1 of an hscroll',
          'image_url': 'http://messengerdemo.parseapp.com/img/rift.png',
          'buttons': [{
            'type': 'web_url',
            'url': 'https://www.messenger.com',
            'title': 'web url'
          }, {
            'type': 'postback',
            'title': 'Postback',
            'payload': 'Payload for first element in a generic bubble'
          }]
        }, {
          'title': 'Second card',
          'subtitle': 'Element #2 of an hscroll',
          'image_url': 'http://messengerdemo.parseapp.com/img/gearvr.png',
          'buttons': [{
            'type': 'postback',
            'title': 'Postback',
            'payload': 'Payload for second element in a generic bubble'
          }]
        }]
      }
    }
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: token},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: messageData
    }
  }, function (error, response, body) {
    if (error) {
      console.log('Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  })
}

module.exports.webhookGet = (event, context, callback) => {
  var response = {
    statusCode: 200,
    body: null
  }

  if (event.queryStringParameters['hub.verify_token'] === process.env.FB_BOT_VERIFY_TOKEN) {
    response.body = event.queryStringParameters['hub.challenge']
  } else {
    response.body = 'wrong token'
  }
  callback(null, response)
}

module.exports.webhookSet = (ev, context, callback) => {
  var body = JSON.parse(ev.body)
  var messagingEvents = body.entry[0].messaging
  for (let i = 0; i < messagingEvents.length; i++) {
    var event = body.entry[0].messaging[i]
    var sender = event.sender.id
    if (event.message && event.message.text) {
      const text = event.message.text
      if (text === 'Generic') {
        sendGenericMessage(sender)
        continue
      }
      sendTextMessage(sender, 'Text received, echo: ' + text.substring(0, 200))
    }
    if (event.postback) {
      var text = JSON.stringify(event.postback)
      sendTextMessage(sender, 'Postback received: ' + text.substring(0, 200), token)
      continue
    }
  }
  var response = {
    statusCode: 200,
    body: null
  }
  callback(null, response)
}
