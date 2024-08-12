<script setup>
import { ref } from "vue";
import { useCartsStore } from "@/stores/carts";

const carts = useCartsStore();

const products = ref([]);

definePageMeta({
  layout: "home",
});

const categories = ref([
  { id: 1, icon: "mingcute:cellphone-line", label: "Phones" },
  { id: 2, icon: "mdi:desktop-classic", label: "Computers" },
  { id: 3, icon: "mdi:watch", label: "SmartWatch" },
  { id: 4, icon: "mdi:camera", label: "Camera" },
  { id: 5, icon: "mdi:headphones", label: "HeadPhones" },
  { id: 6, icon: "mdi:gamepad-variant", label: "Gaming" },
  { id: 7, icon: "mdi:microphone", label: "Microphone" },
  { id: 8, icon: "mdi:cellphone", label: "Clothing" },
  { id: 9, icon: "mdi:desktop-classic", label: "Electronics" },
  { id: 10, icon: "mdi:watch", label: "Home Appliances" },
  { id: 11, icon: "mdi:camera", label: "jewelery" },
  { id: 12, icon: "mdi:gamepad-variant", label: "Gaming" },
]);

try {
  await fetch("/api/products")
    .then((response) => response.json())
    .then((data) => {
      products.value = data;
    });
} catch (err) {
  console.log(err);
}
</script>

<template>
  <NuxtLayout :name="home">
    <div class="md:pb-6 pb-2">
      <CategorySlider class="container" />
    </div>

    <div class="container">
      <!-- product category -->
      <FeaturesCategories :items="categories" />
      <!-- flash sale -->
      <FeaturesOffers :items="products" />
      <!-- View All products -->
      <div class="flex items-center justify-between text-left md:mt-8 mt-6">
        <TitleWithSub title="This Month" subtitle="Best Selling Products" />
        <NuxtLink to="/product/view/bestSell">
          <Button class="w-32"> View All </Button>
        </NuxtLink>
      </div>

      <!-- Best Selling Products -->
      <div class="grid grid-cols-1 gap-x-6 md:grid-cols-2 lg:grid-cols-4">
        <ProductCard
          class="md:mt-8 mt-4"
          v-for="product in products.slice(0, 8)"
          :key="product.id"
          :product="product"
        />
      </div>
      <!-- Explore Our Products -->
      <ProductOur :items="products" />
      <!-- new arrival -->
      <ResponsiveGallery />
      <!-- flashsale banner -->
      <FlashSale
        category="Categories"
        headline="Enhance Your Music Experience"
        imageSrc="/images/jbl-speaker.png"
        imageAlt="JBL Speaker"
        buttonText="Buy Now!"
        :endTime="new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000)"
      />
      <Brand />
    </div>
  </NuxtLayout>
</template>
