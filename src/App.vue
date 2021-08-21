<template>
    <div class="d-flex flex-row justify-content-center mt-5">
        <ExpressionBuilder/>
    </div>
    
    
    
    
</template>

<script>

import ExpressionBuilder from './components/ExpressionBuilder.vue';

export default {
    name: "App",
    components: {
        ExpressionBuilder
    },
    data() {
        return {
            checked: true,
            value1: true,
        };
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
