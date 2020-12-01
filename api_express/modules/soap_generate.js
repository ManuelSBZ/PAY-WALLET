const soap = require("soap") 

const soap_generator = (url, method, args, callable) => {
    soap.createClient(url, (err, client) => {
      client[method](args, (err, result) => {
        callable(err, result)
      })
    })
  }

module.exports = soap_generator