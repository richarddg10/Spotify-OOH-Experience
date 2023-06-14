import { express, cors, dotenv, SocketIOServer, http } from './dependencies.js'
import { SerialPort, ReadlineParser } from 'serialport'
import userRoutes from './routes/userRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import fireStoreDB from './firebase-config.js';

const SERVER_IP = '127.0.0.1'
dotenv.config()
const PORT = process.env.PORT

//⚙️ HTTP COMMUNICATION SETUP ============================================
const app = express()


// const testLead = {
//   name: 'Sofia',
//   age: 28
// }

// fireStoreDB.addNewDocumentTo(testLead, 'Leads')

// fireStoreDB.updateRealTime('Leads', () => { console.log('update!') })
// fireStoreDB.addNewDocumentTo({ name: 'Camila', age: 58, state: true }, 'Leads');
// fireStoreDB.getCollection('Leads').then((leads) => {
//   console.log(leads);
// })

app.use(express.json())
app.use(cors({ origin: "*" }))

app.use('/mupi', express.static('./static/public-mupi'))
app.use('/user-app', express.static('./static/public-user'))
app.use('/dashboard-app', express.static('./static/public-dashboard'))

app.use('/user', userRoutes)
app.use('/dashboard', dashboardRoutes)

//⚙️ SERIAL COMMUNICATION ARDUINO SETUP ============================================
const protocolConfiguration = {
    path: '/dev/cu.usbserial-14210',
    baudRate: 9600
}

const port = new SerialPort(protocolConfiguration)
const parser = port.pipe(new ReadlineParser)

parser.on('data', (arduinoData) => {

    //  Start Joystick =====================================================

    let posX = undefined
    if (arduinoData.includes('X')) {
        posX = Number(arduinoData.valueOf().split(': ')[1])
        console.log("X: " + posX)
    }

    let posY = undefined
    if (arduinoData.includes('Y')) {
        posY = Number(arduinoData.valueOf().split(': ')[1])
        console.log("Y: " + posY)
    }

    //  Start Buttones =====================================================

    let captureButton = 0
    if (arduinoData.includes('Capture')) {
        captureButton = arduinoData.valueOf().split(': ')[1]
        console.log("Button capture: " + captureButton)
    }

    let optionsButton = 0
    if (arduinoData.includes('Options')) {
        optionsButton = arduinoData.valueOf().split(': ')[1]
        console.log("Button options: " + optionsButton)
    }

    //  Change Filter =====================================================

    if (posX != undefined && posX >= 700) {
        io.emit('nextFilter',posX)
    }

    if (posX != undefined && posX <= 500) {
        io.emit('previousFilter', posX)
    }

    //  Capture button red =====================================================

    if (captureButton == 1) {
        io.emit('takePhoto')
    }

    //  Next button blue =====================================================

    if (optionsButton == 1) {
        io.emit('pressOptions')
    }  
})

//⚙️ WEBSOCKET COMMUNICATION SETUP ============================================
const httpServer = app.listen(PORT, () => {
    console.log(`Server is running, host http://${SERVER_IP}:${PORT}/`)
    console.table({
        'Mupi Endpoint': `http://${SERVER_IP}:${PORT}/mupi/`,
        'Users Endpoint': `http://${SERVER_IP}:${PORT}/user-app/`,
        'Dashboard Endpoint': `http://localhost:${PORT}/dashboard-app/`
    })
})

const io = new SocketIOServer(httpServer, { path: '/real-time' })

// 🔄 SERIAL COMMUNICATION WORKING ============================================
// parser.on('data', (arduinoData) => {
//     // let dataArray = arduinoData
//     // io.emit('', )
//     // console.log(dataArray)
// })

// 🔄 WEBSOCKET COMMUNICATION ============================================
io.on('connection', (socket) => {
    console.log('Client connected: ' + socket.id)

    socket.on('exportFilter', (cF) => {
        console.log('Evento recibido en SERVER')
        io.emit('serverExportFilter', cF)
    })
    
    socket.on('disconnect', () => {
        console.log('Client disconnected: ' + socket.id)
    })
})

// User Data Form ============================================
let dataForm

app.post('/data-form', (req, res) => {
    dataForm = req.body
    res.send({Data: `User data is: ${dataForm}`})
    console.log(dataForm)
})

fireStoreDB.updateRealTime('Leads', () => {
    io.emit('real-time-update', { state: 'Using onSnapshot' })
})
  
export { io }