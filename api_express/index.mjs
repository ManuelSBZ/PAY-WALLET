
import Express from "express"
import { default as jwt } from "jsonwebtoken"
import { default as dotenv } from "dotenv"
import { default as soap_generator } from "./modules/soap_generate"
import { default as cors } from "cors"

const server = Express()
const port = 7474
const url = `http://${process.env.HOST}:${process.env.PORT}${process.env.URI}`

const atob = (b64Encoded) => Buffer.from(b64Encoded, 'base64').toString()
const auth_object = (auth, res) => {
  try {
    const pre_result = atob(auth.split(" ")[1]).split(":")
    const result = { "username": pre_result[0], "password": pre_result[1] }
    return result
  } catch (error) {
    console.error(error)
    res.status(401).
      set({ 'WWW.Authentication': 'Basic realm: "login required"' })
      .json({ "message": "missing password or/and username" })
    return null
  }
}
dotenv.config()

function generateAccessToken(username, res) {
  // expires after half and hour (1800 seconds = 30 minutes)
  soap_generator(url, "data_user", { email: username }, (err, result) => {
    result = result.data_userResult.string
    const token = jwt.sign({ id: result[1], email: result[5] },
      process.env.TOKEN_SECRET,
      { expiresIn: '1800s' });
    console.log(`this is the token: ${token}`)
    res.json({ token: token })

  })
}


server.use(Express.json(), cors())

function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['x-access-tokens']
  const token = authHeader || null
  if (token == null) return res.status(401).json({ 'message': 'a valid token is missing' }) // if there isn't any token
  jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
    // console.log(err)
    if (err) return res.status(403).json({ 'message': 'token is invalid' })
    console.log(payload)
    req.payload = payload
    soap_generator(url, "data_user", { email: payload.email }, (err, result) => {
      const values = result.data_userResult.string.slice(1)
      const keys = ["id",
        "id_document",
        "name",
        "lastname",
        "email",
        "password",
        "telephone"]
      let listPairs = keys.map((item, index) => [item, values[index]])
      const user = listPairs.reduce((obj, entry) => {
        obj[entry[0]] = entry[1];
        return obj;
      }, {});
      req.user = user
      next()
    })
    // pass the execution off to whatever request the client intended
  })
}

server.post("/api/register/user", (req, res) => {
  const data = req.body
  const expected_values = [
    "name",
    "lastname",
    "telephone",
    "password",
    "id_document",
    "email"
  ]
  let data_to_push = Object.entries(data).filter((item) => expected_values
    .includes(item[0]))
  console.log(data_to_push.length)
  console.log(expected_values.length)
  console.log(data_to_push.length === expected_values.length)

  if (data_to_push.length !== expected_values.length) {
    return res.status(400)
      .json({
        "message": "Missing values, please verify the entries"
      })
  }
  console.log(data_to_push)
  const data_result = {}
  for (let a of expected_values) {
    data_result[a] = data_to_push.find((item) => item[0] === a)[1]
  }
  console.log(data_result)

  soap_generator(url, "register_user", data_result, (err, result) => {
    if (err) {
      console.log(err.error)
      res.status(400)
        .json({
          "error": err.body.split("<faultstring>")[1]
            .split("</faultstring>")[0], created: false
        })
    } else {
      res.json({ message: "user created", created: true })
    }
  })

})

server.get("/api/getToken", (req, res) => {
  let auth = req.headers.authorization
  auth = auth_object(auth, res)
  soap_generator(url, "get_user",
    { email: auth.username, password: auth.password },
    (err, result) => {
      // console.log(err)
      if (err) {
        res.status(401)
          .set({ 'WWW.Authentication': 'Basic realm: "login required"' })
          .json({ "message": "user not verified" })
      } else {
        const status = Object.entries(result)[0][1] //get_userResult: true || false
        if (status == "false") {
          res.status(401)
            .set({ 'WWW.Authentication': 'Basic realm: "login required"' })
            .json({ "message": "wrong password" })

        } else {
          generateAccessToken(auth.username, res)
        }
      }
    }
  )

})


server.listen(port, () => {
  console.log(`sever listenig at  ${port}`);
}
)