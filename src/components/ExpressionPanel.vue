<template>
    <div class="p-d-flex p-flex-column p-jc-center p-ai-start">
        <div class="p-my-2">
            <ExpressionInput @expressionCompleted="addExpression"/>
        </div>
        <div class="p-my-2">
            <Panel header="Expressions" style="min-width:800px">
                <template #icons>
                    <button class="p-panel-header-icon p-link p-mr-2" @click="openPanelMenu">
                        <span class="pi pi-cog"></span>
                    </button>
                    <Menu id="config-menu" ref="panelMenu" :model="panelMenu" :popup="true" />
                </template>
                <div class="p-d-flex p-flex-column p-jc-center p-ai-center">
                    <div v-for="(expression, index) in expressions" :key="expression" class="p-my-2">
                        <div class="p-d-flex p-flex-row p-jc-between" style="min-width:700px">
                            <div>
                                {{ 'Name: ' + expression.name }}
                            </div>
                            <div class="p-d-flex p-flex-row p-jc-between">
                                <div>
                                    {{ 'Expression: ' + expression.expression }}
                                </div>
                                <div>
                                    <div class="p-ml-2">
                                        <button :id="'expression-button-' + index" class="p-panel-header-icon p-link p-mr-2" @click="openExpressionMenu($event, 'expressionMenu' + index)">
                                            <i class="fas fa-angle-right"></i>
                                        </button>
                                    </div>
                                    <TieredMenu :id="'expression-menu-' + index" :ref="'expressionMenu' + index" :model="expressionMenu" :popup="true" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Panel>
        </div>
    </div>
    
    

</template>

<script>

import * as manipulationService from '../services/manipulationService';
import * as fileService from '../services/fileService';

import ExpressionInput from './ExpressionInput.vue';

export default {
    name: 'ExpressionPanel',
    components: {
        ExpressionInput
    },
    props: {
    
    },
    data() {
        return {
            expressions: [],
            panelMenu: [
                {
                    label: 'Options',
                    items: [{label: 'Reset', icon: 'fas fa-undo fa-xs', command:() => { this.resetExpressions() } },
                            {label: 'Save', icon: 'far fa-save fa-xs', command:() => { this.saveExpressions() } }]
                },
                {
                    label: 'Format',
                    items: [{label: 'Raw', command:() => { console.log('Cancel'); } },
                            {label: 'Pretty', command:() => { console.log('Cancel'); } } ]
                }
            ],
            expressionMenu: [
                {
                    label: 'Manipulate',
                    icon: 'fas fa-random fa-xs',
                    items: [
                        { label: 'Sum Like Terms', command:() => { this.sumLikeTerms(); } },
                        { label: 'Distribute', command:() => { this.distribute(); } },
                        { label: 'Cancel', command:() => { console.log('Cancel'); } },
                        { label: 'Factor', command:() => { console.log('Factor'); } },
                        { label: 'Simplify', command:() => { console.log('Simplify'); } }
                    ]
                },
                {
                    label: 'Evaluate',
                    icon: 'fas fa-check fa-xs',
                    items: [
                        { label: 'Solve for { ... }', command:() => { console.log('Open modal'); } },
                        { label: 'Substitute with { ... }', command:() => { console.log('Open modal'); } },
                        { label: 'Add to { ... }', command:() => { console.log('Open modal'); } } 
                    ]
                }
            ]
        }
    },
    methods: {
        openPanelMenu(event) {
            this.$refs.panelMenu.toggle(event);
        },
        openExpressionMenu(event, id) {
            console.log(id);
            this.$refs[id].toggle(event);
        },
        addExpression: function(variableName, expression){
            this.expressions.push(
                {
                    'name': variableName,
                    'expression': expression,
                    'formatted': this.formatExpression(expression)
                }
            )
        },
        formatExpression: function(expression){
            return 'Formatted ' + expression;
        },
        sumLikeTerms: async function(){
            for (var i = 0; i < this.expressions.length; i ++){
                this.expressions[i].expression = await manipulationService.sumLikeTerms(this.expressions[i].expression);
                console.log(this.expressions[i].expression);
            }
        },
        distribute: async function(){
            for (var i = 0; i < this.expressions.length; i ++){
                this.expressions[i].expression = await manipulationService.distribute(this.expressions[i].expression);
                console.log(this.expressions[i].expression);
            }
        },
        resetExpressions: function(){
            this.expressions = [];
        },
        saveExpressions: function(){
            fileService.save(this.expressions);
        }
    }
}

</script>

<style scoped>

</style>
