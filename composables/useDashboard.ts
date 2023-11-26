import { Result, SaleDash } from "~/interface/dashboard"

export default function useDashboard() {

    const result = useState<Result>()
    const labels = useState<String[]>(() => [])
    const data = useState<Number[]>(() => [])

    const sendRequest = async () => {
        const res = await $fetch<Result>('/api/dashboard/dashboard')
        result.value = res
    }

    const convertDatatoChart = (param: SaleDash[]) => {
        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];

        const month: { [key: string]: number } = {}

        // Inicializar todos los últimos 5 meses a 0
        const currentDate = new Date();
        for (let i = 4; i >= 0; i--) {
            const lastMonth = new Date(currentDate)
            lastMonth.setMonth(lastMonth.getMonth() - i)
            const formattedLastMonth = lastMonth.toISOString().substring(0, 7)
            month[formattedLastMonth] = 0
        }

        param.forEach(sale => {
            const xmonth = sale.date.substring(0,7) // obtenemos 'YYYY-MM'
            month[xmonth] = (month[xmonth] || 0) + sale._count
        })

        const xresult : Record<string, number> = Object.keys(month).reduce((acc: Record<string, number>, key) => {
            const monthIndex = parseInt(key.substring(5), 10) - 1;
            const monthName = monthNames[monthIndex];
            acc[monthName] = month[key];
            return acc;
        }, {})
        
        for (const key in xresult) {
            labels.value.push(key)
            data.value.push(xresult[key])         
        }
    }

    return {
        result,
        sendRequest,
        convertDatatoChart,
        labels,
        data
    }
}