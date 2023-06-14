export function getLeadsByDay(users) {
    let days = {}

    // Recorrer los elementos en el arreglo "days" del JSON
    for (let i = 0; i < users.length; i++) {
        let lead = users[i].leadDate
        days[lead] = (days[lead] || 0) +1
    }
    return days
}

export function getFiltersUsed(users) {
    let filters = {}

    // Recorrer los elementos en el arreglo "filters" del JSON
    for (let i = 0; i < users.length; i++) {
        let songFilter = users[i].filterUsed
        filters[songFilter] = (filters[songFilter] || 0) +1
    }
    return filters
}

export function getShoppingCenter(users) {
    let actualCc = {}

    // Recorrer los elementos en el arreglo "actualCc" del JSON
    for (let i = 0; i < users.length; i++) {
        let cc = users[i].shoppingCenter
        actualCc[cc] = (actualCc[cc] || 0) +1
    }
    return actualCc
}

export function getLastFiveLeads(users) {
    return users.slice(users.length-4)
}

export function getTotalInteractions(users) {
    const totalInteraccionesUsers = users.length
    return totalInteraccionesUsers
}
