const NGROK = `${window.location.hostname}`
console.log('Server IP: 127.0.0.1', NGROK)
let socket = io(NGROK, { path: '/real-time' })

const canva = document.getElementById('canva')

//Screens =====================================================

let inicialScreen = new Image(450, 650)
inicialScreen.src = './assets/inicialScreen.jpg'

let instructionsScreen = new Image(450, 650)
instructionsScreen.src = './assets/instructionsScreen.jpg'

let cameraScreen = new Image(450, 650)
cameraScreen.src = './assets/cameraScreen.jpg'

let photoCheckScreen = new Image(450, 650)
photoCheckScreen.src = './assets/photoCheckScreen.jpg'

let qrScreen = new Image(450, 650)
qrScreen.src = './assets/qrScreen.jpg'

let emailScreen = new Image(450, 650)
emailScreen.src = './assets/emailScreen.jpg'

let finalScreen = new Image(450, 650)
finalScreen.src = './assets/finalScreen.jpg'

let currentMupiScreen = inicialScreen
canva.appendChild(currentMupiScreen)

//Buttones =====================================================

const clickInafterCapture = document.getElementById('afterCapture')

// Photo filter =====================================================

// let badBunnyFilterPhoto = new Image(450, 650)
// badBunnyFilterPhoto.src = './assets/marcoBadbunny.png'

// let rebeldeFilterPhoto = new Image(450, 650)
// rebeldeFilterPhoto.src = './assets/marcoRebelde.png'

// let feidFilterPhoto = new Image(450, 650)
// feidFilterPhoto.src = './assets/marcoFeid.png'

// let currentFilter = badBunnyFilterPhoto

// =====================================================

clickInafterCapture.style.display = 'none'

//Change Screens =====================================================

let camaraScreen
let cF

function changeScreen() {
    switch (currentMupiScreen) {
      case inicialScreen:
        currentMupiScreen = instructionsScreen
      break

      case instructionsScreen:
        camaraScreen = handleUseCamara()
        takeImg()
        currentMupiScreen = camaraScreen

        socket.on('nextFilter', (value) => {
          if (value >= 700) {
            nextFilter()
            nextFilterString()
            console.log(value)

            cF = currentFilterString
            console.log(cF + ' ' + 'ultimo filtro');
          }
        })

        socket.on('previousFilter', (value) => {
          if (value <= 500) {
            previousFilter()
            previousFilterString()
            console.log(value)

            cF = currentFilterString
            console.log(cF + ' ' + 'ultimo filtro');
          }
        })

        // photoSaved.style.display = 'none'
        clickInafterCapture.style.display = 'block'
        currentFilter.style.display = 'block'
        canva.style.display = 'none'
      break

      case camaraScreen:
        currentMupiScreen = photoCheckScreen
        handleStopCamera()

        photoSaved.style.display = 'block'
        canva.style.display = 'block'
        currentFilter.style.display = 'none'
        clickInafterCapture.style.display = 'none'
      break

      case photoCheckScreen:
        currentMupiScreen = qrScreen
        photoSaved.style.display = 'none'
      break

      case qrScreen:
        currentMupiScreen = emailScreen
      break

      case emailScreen:
        currentMupiScreen = finalScreen
      break

    default:
  }

  inicialScreen.style.display = 'none'
  instructionsScreen.style.display = 'none'
  // camaraScreen.style.display = 'none'
  photoCheckScreen.style.display = 'none'
  qrScreen.style.display = 'none'
  emailScreen.style.display = 'none'
  finalScreen.style.display = 'none'
  currentMupiScreen.style.display = 'block'

  canva.appendChild(currentMupiScreen)
}

// Todo lo de la cámara =====================================================

function handleUseCamara() {
  qrScreen.style.display = 'none'
  const video = document.getElementById('video')
  const canvas = document.getElementById('canvasCamera')
  
  const context = canvas.getContext('2d')

  const cameraSize = {
    video: {
      width: { ideal: 450 },
      height: { ideal: 650 },
      frameRate: { ideal: 60 }
    }
  }

  navigator.mediaDevices.getUserMedia(cameraSize)
  .then(function(stream) {
    video.srcObject = stream
    video.play()
  })
  .catch(function(error) {
    console.error('Error al acceder a la cámara', error)
  })

  // takeImg()
}

function handleStopCamera() {
  const video = document.getElementById('video')
  video.classList.add('hidden')

  video.srcObject.getTracks().forEach(function(track) {
    track.stop()
  })
}

// Filtro cámara =====================================================

const badBunnyFilterPhoto = document.getElementById('badBunnyFilterPhoto')
badBunnyFilterPhoto.style.display = 'none'
const badBunnyFilterString = 'badBunnyFilter'
console.log(badBunnyFilterString)

const rebeldeFilterPhoto = document.getElementById('rebeldeFilterPhoto')
rebeldeFilterPhoto.style.display = 'none'
const rebeldeFilterString = 'rebeldeFilter'
console.log(rebeldeFilterString)

const feidFilterPhoto = document.getElementById('feidFilterPhoto')
feidFilterPhoto.style.display = 'none'
const feidFilterString = 'feidFilter'
console.log(feidFilterString)

let currentFilterString = badBunnyFilterString

function nextFilterString() {
  switch (currentFilterString) {
      case badBunnyFilterString:
        currentFilterString = rebeldeFilterString
        // console.log(currentFilterString)
      break
      case rebeldeFilterString:
        currentFilterString = feidFilterString
        // console.log(currentFilterString)
      break
    default:
  }
}

function previousFilterString() {
  switch (currentFilterString) {
      case feidFilterString:
        currentFilterString = rebeldeFilterString
        // console.log(currentFilterString)
      break
      case rebeldeFilterString:
        currentFilterString = badBunnyFilterString
        // console.log(currentFilterString)
      break
    default:
  }
}

let currentFilter = badBunnyFilterPhoto

function nextFilter() {
  switch (currentFilter) {
      case badBunnyFilterPhoto:
        currentFilter = rebeldeFilterPhoto
        badBunnyFilterPhoto.style.display = 'none'
        rebeldeFilterPhoto.style.display = 'block'
      break
      case rebeldeFilterPhoto:
        currentFilter = feidFilterPhoto
        rebeldeFilterPhoto.style.display = 'none'
        feidFilterPhoto.style.display = 'block'
      break
    default:
  }
}

function previousFilter() {
  switch (currentFilter) {
      case feidFilterPhoto:
        currentFilter = rebeldeFilterPhoto
        feidFilterPhoto.style.display = 'none'
        rebeldeFilterPhoto.style.display = 'block'
      break
      case rebeldeFilterPhoto:
        currentFilter = badBunnyFilterPhoto
        rebeldeFilterPhoto.style.display = 'none'
        badBunnyFilterPhoto.style.display = 'block'
      break
    default:
  }
}

//events =====================================================

socket.on('pressOptions', () => {
  changeScreen()
})

clickInafterCapture.addEventListener('click', () => {
  console.log('click')
  socket.emit('exportFilter', cF)
  changeScreen()
})

//take photo =====================================================

const photoSaved = document.getElementById('photoSaved')
photoSaved.style.display = 'none'

function takeImg() {
  const video = document.getElementById('video')
  const canvas = document.getElementById('canvasCamera')

  const context = canvas.getContext('2d')


  socket.on('takePhoto', () => {
    // const video = document.getElementById('video')
    
    const justThePhoto = context.drawImage(video, 0, 0, canvas.width, canvas.height)
      
    const photoFilter = context.drawImage(currentFilter, 0, 0, canvas.width, canvas.height)

    const dataURL = canvas.toDataURL('image/jpeg')
    photoSaved.src = dataURL

    justThePhoto.style.display = 'none'
    photoFilter.style.display = 'none'

    // photoSaved.appendChild(justThePhoto)
    // photoSaved.appendChild(photoFilter)

    // currentMupiScreen = photoCheckScreen

    // const dataUrl = canvas.toDataURL('image/jpeg')
  
    // socket.emit('photoData', dataUrl)

    // photoImg.src = dataUrl
  })
}

console.log(photoSaved)

// Repeat Change Screen =====================================================

let repeatMupiScreen

function repeatScreen() {
  switch (repeatMupiScreen) {
      case photoCheckScreen:
        repeatMupiScreen = camaraScreen
        clickInContinuar.style.display = 'none'
        clickInRepetir.style.display = 'none'
        clickInafterCapture.style.display = 'block'
      break
      case camaraScreen:
        currentMupiScreen = photoCheckScreen
        clickInafterCapture.style.display = 'block'
        clickInContinuar.style.display = 'none'
        clickInRepetir.style.display = 'none'
      // break
      // case photoCheckScreen:
      //   repeatMupiScreen = qrScreen
      //   clickInContinuar.style.display = 'none'
      //   clickInRepetir.style.display = 'none'
      //   clickInListo.style.display = 'block'
      // break
    default:

  }

  qrScreen.style.display = 'none'
  photoCheckScreen.style.display = 'none'
  repeatMupiScreen.style.display = 'block'

  canva.appendChild(repeatMupiScreen)
}

// clickInRepetir.addEventListener('click', () => {
//   console.log('click')
//   repeatScreen()
// })
