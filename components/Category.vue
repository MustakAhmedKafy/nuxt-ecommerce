<script setup>
import { reactive } from "vue";

const menus = reactive([
  {
    id: 1,
    title: "Woman's Fashion",
    subItems: ["Item 1", "Item 2"],
    isOpen: false,
  },
  {
    id: 2,
    title: "Woman's Fashion",
    subItems: [
      "Item 1",
      "Item 2",
      "Item 1",
      "Item 2",
      "Item 1",
      "Item 2",
      "Item 1",
      "Item 2",
      "Item 1",
    ],
    isOpen: false,
  },
  {
    id: 3,
    title: "Men's Fashion",
    subItems: [],
    isOpen: false,
  },
  {
    id: 4,
    title: "Electronics",
    subItems: [],
    isOpen: false,
  },
  {
    id: 5,
    title: "Home & Lifestyle",
    subItems: [],
    isOpen: false,
  },
  {
    id: 6,
    title: "Medicine",
    subItems: [],
    isOpen: false,
  },
  {
    id: 7,
    title: "Sports & Outdoors",
    subItems: [],
    isOpen: false,
  },
  {
    id: 8,
    title: "Baby's & Toys",
    subItems: [],
    isOpen: false,
  },
  {
    id: 9,
    id: "Groceries & Pets",
    title: "Groceries & Pets",
    subItems: [],
    isOpen: false,
  },
  {
    id: 9,
    id: "Groceries & Pets",
    title: "Groceries & Pets",
    subItems: [],
    isOpen: false,
  },
]);
</script>

<template>
  <div class="flex w-full">
    <!-- Side Menu -->
    <nav class="w-full max-h-96">
      <ul>
        <li v-for="menu in menus" :key="menu.title" class="relative group">
          <NuxtLink :to="'/category/' + menu.id">
            <div
              class="py-2 pe-2 ps-1 hover:bg-gray-200 cursor-pointer flex justify-between items-center"
              @mouseover="menu.isOpen = true"
              @mouseleave="menu.isOpen = false"
            >
              {{ menu.title }}
              <span v-if="menu.subItems.length" class="text-gray-500"
                ><svg
                  class="w-4 h-4 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m9 5 7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          </NuxtLink>
          <!-- Submenu -->
          <ul
            v-if="menu.subItems.length"
            class="md:absolute md:ps-0 ps-4 md:w-80 w-full z-30 md:left-full left-1 md:top-0 top-10 bg-white border-gray-200 md:shadow-md"
            @mouseover="menu.isOpen = true"
            @mouseleave="menu.isOpen = false"
            v-show="menu.isOpen"
          >
            <li v-for="subItem in menu.subItems" :key="subItem">
              <NuxtLink
                :to="'/category/' + subItem.id"
                class="p-2 ps-4 hover:bg-gray-200 bg-gray-100 block border-b"
              >
                {{ subItem }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style>
/* Additional styling for better visibility */
.group-hover\:visible {
  visibility: visible;
}
</style>
