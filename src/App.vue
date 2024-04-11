<script setup>
import elevatorBlock from "./components/elevator-block.vue";
import floorBlock from "./components/floor-block.vue";
import { onMounted, defineEmits, defineProps, ref, computed, nextTick } from "vue";
import { callProcessing } from "../src/js/index";
let floor_elem = ref();
let elevator_elem = ref();

let queue = ref(new Map()); //очередь вызовов
let curr_floor = ref(0); //текущий эаж
let currPosY = ref()



onMounted(() => {
  console.log(elevator_elem.value);
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
    <elevator-block class="main__elevator" :floor="curr_floor" 
                        :butPress="currPosY" 
                        :queueArr="queue"
                        ref="elevator_elem"
                        :current_pos_elevator="elevator_elem">
      <div class="screen">

      </div>
    </elevator-block>
  </main>
</template>

<style scoped>

</style>
