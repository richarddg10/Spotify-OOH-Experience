const view = new View()
const HOST = window.location.hostname
const PROTOCOL = window.location.protocol
const PORT = window.location.port === ''? '' : `:${window.location.port}`
const URL = `${PROTOCOL}//${HOST}${PORT}`
console.log(URL)
const socket = io(URL, { path: '/real-time' })

function controller(view, socket) {

    (async function getDashboardData() {
        const request = await fetch(`${URL}/dashboard`)
        const data = await request.json()
        kpi = data
        console.log(kpi)
        view.updateLineChart(kpi.leadsByDay)
        view.updateDoughnutChart(kpi.allFiltersUsed)
        view.updateShoppingCenter(kpi.actualShoppingCenter)
        view.updateTable(kpi.lastFiveLeads)
        view.updateTotalInteractions(kpi.totalInteractions)
    })()

    const updateRealTime = async () => {
        const request = await fetch(`${URL}/dashboard`)
        const data = await request.json()
        const kpi = data
        view.updateLineChart(kpi.leadsByDay)
        view.updateDoughnutChart(kpi.allFiltersUsed)
        view.updateShoppingCenter(kpi.actualShoppingCenter)
        view.updateTable(kpi.lastFiveLeads)
        view.updateTotalInteractions(kpi.totalInteractions)
        console.log('Hello from updateRealTime')
    }

    socket.on('real-time-update', (data) => {
        console.log('Some update happen!')
        console.log(data)
        updateRealTime()
    })

    view.render()
}

controller(view, socket)

// const clickInPrincipalButton = document.getElementById('principalButton')

// clickInPrincipalButton.addEventListener('click', () => {
//     console.log('click')
//     changeScreen()
// })