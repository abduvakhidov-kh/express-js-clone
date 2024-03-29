const http = require("http")
const EventEmmiter = require('events')

module.exports = class Application {
  constructor() {
    this.emmiter = new EventEmmiter();
    this.server = this._createServer();
    this.middlewares = [];
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach(path => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach(method => {
        const handler = endpoint[method]
        this.emmiter.on(this._getRouteMask(path, method), (req, res) => {
          handler(req, res )
        })
      })
    })
  }

  use(middleware) {
    this.middlewares.push(middleware)
  }

  listen(port, callback) {
    this.server.listen(port, callback)
  }

  _createServer() {
    return http.createServer((req, res) => {

      let body = '';

      req.on('data', (chunk) => {
        body += chunk;
      })

      req.on('end', () => {
        if(body) {
          req.body = JSON.parse(body)
        }
        
        this.middlewares.forEach(middleware => middleware(req, res))
        const emmited = this.emmiter.emit(this._getRouteMask(req.url, req.method), req, res)

        if(!emmited) {
          res.end()
        }
      })

    });
  }

  _getRouteMask(path, method) {
    return `[${path}]:${method}`
  }
}