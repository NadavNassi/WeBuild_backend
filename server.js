const express = require('express')
const cors = require('cors')
const path = require('path')
const expressSession = require('express-session')
const { connectSockets } = require('./services/socket.service')


const app = express()
const http = require('http').createServer(app)

const session = expressSession({
    secret: 'coding is amazing',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})

app.use(express.json())
app.use(session)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

// Config Express Routes
const wapRoutes = require('./api/wap/wap.route')
const cmpRoutes = require('./api/cmp/cmp.route')
// const { connectSockets } = require('./services/socket.service')

app.use('/api/wap', wapRoutes)
app.use('/api/cmp', cmpRoutes)

app.get('/api/setup-session', (req, res) => {
    req.session.connectedAt = Date.now()
    console.log('setup-session:', req.sessionID);
    res.end()
})

connectSockets(http, session)


// connectSockets(http, session)


app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
const logger = require('./services/logger.service')
const port = process.env.PORT || 3030
http.listen(port,
    () => logger.info('Server is running on port: ' + port)
)
