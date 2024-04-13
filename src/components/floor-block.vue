<script setup>
import {inject, onMounted, defineEmits, defineProps, ref, computed } from "vue";

let elevator_inst = inject('elevator_inst');
let el = ref();

const props = defineProps(['currElevatot', 'q'])
const emits = defineEmits(['call', 'start'])
onMounted(()=>{
    emits('start', el.value)
    el.value.dataset
})

function call(event)
{
    emits('call', Number(el.value.dataset.elevatorindex),event)
}
let isBuzy = computed(() => {
    return elevator_inst.status === 'buzy' ? true : false 
})
// let isProccesing = computed(() => {
//     return elevator_inst.currentFloor === el.value.dataset ? true: false
// })

</script>

<template>
<div :data-elevatorIndex="props.currElevatot" class="floor-content" ref="el">
    <div class="floor-content__mine mine"></div>
    <div class="floor-content__holl holl">
        <div class="holl__button button-call" 
        :class="{'batton-call_caused':isBuzy}" 
        @click="call"></div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.floor-content{
    height: 150px;
    display: flex;
    border: 1px solid #000;
    .floor-content__holl{
        width: 100px;
        .holl__button{
            margin: 30px 10px;
        }
    }
    .floor-content__mine{
        width: 110px;
    }
}
.button-call{
    width: 10px;
    height: 10px;
    border: 3px solid #007a9b;
    background-color: #00c8ff;
    border-radius: 50%;
    &.batton-call_caused{ background-color:  #fffb00;}
    &.batton-call_proccesing{background-color: red;}   
    
}
.mine{background-color: rgb(197, 197, 197);position: relative;}
</style>
