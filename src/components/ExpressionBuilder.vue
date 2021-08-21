<template>

    <div class="d-flex flex-row justify-content-center">
        <div class="m-2">
            <CascadeSelect v-model="currentSymbol" :options="symbolTypes" optionLabel="symbolSubType" optionGroupLabel="type" :optionGroupChildren="['symbolSubTypes']" @change="updateExpression()" placeholder="Select symbol" style="minWidth: 14rem"></CascadeSelect>
        </div>
        <div class="d-flex flex-row justify-content-between align-items-center">
            <div v-for="(symbol, index) in expression" :key="symbol">
                <div class="mx-1 grow pointer" v-on:click="updateIndex(index)">
                    <div v-if="index == currentIndex" class="mt-3">
                        <p><mark>{{ symbol.value }}</mark></p>
                    </div>
                    <div v-else>
                        <p>{{ symbol.value }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="m-2"><Button label="Complete" v-on:click="printExpression()"/></div>
    </div>   
    
</template>

<script>

export default {
    name: "ExpressionBuilder",
    components: {
      
    },
    props: {

    },
    data() {
        return {
            expression: [
                {
                    symbolSubType: 'None',
                    value: '_'
                },
                {
                    symbolSubType: 'None',
                    value: '_'
                },
                {
                    symbolSubType: 'None',
                    value: '_'
                }
            ],
            currentIndex: 0,
            currentSymbol: null,
            symbolTypes: [
                {
                    type: 'Atom',
                    value: 'Atom',
                    symbolSubTypes: [
                        {
                            symbolSubType: 'Constant',
                            value: 'n'
                        },
                        {
                            symbolSubType: 'Variable',
                            value: 'x'
                        }
                    ]
                },
                {
                    type: 'Operation',
                    value: 'Operation',
                    symbolSubTypes: [
                        {
                            symbolSubType: 'Addition',
                            value: '+'
                        },
                        {
                            symbolSubType: 'Subtraction',
                            value: '-'
                        },
                        {
                            symbolSubType: 'Multiplication',
                            value: '*'
                        },
                        {
                            symbolSubType: 'Division',
                            value: '/'
                        },
                        {
                            symbolSubType: 'Exponent',
                            value: '^'
                        },
                        {
                            symbolSubType: 'Radical',
                            value: 'v'
                        }
                    ]
                }   
                
            ]
        };
    },
    methods: {
        updateExpression: function(){
            if (this.currentSymbol != null){
                this.expression[this.currentIndex] = this.currentSymbol;
            }
        },
        updateIndex: function(index){
            this.currentIndex = index;
            console.log(index);
        },
        isNone: function(symbol){
            if (symbol === '_'){
                return true;
            }else{
                return false;
            }
        },
        isAtomic: function(symbol){
            if (symbol === 'n' || symbol === 'x'){
                return true;
            }else{
                return false;
            }
        },
        isAtomicOrNone: function(symbol){
            return this.isNone(symbol) || this.isAtomic(symbol);
        },
        isOperation: function(symbol){
            return !this.isNone(symbol) && !this.isAtomic(symbol);
        },
        addChildren: function(){
            console.log('children added');
        },
        removeChildren: function(){
            console.log('children removed');
        },
        printExpression: function(){
            console.log(this.expression);
        }
    }
};
</script>

<style scoped>

</style>
