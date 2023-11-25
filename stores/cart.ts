export interface Items {
    productId: string
    product: string
    quantity: number
    price: number
    subtotal: number
}

export const useStoreCart = defineStore('cart', {
    state: () => {
        return {
            items: ref<Items[]>([])
        }
    },

    actions: {
        addItems(item: Items) {
            const exists = this.items.findIndex((itemCart) => itemCart.productId === item.productId)
            if (exists >= 0) {
                return false
            }
            this.items.push(item)
        },

        deleteItems(item: Items) {
            this.items = this.items.filter(itemCart => itemCart.productId !== item.productId)
        }
    },

    getters: {
        total: (state) => {
            return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
        }
    },
    persist: true
})