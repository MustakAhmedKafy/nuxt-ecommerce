<script setup>
const crumbs = [{ name: "Home", link: "/" }, { name: " Cart" }];
import { ref, computed } from "vue";
import { useCartsStore } from "@/stores/carts";

const carts = useCartsStore();

// Method to increase item quantity
const increaseQuantity = (item) => {
  item.quantity += 1;
  carts.updateItem(item);
};

// Method to decrease item quantity
const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity -= 1;
    carts.updateItem(item);
  }
};

// Method to delete item
const deleteItem = (item) => {
  carts.removeItem(item.id);
};

// Computed property to get total items count
const totalItems = computed(() => {
  return carts.items.reduce((total, item) => total + item.quantity, 0);
});

// Computed property to get total price
const totalPrice = computed(() => {
  return carts.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
});

console.log(carts);
console.log(carts.items);
</script>

<template>
  <NuxtLayout name="home">
    <div class="px-4 py-10 lg:px-36">
      <div class="py-2 text-left">
        <Breadcrumb :crumbs="crumbs" />
      </div>
      <div class="w-full mb-4 lg:mb-4">
        <div class="overflow-x-auto">
          <table
            class="hidden w-full p-8 sm:table"
            style="border-spacing: 0 1rem"
          >
            <thead class="border custom-row-gap">
              <tr class="text-sm">
                <th class="px-6 py-3 text-left">Product</th>
                <th class="px-6 py-3 text-left">Price</th>
                <th class="px-6 py-3 text-left">Quantity</th>
                <th class="px-6 py-3 text-left">Subtotal</th>
              </tr>
            </thead>
            <tbody class="text-sm font-light text-gray-600 custom-row-gap">
              <tr
                v-for="item in carts.items"
                :key="item.id"
                class="border hover:bg-gray-100"
              >
                <td class="relative flex items-center px-6 py-3 text-left">
                  <img
                    :src="item.image"
                    alt="product image"
                    class="w-16 h-16 mr-4 rounded-md"
                  />

                  <Icon
                    name="material-symbols:close"
                    class="absolute w-4 h-4 text-white rounded-full cursor-pointer bg-primary left-9 top-7 hover:text-primary hover:bg-white"
                    @click="deleteItem(item)"
                  />

                  <div class="font-bold">{{ item.name }}</div>
                </td>
                <td class="px-6 py-3 font-bold text-left">
                  {{ item.price }}
                </td>
                <td class="px-6 py-3 font-bold text-left">
                  <div class="flex items-center mt-2">
                    <button
                      class="px-2 border rounded-l"
                      @click="decreaseQuantity(item)"
                    >
                      <svg
                        class="w-4 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 12h14"
                        />
                      </svg>
                    </button>
                    <input
                      type="number"
                      :value="item.quantity"
                      min="1"
                      class="w-10 h-[26px] text-center border-t border-b"
                      @input="
                        ($event) => {
                          item.quantity = Number($event.target.value);
                          carts.updateItem(item);
                        }
                      "
                    />
                    <button
                      class="px-2 border rounded-r"
                      @click="increaseQuantity(item)"
                    >
                      <svg
                        class="w-4 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 12h14m-7 7V5"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td class="px-6 py-3 font-bold text-left">
                 {{ item.quantity * item.price }}
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <div class="block sm:hidden">
            <div v-for="item in cartItems" :key="item.id" class="pb-4 mb-4 border-b">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <img :src="item.image" alt="product image" class="w-16 h-16 mr-4 rounded-md" />
                  <div class="font-bold">{{ item.name }}</div>
                </div>
                <Icon
                  name="material-symbols:close"
                  class="w-4 h-4 text-white rounded-full cursor-pointer bg-primary hover:text-primary hover:bg-white"
                  @click="removeItem(item.id)"
                />
              </div>
              <div class="mt-2">
                <div class="flex justify-between">
                  <div>Price:</div>
                  <div class="font-bold">{{ formatPrice(item.price) }}</div>
                </div>
                <div class="flex justify-between mt-2">
                  <div>Quantity:</div>
                  <input
                    type="number"
                    class="w-16 p-2 border rounded"
                    v-model="item.quantity"
                    min="1"
                  />
                </div>
                <div class="flex justify-between mt-2">
                  <div>Subtotal:</div>
                  <div class="font-bold">{{ formatPrice(item.price * item.quantity) }}</div>
                </div>
              </div>
            </div>
          </div> -->
        </div>

        <div class="flex items-center justify-between mt-8">
          <Button
            class="lg:w-48 !text-black bg-transparent border border-dark hover:border-primary hover:bg-gray hover:!text-white"
          >
            Return To Shop
          </Button>

          <NuxtLink to="/checkout">
            <Button class="w-full text-white md:w-40"> Checkout </Button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.text-danger {
  color: red;
}

@media (min-width: 640px) {
  table {
    display: inline-table !important;
  }

  thead tr:not(:first-child) {
    display: none;
  }
}

.custom-row-gap tr {
  margin-bottom: 1rem; /* Adjust this value as needed */
}

.custom-row-gap td,
.custom-row-gap th {
  padding-top: 24px;
  padding-bottom: 24px;
  padding-left: 40px;
  padding-right: 40px;
}
</style>
