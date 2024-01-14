const dotenv = require("dotenv");
const fs = require("fs")
const path = require("path")
const http = require("http")
const EventEmmiter = require('node:events')

const emmiter = new EventEmmiter();

dotenv.config()

const PORT = process.env.PORT || 6000;

class Router {
  constructor() {
    this.endpoints = {}
  }

  request(method = 'GET', path, handler) {
      if(!this.endpoints[path]) {
        this.endpoints[path] = {}
      }

      const endpoint = this.endpoints[path]

      if(endpoint[method]) {
        throw Error(`${method} with ${path} address is already declared`)
      }

      endpoint[method] = handler

      emmiter.on(`[${path}]:${method}`, (req, res) => {
        handler(req, res )
      })
  }

  get(path, handler) {
    this.request('GET', path, handler)
  }

  post(path, handler) {
    this.request('POST', path, handler)
  }

  put(path, handler) {
    this.request('PUT', path, handler)
  }

  delete(path, handler) {
    this.request('DELETE', path, handler)
  }
}

const router = new Router();

router.get('/users', (req, res) => {
  res.end('/users endpoint')
})

router.post('/posts', (req, res) => {
  res.end('/posts endpoint')
})

server = new http.createServer((req, res) => {
  const emmited = emmiter.emit(`[${req.url}]:${req.method}`, req, res)

  if(!emmited) {
    res.end()
  }
});

server.listen(PORT, () => {
  console.log('Server is running on port', PORT);
})