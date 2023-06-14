class View {
    static lineItem = document.querySelector('#myLineChart')
    static doughnutItem = document.querySelector('#myDoughnutChart')
    static fiveLeadsTable = document.querySelector('tbody')
    static newInteraction = document.querySelector('.newInteraction')
    static newShoppingCenter = document.querySelector('.newShoppingCenter')

    constructor() {
        this.lineChart
        this.doughnutChart
    }

    getHello() {
        this.onHello()
    }

    getLineChart() {

        const labels = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
        const config = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        data: [0, 0, 0, 0, 0, 0, 0],
                        fill: false,
                        backgroundColor: 'transparent',
                        borderColor: 'rgb(30, 215, 96)',
                        pointBackgroundColor: 'rgba(65, 63, 63)',
                        pointBorderColor: 'rgba(255, 255, 255)',
                        pointRadius: 6,
                        pointBorderWidth: 2,
                        tension: 0.4
                    }
                ]
            },
            options: {
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        ticks: {
                            color: 'rgba(255, 255, 255)'
                        },
                        grid: { display: false }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: { 
                            values: [0, 10, 20, 30, 40],
                            color: 'rgba(255, 255, 255)'
                        },
                        grid: {
                            color: 'rgba(32, 32, 32)'
                        }
                    }
                }
            }
        }
        this.lineChart = new Chart(View.lineItem, config)
    }

    updateLineChart(newData) {
        const labels = Object.keys(newData)
        const labelsDays = Object.values(newData)

        console.log(labels)
        console.log(labelsDays)

        this.lineChart.data.labels = labels
        this.lineChart.data.datasets[0].data = labelsDays

        this.lineChart.update()
    }
    
    getDoughnutChart() {
        const config = {
            type: 'doughnut',
            data: {
                labels: [ 'Bad Bunny', 'Rebelde', 'Feid' ],
                datasets: [{
                    label: 'Filtros usados',
                    data: [5, 3, 8],
                    backgroundColor: ['rgb(0, 0, 0)', 'rgb(255, 0, 0)', 'rgb(0, 255, 0)',],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                plugins: {
                    legend: { display: false }
                }
            }
        }

        this.doughnutChart = new Chart(View.doughnutItem, config)
    }

    updateDoughnutChart(newData) {
        const labels = Object.keys(newData)
        const labelsFilters = Object.values(newData)

        console.log(labels)
        console.log(labelsFilters)

        this.doughnutChart.data.labels = labels
        this.doughnutChart.data.datasets[0].data = labelsFilters

        this.doughnutChart.update()
    }

    updateTable(newData) {
        console.table(newData)

        View.fiveLeadsTable.innerHTML = ``
        
        newData.forEach(element => {
            let row = document.createElement('tr')
            row.innerHTML =
                `   <td>${element.name}</td>
                    <td>${element.number}</td>
                    <td>${element.email}</td>
                `
            View.fiveLeadsTable.appendChild(row)
        })
    }

    updateShoppingCenter(newCc) {

        let valorChipichape = newCc.hasOwnProperty("Chipichape") ? newCc["Chipichape"] : null;
        console.log(valorChipichape)
        
        View.newShoppingCenter.innerHTML = ''
        let h4 = document.createElement('h1')
        h4.innerHTML = `
        <h4><strong>${valorChipichape}</strong> Interacciones</h4>
        `
        View.newShoppingCenter.appendChild(h4)
    }

    updateTotalInteractions(totalInteraccionesUsers) {
        console.log(totalInteraccionesUsers)

        View.newInteraction.innerHTML = ''
        let h3 = document.createElement('h1')
        h3.innerHTML = `
        <h3>${totalInteraccionesUsers}</h3>
        `
        View.newInteraction.appendChild(h3)
    }
    
    render() {
        this.getLineChart()
        this.getDoughnutChart()
    }
}