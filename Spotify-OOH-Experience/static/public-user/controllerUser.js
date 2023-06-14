const NGROK = `${window.location.hostname}`
console.log('Server IP: 127.0.0.1', NGROK)
let socket = io(NGROK, { path: '/real-time' })

const canva = document.getElementById('canva')
const privacyP = document.getElementById('privacy-policy')

//Screens =====================================================

let formScreen = new Image(310, 650)
formScreen.src = './assets/formScreen.jpg'

let fullFilledFormScreen = new Image(310, 650)
fullFilledFormScreen.src = './assets/fullFilledFormScreen.png'

let currentUserScreen = formScreen
canva.appendChild(currentUserScreen)

currentUserScreen.style.display = 'block'

//Enviar Día Actual =====================================================

// Obtener la fecha actual
let fechaActual = new Date()

// Obtener el día de la semana (0 = domingo, 1 = lunes, ..., 6 = sábado)
let diaSemana = fechaActual.getDay()

// Definir un arreglo con los nombres de los días de la semana
let nombresDias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

// Obtener el nombre del día de la semana actual
let nombreDiaActual = nombresDias[diaSemana]

// Imprimir el nombre del día de la semana actual
console.log(nombreDiaActual)

//Enviar Centro Comercial =====================================================

const actualShoppingCenter = 'Chipichape'

console.log(actualShoppingCenter)

//Recibe Variable Con Filtro Usado =====================================================

let filterSended

socket.on('serverExportFilter', (cF) => {
    console.log('Evento recibido USER')
    console.log(cF)

    filterSended = cF
})

console.log(filterSended)

//Se Define La Variable De Las Políticas De Privacidad =====================================================

const privacyPolitical = true

//Formulario =====================================================

const form = document.getElementById("user-form")
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const numberInput = document.getElementById('number')
const sendButton = document.getElementById('send')

async function userData(user) {
  const data = {
      method: 'POST',
      headers: {
          "Content-Type" : "application/json"
      },
      body: JSON.stringify(user)
  }
  await fetch('/user', data)
}

sendButton.addEventListener('click', (event)=>{
    let user = { name: nameInput.value, email: emailInput.value, number: numberInput.value, leadDate: nombreDiaActual, shoppingCenter: actualShoppingCenter, filterUsed: filterSended, privacyAgreement: privacyPolitical  }
    console.log('Enviado')
    console.log(filterSended + ' ' + 'Enviado Con Formulario')
    userData(user)
    changeScreen()
})

// Change screen =====================================================

function changeScreen() {
    switch (currentUserScreen) {
        case formScreen:
            currentUserScreen = fullFilledFormScreen
            sendButton.style.display = 'none'
        break
        default:
            currentUserScreen = formScreen
    }

    formScreen.style.display = 'none'
    fullFilledFormScreen.style.display = 'none'
    form.style.display = 'none'
    currentUserScreen.style.display = 'block'
    canva.appendChild(currentUserScreen)
}
