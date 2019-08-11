const slackClient = require('@slack/client')
const config = require('../config')

const IncomingWebhook = slackClient.IncomingWebhook

module.exports = {
  webhook: (!!config.slack.webhookUrl) ? new IncomingWebhook(config.slack.webhookUrl) : null,

  async send(text) {
    if (!this.webhook)
      return resolve(false)

    return await this.webhook.send({ text })
  }
}
