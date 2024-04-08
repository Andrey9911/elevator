<script setup>
import elevatorBlock from "./components/elevator-block.vue";
import floorBlock from "./components/floor-block.vue";
import { onMounted, defineEmits, defineProps, ref, computed, nextTick } from "vue";
import { callProcessing } from "../src/js/index";
let floor_elem = ref([])
let arrayFloorPosition = []
let queue = ref([]); //очередь вызовов
let curr_floor = ref(0); //текущий эаж
let currPosY = ref(100)

//концепция
// curr_floor = {
//   title: 0,
//   posY: 101
// }


onMounted(() => {
  console.log(floor_elem);
    floor_elem.value.forEach(element => {
        arrayFloorPosition.push(element)
    });
    console.log(arrayFloorPosition[0]);
})




function call(floor, el){
    
    curr_floor.value = floor;
    currPosY.value = el.srcElement.parentElement.offsetTop;
    console.log(el.srcElement.parentElement.offsetTop, curr_floor.value);
}

</script>

<template>
  <main class="main">
    <floor-block
        ref="floor_elem"
        :key="el"
         v-for="el in 5" 
         :currElevatot="el"
         @call="call"/>
    <elevator-block class="main__elevator" :butPress="currPosY">
      <div class="screen">

      </div>
    </elevator-block>
  </main>
</template>

<style scoped>

</style>
