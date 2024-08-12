<script setup>
import { ref, onMounted, computed } from 'vue';
import { useCartsStore } from '@/stores/carts';
import { useWishlistStore } from '@/stores/wishlist';

const carts = useCartsStore();
const wishlists = useWishlistStore();

const whishList = ref(false);
const productItem = ref({});

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  updateProductItem();
  checkWishlistStatus();
});

const updateProductItem = () => {
  const cartItems = carts.items.reduce((acc, item) => {
    acc['id_' + item.id] = item.quantity;
    return acc;
  }, {});
  productItem.value = cartItems;
};

const checkWishlistStatus = () => {
  whishList.value = wishlists.items.some(item => item.id === props.product.id);
};

const addCart = (item) => {
  carts.addToCart(item);
  updateProductItem();
};

const addToWishlist = (item) => {
  whishList.value = !whishList.value;
  if (whishList.value) {
    wishlists.addToWishlist(item);
  } else {
    wishlists.removeFromWishlist(item.id);
  }
};
</script>

<template>
  <div class="relative">
    <div class="relative flex items-center w-full h-60 justify-center bg-gray-100 cursor-pointer group">
      <NuxtLink :to="`/product/${product.id}`">
        <div
          v-if="product.discount"
          class="absolute px-2 py-1 text-xs font-bold rounded-md text-light bg-primary top-2 left-2"
        >
          {{ product.discount }}
        </div>
        <div>
          <img
            :src="product.image"
            alt="Product Image"
            class="p-4 object-contain w-full"
          />
        </div>
      </NuxtLink>
      <div class="absolute flex flex-col space-y-2 right-4 top-2">
        <button
          class="p-2 text-black h-8 w-8 flex justify-center items-center bg-white rounded-full"
          @click="addToWishlist(product)"
        >
          <Icon
            :name="whishList ? 'fluent:heart-28-filled' : 'fluent:heart-28-regular'"
            :class="['text-xl', { 'text-primary': whishList }]"
          />
        </button>
        <button
          class="p-2 text-black h-8 w-8 flex justify-center items-center bg-white rounded-full"
        >
          <Icon name="mdi:eye-outline" />
        </button>
      </div>
      <div
        :class="
          productItem['id_' + product.id]
            ? 'opacity-100'
            : 'group-hover:opacity-100 opacity-0'
        "
        class="absolute bottom-0 left-0 right-0 flex items-center justify-center text-white transition-opacity duration-300 bg-black bg-opacity-90"
      >
        <button class="w-full py-2" @click="addCart(product)">
          <Icon
            name="mdi:cart-outline"
            class="relative w-6 h-6 cursor-pointer"
          />
          Add To Cart ({{
            productItem['id_' + product.id]
              ? productItem['id_' + product.id]
              : 0
          }})
        </button>
      </div>
    </div>
    <NuxtLink :to="`/product/${product.id}`">
      <div class="mt-4 text-left">
        <h3 class="text-lg font-semibold">{{ product.name }}</h3>
        <div class="flex items-center gap-4 mt-2">
          <div class="text-primary">{{ product.price }}</div>
          <div class="line-through text-secondary">{{ product.prevPrice }}</div>
        </div>
        <div class="flex items-center mt-2">
          <Rating :rating="product.rating" />
          <span class="ml-2 text-sm text-gray-500">
            ({{ product.ratingCount }})
          </span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>
.word {
  color: red;
}
</style>
