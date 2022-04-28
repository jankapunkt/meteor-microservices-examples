import { DDP } from 'meteor/ddp-client'

Meteor.startup(() => {
  // the warehouse url could also
  // be extracted to Meteor.settings
  const connection = DDP.connect('localhost:4000', {
    onConnected: () => {
      console.log('connected to warehouse')

      const token = createToken('availableProducts')
      connection.call('availableProducts', { token }, (err, products) => {
        if (err) console.error(err)
        console.log('available products', products)
      })
    }
  })
})

/**
 * Creates a jwt for a given method scope
 * @param methodName {string} name of the method to call
 * @returns {string} the sealed and encoded/compressed jwt
 */
const createToken = (function () {
  import njwt from 'njwt'

  const { key, sub } = Meteor.settings.jwt
  const url = Meteor.absoluteUrl()

  return methodName => {
    const jwt = njwt.create({
      scope: methodName,
      sub: sub,
      iss: url
    }, key)

    // this value could be moved to Meteor.settings as well
    jwt.setExpiration(new Date().getTime() + (1000))
    return jwt.compact()
  }
})()
