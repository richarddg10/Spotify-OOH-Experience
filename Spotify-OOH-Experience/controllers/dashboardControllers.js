import { fs } from "../dependencies.js"
import * as KPI from "./kpiCalculations.js"

export const getData = (req, res) => {
    try {
        const usersJSONData = fs.readFileSync('./localCollection/users.json')
        const { users } = JSON.parse(usersJSONData)
       
        const leadsByDay = KPI.getLeadsByDay(users)
        const allFiltersUsed= KPI.getFiltersUsed(users)
        const actualShoppingCenter =  KPI.getShoppingCenter(users)
        const lastFiveLeads =  KPI.getLastFiveLeads(users)
        const totalInteractions =  KPI.getTotalInteractions(users)

        let dashboardData = {
            leadsByDay,
            allFiltersUsed,
            actualShoppingCenter,
            lastFiveLeads,
            totalInteractions
        }

        res.send(dashboardData)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error reading JSON data')
    }
}
