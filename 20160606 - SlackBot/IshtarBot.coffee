token = 'xoxb-48333026162-JyTQZYkkqqw6abVJJ7dkPwH1'

Botkit = require('./botkit/lib/Botkit.js')

controller = Botkit.slackbot { debug: true }
botSpawn = controller.spawn { token: token }
bot = botSpawn.startRTM()
bot.config.retry = true

controller.on 'direct_message', (bot,message) ->
  bot.startConversation {channel: "C041YS0C2"}, (response, convo) ->
    convo.say message.text
