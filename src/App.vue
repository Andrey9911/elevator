<script setup>
import elevatorBlock from "./components/elevator-block.vue";
import floorBlock from "./components/floor-block.vue";
import { onMounted, defineEmits, defineProps, ref, computed, nextTick, watch, provide, reactive } from "vue";
import { callProcessing } from "../src/js/index";
import { walk } from "vue/compiler-sfc";
import  Elevator  from "@/js/elevator";

let movement = ref(''); //указывает направление движения
let actualPosEvel = ref() //текущий этаж
let elevator_inst = reactive(new Elevator());
let elevator_el = ref();
let queue = ref(new Map()); //очередь вызовов
let currPosY = ref();
let arrayPositionFloors = reactive({})//obj всех этажей
let curr_floor = ref(); //текущий эаж
provide('elevator_inst', elevator_inst)

onMounted(() => {
  elevator_el.value.style.top = arrayPositionFloors['5'] + 'px';
})
function start(data){
  arrayPositionFloors[data.dataset.elevatorindex] = data.offsetTop 
  
}







function call(floor, el){
    curr_floor.value = floor;
    currPosY.value = el.srcElement.parentElement.offsetTop;
    // console.log(floor_elem.value);
    
}

</script>

<template>
  <main class="main">
    <floor-block
        ref="floor_elem"
        :key="el"
         v-for="el in 5" 
         :currElevatot="el"
         @call="call"
         @start="start"
          :q="queue"/>
    <elevator-block class="main__elevator" :floor="curr_floor" 
                        :startPos="arrayPositionFloors"
                        :butPress="currPosY" 
                        :queueArr="queue"
                        ref="elevator_elem"
                        :current_pos_elevator="elevator_el"
                        @start="(el) => elevator_el = el"
                        @move="(data) => movement = data"
                        @actualPos="el => actualPosEvel = el"
                        >
      <div class="screen-content">
        {{movement}}
        {{ actualPosEvel }}
      </div>
    </elevator-block>
    <div class="q">{{ queue }}</div>
  </main>
</template>

<style scoped>


</style>
