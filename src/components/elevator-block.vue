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
    elevator_inst.currentFloor = 0;
})
watch(() => elevator_inst.status, (st) => {
    let answer; 
    if(st === 'free')
    {
        // console.log('вызов обработался, лифт снова свободен');
        if(props.queueArr.size !== 0)
        
        {
            console.log('Очередь все еще есть');
            setTimeout(() => {
                answer = callProcessing(new Map([props.queueArr.entries().next().value]), props.queueArr ,elevator_inst);
                console.log(answer);
                dvij_func = dvijenie(answer.positin);
                dvij_func();
            },3000)
            
        }
        
    }
})

watch(() => props.butPress, (num) => {
    let answer; 
    let Floor_Position = new Map();
    Floor_Position.set(props.floor, num) 
    // console.log(`ВЫЗОВ НА ФАЙЛ: ELEVATOR-BLOCK.VUE - FLOOR =  ${props.floor}`);
    answer = callProcessing(Floor_Position, props.queueArr,elevator_inst);
    // console.log(`ВЫЗОВ НА ФАЙЛ: ELEVATOR-BLOCK.VUE - answer call =  ${answer}`);
    if(answer.isBuzy === false)
    {
        // console.log('elevator free for call, becaus quere not');
        dvij_func = dvijenie(answer.positin);
        dvij_func(answer.positin);
         
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
        movement.value = '^'
        emits('move', movement.value);
        return function(){
            if(n === num || n < num + 10)
            {
                elevator_inst.pos = num; //после обработки вызова, мы освобождаем его 
                elevator_inst.status = 'free';
                return
            } 
            console.log(`Object.values(props.startPos) ${n}`);
            emits('actualPos', Object.values(props.startPos).indexOf(n) + 1)
            n -= 150;
            elevatorEl.value.style.top = n +'px';
            setTimeout(() => {dvij_func()},1000) //каждую сек. лифт делает движение
        }
    }
    else if(n < num)
    {
        movement.value = 'v'
        emits('move', movement.value)
        return async function(){
            if(n === num || n > num - 10)
            {
                elevator_inst.pos = num;
                
                    elevator_inst.status = 'free'
                    return 
            } 
            n += 150;
            elevatorEl.value.style.top = n +'px';
            setTimeout(() => {dvij_func()},1000)
        }
        
    }
    
}


</script>

<template>
    <div class="elevator-content" ref="elevatorEl">
        <div class="elevator-content__tablo screen">
            <slot></slot>
        </div>
        
    </div>
</template>

<style scoped lang="scss">
.elevator-content{
    transition: all ease-in-out .5s;
    position: absolute;
    background-color: red;
    width: 100px;
    height: 150px;
}
.screen{
    margin: 10px;
    padding: 5px 0;
    background-color: black;
    border: 3px solid grey;
    width: 50px;
    height: 30px;
    color: rgb(0, 255, 42);
    text-align: center;
    font-weight: 600;
    font-size: 2em;
    box-sizing: border-box;
    .screen-content{
        height: fit-content;
    }
}
</style>
