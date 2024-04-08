<script setup>
import { Elevator } from "@/js/elevator";
import { onMounted, defineEmits, defineProps, ref, watch } from "vue";
let elevator_inst = new Elevator(1, 'free', 1, 110);
let elevatorEl = ref()
const props = defineProps(['butPress'])
console.log(elevator_inst.name);

onMounted(() => {
    elevatorEl.value.style.top = props.butPress + 'px'
    
})
watch(() => props.butPress, (num) => {
    console.log('e');
    elevatorEl.value.style.top = num + 'px'
})


</script>

<template>
    <div class="elevator-content" ref="elevatorEl">
        <slot class="elevator-content__tablo"></slot>
    </div>
</template>

<style scoped>
.elevator-content{
    position: absolute;
    background-color: red;
    width: 100px;
    height: 150px;
}
</style>
