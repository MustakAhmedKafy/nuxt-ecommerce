<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  endTime: {
    type: Date,
    required: true,
  },
  dclass: {
    type: String,
    default: 'flex flex-col items-center justify-center size-24 p-4 mb-4 bg-white rounded-full text-dark',
  },
});

const showTimer = ref(true);
const countdown = ref([
    { label: "Days", value: 5 },
  { label: "Hours", value: 59 },

  { label: "Minutes", value: 59 },
  { label: "Seconds", value: 59 },
]);

const updateCountdown = () => {
  if (!props.endTime) {
    showTimer.value = false;
    return;
  }

  const currentTime = new Date().getTime();
  const remainingTime = props.endTime.getTime() - currentTime;

  if (remainingTime <= 0) {
    showTimer.value = false;
    return;
  }

  countdown.value = [
    {
      label: "Hours",
      value: Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    },
    {
      label: "Days",
      value: Math.floor(remainingTime / (1000 * 60 * 60 * 24)),
    },
    {
      label: "Minutes",
      value: Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)),
    },
    {
      label: "Seconds",
      value: Math.floor((remainingTime % (1000 * 60)) / 1000),
    },
  ];
};

const formatTime = (value) => {
  return String(value).padStart(2, "0");
};

</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div
      v-for="(time, index) in countdown"
      :key="index"
      :class="dclass"
    >
      <span class="text-2xl font-bold">{{ formatTime(time.value) }}</span>
      <span class="text-sm">{{ time.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.word {
  color: red;
} 
</style>
