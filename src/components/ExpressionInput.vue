<template>

    <div class="p-d-flex p-flex-row p-jc-center p-ai-center">   

        <div class="p-mx-1">
            <InputText type="text" v-model="variableName" placeholder="Variable name" />
        </div>
        
        <i class="fas fa-equals fa-xs p-mx-1"/>

        <div class="p-mx-1">
            <InputText type="text" v-model="expression" placeholder="Expression" />
        </div>
        <div class="p-mx-1">
            <Button label="Complete" v-on:click="completeExpression()"/>
        </div>
        
        
    </div>
</template>

<script>

export default {
    name: 'ExpressionInput',
    components: {
      
    },
    props: {

    },
    data() {
        return {
            variableName: '',
            expression: ''
        }
    },
    methods: {
        completeExpression: function(){
            this.$emit('expressionCompleted', this.variableName, this.expression);
            this.variableName = '';
            this.expression = '';
        }
    },
    emits: ['expressionCompleted']
};
</script>

<style scoped>

</style>
