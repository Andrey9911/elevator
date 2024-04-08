<script setup>
import elevatorBlock from "./components/elevator-block.vue";
import floorBlock from "./components/floor-block.vue";
let queue = []; //очередь вызовов
let curr_floor; //текущий эаж

</script>

<template>
  <main class="main">
    <floor-block :key="el" v-for="el in 5"/>
    <elevator-block class="main__elevator">
      <div class="screen">

      </div>
    </elevator-block>
  </main>
</template>

<style scoped>

</style>
