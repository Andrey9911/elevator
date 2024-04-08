<script setup>

</script>

<template>
<div class="floor-content">
    <div class="floor-content__mine mine"></div>
    <div class="floor-content__holl holl">
        <div class="holl__button button-call" @click="call"></div>
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
    .batton-call_caused{
        border: 3px solid #fffb00;
    }
}
.mine{background-color: rgb(197, 197, 197);}
</style>
