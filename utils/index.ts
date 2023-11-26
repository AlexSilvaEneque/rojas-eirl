import { format } from "date-fns"

export const verifyValueMoney = (event : KeyboardEvent) => {
    const input = event.target as HTMLInputElement
    const key = event.key
    const regex = /^[0-9.]*$/
    const decimalRegex = /^\d+\.\d{3,}$/

    if ((key === '.' && (input.value.length === 1 && input.value === '0')) || !regex.test(key) || decimalRegex.test(input.value + key) || (key === '.' && input.value.includes('.'))) {
        event.preventDefault()
    }
}

export const getCurrentDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const day = ("0" + date.getDate()).slice(-2)
    return `${year}-${month}-${day}`
}

export const formatCurrency = (param: number) => {
    return param.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })
}

export const converttoDDMMYYYY = (isoDate: any) => {
    const newDate = new Date(isoDate)
    const adjustedDate = new Date(newDate)
    const formattedDate = format(adjustedDate, 'dd/MM/yyyy')
    return formattedDate
}