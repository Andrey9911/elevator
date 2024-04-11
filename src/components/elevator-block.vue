<script setup>
import { callProcessing } from "@/js";
import  Elevator  from "@/js/elevator";
import { onMounted, defineEmits, defineProps, ref, watch, reactive } from "vue";
let elevator_inst = reactive(new Elevator(1, 'free', 1,));
let elevatorEl = ref()
let curr_floor;
let Floor_Position = new Map();
const props = defineProps(['butPress', 'queueArr', 'floor','elevator_elem'])
console.log(elevator_inst.name);


onMounted(() => {
    elevatorEl.value.style.top = props.butPress + 'px';
    elevator_inst.status = 'free';
    console.log(props.elevator_elem);
    
})
let dvij_func;
watch(() => props.butPress, (num) => {
    Floor_Position.set(props.floor, num) 
    curr_floor = callProcessing(Floor_Position, props.queueArr,elevator_inst);
    dvij_func = dvijenie(curr_floor)
    dvij_func();
    
})

function dvijenie(num)
{
    let n = window.innerHeight;
    return function(){
        console.log(`n = ${n}, num = ${num}`);
        if(n === num || n < num) return
        n -= 150;
        elevatorEl.value.style.top = n +'px';
        setTimeout(() => {dvij_func()},1000)
    }
    
    
    // for(let n = ; n < num; n++)
    // {
    //     Promise((resolve) => setTimeout(() =>{resolve()},1000))
    // }
}


</script>

<template>
    <div class="elevator-content" ref="elevatorEl">
        <slot class="elevator-content__tablo"></slot>
    </div>
</template>

<style scoped>
.elevator-content{
    transition: all ease-in-out .5s;
    position: absolute;
    background-color: red;
    width: 100px;
    height: 150px;
}
</style>
