<template>
  {{ id }}
  <router-link to="/passData"> 测试传值 </router-link>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
const id = route.params.id;
</script>