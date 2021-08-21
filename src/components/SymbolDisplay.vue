<template>

    <div class="mx-1">
        {{ symbolData }}
    </div>  
    
</template>

<script>

export default {
    name: "ExpressionBuilder",
    components: {
        
    },
    props: {
        symbol: {
            type: String,
            default: '_'
        }
    },
    data() {
        return {
            symbolData: symbol
        }
    },
    methods: {

    }
};
</script>

<style scoped>

</style>
