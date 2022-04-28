import { Random } from 'meteor/random'

// track who is connecting to warehouse
// {
//    id: 'dBAve5vSw4zscdSAs',
//    close: [Function: close],
//    onClose: [Function: onClose],
//    clientAddress: '127.0.0.1',
//    httpHeaders: {
//      'x-forwarded-for': '127.0.0.1',
//      'x-forwarded-port': '4000',
//      'x-forwarded-proto': 'ws',
//      host: 'localhost:4000'
//    }
//  }
//
// When unwanted connections come in:
// use remote.stop() to force-disconnect
// use ddp-rate-limiter (thanks to Adrian Lanning):
//    https://docs.meteor.com/api/methods.html#ddpratelimiter
Meteor.onConnection(function (remote) {
  console.log(remote)
})

// noting special, schema:
// { available: Boolean, title: String }
const Products = new Mongo.Collection('products')

// create some fake data
Meteor.startup(() => {
  for (let i = 0; i < 25; i++) {
    const available = Math.random() > 0.5
    const title = Random.id(8)
    Products.insert({ title, available })
  }
})

// provide endoint(s) to our remotes / consumers
Meteor.methods({
  availableProducts: function ({ token } = {}) {
    validateToken(token, 'availableProducts')
    return Products.find({ available: true }).fetch()
  }
})

/**
 * Validates a jwt and throws if token is missing or invalid.
 * If token is valid it will "run through"
 * @param token {string} the encoded jwt
 * @param methodName {string} part of the request `scope` of the token
 */
const validateToken = (function () {
  import njwt from 'njwt'

  const { key, catalog } = Meteor.settings.jwt

  return (token, methodName) => {
    if (!token)
      throw new Meteor.Error(403,
        'permissionDenied',
        'noToken')

    let unseal

    try {
      unseal = njwt.verify(token, key)
    } catch (e) {
      // we can log the errors here internally but
      // to externals we might return only
      // that the token has been invalid
      console.error(e)
      throw new Meteor.Error(403,
        'permissionDenied',
        'invalidToken')
    }

    const { scope, sub, iss } = unseal.body

    if (scope !== methodName || iss !== catalog.url || sub !== catalog.sub) {
      throw new Meteor.Error(403,
        'permissionDenied',
        'invalidToken')
    }

    // pass = do nothing
  }
})()
