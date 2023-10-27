export const verifyValueMoney = (event : KeyboardEvent) => {
    const input = event.target as HTMLInputElement
    const key = event.key
    const regex = /^[0-9.]*$/
    const decimalRegex = /^\d+\.\d{3,}$/

    if ((key === '.' && (input.value.length === 1 && input.value === '0')) || !regex.test(key) || decimalRegex.test(input.value + key) || (key === '.' && input.value.includes('.'))) {
        event.preventDefault()
    }
}