const slackClient = require('@slack/client')
const config = require('../config')

const IncomingWebhook = slackClient.IncomingWebhook

module.exports = {
  webhook: (!!config.slack.webhookUrl) ? new IncomingWebhook(config.slack.webhookUrl) : null,

  send(content) {
    return new Promise((resolve, reject) => {
      if (!this.webhook)
        return resolve(false)

      this.webhook.send(content, (err, header, statusCode, body) => {
        if (err) return reject(err)
        if (statusCode >= 400) return reject(body)
        resolve(body)
      })
    })
  }
}
