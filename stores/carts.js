import { defineStore } from "pinia";

export const useCartsStore = defineStore("carts", {
  state: () => ({
    items: [],
    totalItem: 0,
    totalPrice: 0,
  }),
  persist: true,
  getters: {
    cartItems: (state) => state.items,
  },
  actions: {
    addToCart(data) {
      const existingItem = this.items.find((item) => item.id === data.id);

        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.total = existingItem.quantity * existingItem.price;        
                
        } else {
            data.quantity = 1;
            data.total = data.price;
            this.items.push(data);
        }

        // Update total item count and total price
        this.totalItem = this.items.reduce((acc, item) => acc + item.quantity, 0);
        this.totalPrice = this.items.reduce( (acc, item) => parseFloat(acc) + parseFloat(item.total),0);

      this.updateCartSummary();
    },

    updateItem(updatedItem) {
      const item = this.items.find((item) => item.id === updatedItem.id);
      if (item) {
        item.quantity = updatedItem.quantity;
        item.total = item.quantity * item.price;
      }

      this.updateCartSummary();
    },

    removeItem(itemId) {
      this.items = this.items.filter((item) => item.id !== itemId);

      this.updateCartSummary();
    },

    updateCartSummary() {
      this.totalItem = this.items.reduce((acc, item) => acc + item.quantity, 0);
      this.totalPrice = this.items.reduce(
        (acc, item) => parseFloat(acc) + parseFloat(item.total),
        0
      );
    },
  },
});
