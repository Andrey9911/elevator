<script setup>
import { callProcessing } from "@/js";
import  Elevator  from "@/js/elevator";
import { onMounted, defineEmits, defineProps, ref, watch, reactive, inject } from "vue";
let elevator_inst = inject('elevator_inst');
let elevatorEl = ref()
let dvij_func; //переменная для ф-ии
let movement = ref('')

const props = defineProps(['butPress', 'queueArr', 'floor','elevator_elem', 'current_pos_elevator','startPos'])
const emits = defineEmits(['start', 'move'])
onMounted(() => {
    emits('start', elevatorEl.value);
    elevator_inst.pos = props.startPos['5'];
    elevator_inst.status = 'free';
    elevator_inst.currentFloor = 1;
})
watch(() => elevator_inst.status, (st) => {
    let answer; 
    if(st === 'free')
    {
        console.log('вызов обработался, лифт снова свободен');
        if(props.queueArr.size !== 0)
        
        {
            while(props.queueArr.size !== 0)
            {
                console.log('Очередь все еще есть');
                try {
                    answer = callProcessing(new Map([props.queueArr.entries().next().value]), props.queueArr ,elevator_inst);
                } catch (TypeError) {
                    // console.log(props.queueArr.entries().next().value);
                }
                
                dvij_func = dvijenie(answer.positin);
                dvij_func();
            }
        }
        
    }
})

watch(() => props.butPress, (num) => {
    let answer; 
    let Floor_Position = new Map();
    Floor_Position.set(props.floor, num) 
    answer = callProcessing(Floor_Position, props.queueArr,elevator_inst);
    console.log(answer);
    if(answer.isBuzy === false)
    {
        // console.log('elevator free for call, becaus quere not');
        dvij_func = dvijenie(answer.positin);
        dvij_func(answer.positin);
        emits('move', movement.value)
         
    }
    else {
        console.log('elevator buzy, becaus quere yes');
    }
    
    
})
function dvijenie(num)
{
    console.log(`Вызов лифта на ${elevator_inst.currentFloor} этаж на ${num} коордиинату, очередь ${props.queueArr.size === 0 ? 'пуста': props.queueArr.size} `);
    let n = elevator_inst.pos; //позиция лифта
    if(n > num){
        movement.value = 'вниз'
        return function(){
            if(n === num || n < num + 10)
            {
                console.log(`n ${n < num ? '<' : '>'} num`);
                setTimeout(() => {
                    elevator_inst.status = 'free'
                    return 
                },3000)
                elevator_inst.pos = num;
                return 
            } 
            n -= 150;
            elevatorEl.value.style.top = n +'px';
            setTimeout(() => {dvij_func()},1000)
        }
    }
    else if(n < num)
    {
        movement.value = 'вверх'
        emits('move', movement.value)
        console.log(1);
        return function(){
            if(n === num || n > num - 10)
            {
                console.log(3);
                elevator_inst.pos = num;
                    elevator_inst.status = 'free'
                     
                console.log(`n ${n > num ? '>' : '<'} num`);
                return
            } 
            console.log(2);
            n += 150;
            elevatorEl.value.style.top = n +'px';
            setTimeout(() => {dvij_func()},1000)
        }
        
    }
    
}


</script>

<template>
    <div class="elevator-content" ref="elevatorEl">
        <slot class="elevator-content__tablo screen"></slot>
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
.screen{
    background-color: black;
    border: 3px solid grey;
    width: 50px;
    height: 30px;
    color: blue;
}
</style>
