const GeoIp = require('../libs/GeoIp')
const Slack = require('../libs/Slack')

module.exports = async function(req, res, next) {
  try {
    let location = {}
    let message = ''
    let realClientIpAddress = (req.headers['x-forwarded-for'] || '').split(',')
    realClientIpAddress = realClientIpAddress[realClientIpAddress.length - 1]

    if (realClientIpAddress) {
      location = await GeoIp.location(realClientIpAddress)
      message = `Someone visited the main page -- IP: ${realClientIpAddress} (location: ${location.city}, ${location.region_code}, ${location.country_name}), hostname: ${req.hostname}, User-Agent: ${req.headers['user-agent']}`
    } else {
      message = `Someone we couldn't identify visited.`
    }

    await Slack.send(message)
  } catch(err) {
    console.error("Error sending slack message", err)
  } finally {
    next()
  }
}
