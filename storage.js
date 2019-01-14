const hyperdb = require('hyperdb'),
//  hyperdiscovery = require('hyperdiscovery'),
  crypto = require('crypto'),
  webrtc = require('webrtc-swarm'),
  signalhub = require('signalhub'),
  pump = require('pump'),
  homedir = require('os').homedir(),
  utils = require('./utils')

//const DEFAULT_SIGNALHUBS = 'http://localhost/signalhub'
//const DEFAULT_SIGNALHUBS = 'https://signalhub-jccqtwhdwc.now.sh'
const DEFAULT_SIGNALHUBS = 'https://signalhub.p2ee.org'
let db = null

exports.init = function() {
  db = hyperdb(homedir + '/cms.db', { valueEncoding: 'utf-8' })
  return new Promise((resolve, reject) => {
    db.on('ready', () => {
      const key = db.key.toString('hex')
      const disckey = db.discoveryKey.toString('hex')

//      console.log('KEY: ' + key) 
//      console.log('DISC KEY: ' + disckey)
//      console.log('LOCAL KEY: ' + db.local.key.toString('hex'))

      resolve()
    })
  })
}

exports.key = function() {
  return db.key.toString('hex')
}

exports.run = function() {
  /*
  const swarm = hyperdiscovery(db)
  swarm.on('connection', (peer, type) => {
   console.log('PEER: ' + peer.key.toString('hex'))
  })
  */
  const disckey = db.discoveryKey.toString('hex')
  //console.log('DISC KEY: ' + disckey)
  const swarm = webrtc(signalhub(disckey, DEFAULT_SIGNALHUBS), { 
    wrtc: require('wrtc')
  })
  swarm.on('peer', function (conn) {
    console.log("💕 You've got a new peer!")
    const peer = db.replicate({
      upload: true,
      download: true
    })
    pump(conn, peer, conn)
  })
  console.log("🏃 Running...")
}

function createKey(str) {
  const sha = crypto.createHash('sha1')
  sha.update(JSON.stringify(str))
  return sha.digest('hex')
}

exports.put = function(obj) {
  return new Promise((resolve, reject) => {
    const objStr = JSON.stringify(obj)
    const key = createKey(objStr)
    db.put(key, objStr, (err) => {
      if(err) reject(err)
      resolve(key)
    })
  })
}

exports.get = function(key) {
  return new Promise((resolve, reject) => {
    db.get(key, (err, nodes) => {
      if(err) reject(err)
      try {
        if(nodes.length > 0) {
          const obj = JSON.parse(nodes[0].value)
          resolve(obj)
        }
        else resolve(undefined)
      } catch(e) {
        reject(e)
      }
    })
  })
}

exports._createPage = function(title, content) {
  return this.put({
    title: title,
    content: content
  })
}

exports.getPages = function() {
  return this.get("pages")
}

exports.updatePages = function(pages) {
  return new Promise((resolve, reject) => {
    db.put("pages", JSON.stringify(pages), err => {
        if(err) reject(err)
        resolve()
    })
  })
}

exports.removePage = function(hash) {
  return new Promise((resolve, reject) => {
    db.del(hash, async (err, nodes) => {
      if(err) reject(err)
      else {
        let pages = await this.getPages()
        pages = pages.filter(h => h !== hash)
        this.updatePages(pages).then(resolve).catch(reject)
      }
    })
  })
}

exports.updatePage = async function(hash, content, title) {
  const page = await this.get(hash)
  return new Promise((resolve, reject) => {
    if(!page) reject(new Error(hash + " not found."))
    title = title || page.title
    this.removePage(hash).then(() => {
      this.addPage(content, title).then(resolve).catch(reject)
    }).catch(reject)
  })
}

exports.addPage = async function(content, title) {
  title = title || 'Untitled'
  let pages = await this.getPages() || []

//  const contentKey = await this.createContent(content)

  return new Promise((resolve, reject) => {
    this._createPage(title, content).then((pageKey) => {
      if(!pages.includes(pageKey)) pages = pages.concat(pageKey)
      this.updatePages(pages).then(() => {
        resolve(pageKey)
      }).catch(reject)
    })
  })
}

