<template>
    <div class="p-d-flex p-flex-column p-jc-center p-ai-start">
        <div class="p-my-2">
            <ExpressionInput @expressionCompleted="addExpression"/>
        </div>
        <div class="p-my-2">
            <Panel header="Expressions" style="min-width:1000px">
                <template #icons>
                    <button class="p-panel-header-icon p-link p-mr-3" @click="openPanelMenu">
                        <span class="pi pi-cog"></span>
                    </button>
                    <Menu id="config-menu" ref="panelMenu" :model="panelMenu" :popup="true" />
                </template>
                
                <DataTable :value="expressions" class="p-datatable-lg" responsiveLayout="scroll">
                    <Column field="id" header="Id" style="width:15%"></Column>
                    <Column field="name" header="Name" style="width:35%"></Column>
                        <template #body="{data}">
                            <div class="grow pointer" @click="openEditOverlay($event, 'nameOp' + data.id, data.name, 'name')">
                                {{ data.name }}
                            </div>
                            <OverlayPanel :ref="'nameOp' + data.id" :dismissable="true" :style="{width: '450px'}">
                                <div class="p-d-flex p-flex-row p-jc-between">
                                    <InputText type="text" v-model="nameEdit"/>
                                    <Button label="Complete" @click="completeEdit(data.id, 'type'); closeEditOverlay($event, 'nameOp' + data.id)" :disabled="nameEditError"/>
                                </div>
                            </OverlayPanel>
                        </template>
                    <Column field="expression" header="Expression" style="width:50%">
                        <template #body="{data}">
                            <div class="p-d-flex p-flex-row p-jc-between">
                                <div class="grow pointer" @click="openEditOverlay($event, 'expressionOp' + data.id, data.expression, 'expression')">
                                    {{ data.expression }}
                                </div>
                                <div>
                                    <div class="p-ml-2">
                                        <button :id="'expression-button-' + data.id" class="p-panel-header-icon p-link p-mr-2" @click="openExpressionMenu($event, 'expressionMenu' + data.id, data.id)">
                                            <i class="fas fa-angle-right"></i>
                                        </button>
                                    </div>
                                    <TieredMenu :id="'expression-menu-' + data.id" :ref="'expressionMenu' + data.id" :model="expressionMenu" :popup="true" />
                                </div>
                            </div>
                            <OverlayPanel :ref="'expressionOp' + data.id" :dismissable="true" :style="{width: '450px'}">
                                <div class="p-d-flex p-flex-row p-jc-between">
                                    <InputText type="text" v-model="expressionEdit"/>
                                    <Button label="Complete" @click="completeEdit(data.id, 'expression'); closeEditOverlay($event, 'expressionOp' + data.id)" :disabled="expressionEditError"/>
                                </div>
                            </OverlayPanel>
                        </template>
                    </Column>
                </DataTable>
            </Panel>
        </div>
    </div>
    
    

</template>

<script>

import * as commandService from '../services/commandService';
import * as expressionService from '../services/expressionService';

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
            expressionSelected: null,
            expressionEdit: '',
            nameEdit: '',
            panelMenu: [
                {
                    label: 'Options',
                    items: [{label: 'Save', icon: 'far fa-save fa-xs', command:() => { this.saveExpressions() } },
                            {label: 'Load', icon: 'fas fa-level-down-alt fa-xs', command:() => { this.getAllExpressions() } },
                            {label: 'Reset', icon: 'fas fa-undo fa-xs', command:() => { this.resetExpressions() } }]
                            
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
                        { label: 'Cancel', command:() => { this.cancel(); } },
                        { label: 'Factor', command:() => { this.factor(); } },
                        { label: 'Simplify', command:() => { console.log('Simplify'); } }
                    ]
                },
                {
                    label: 'Evaluate',
                    icon: 'fas fa-check fa-xs',
                    items: [
                        { label: 'Solve for { ... }', command:() => { console.log('Open modal'); } },
                        { label: 'Substitute with { ... }', command:() => { console.log('Open modal'); } },
                        { label: 'Add to { ... }', command:() => { console.log('Open modal'); } },
                        { label: 'Evaluate Constants', command:() => { this.evaluateConstants(); } }  
                    ]
                },
                {
                    label: 'Compare and Apply',
                    icon: 'fas fa-exchange-alt fa-xs',
                    items: [
                        { label: 'Apply Exponent Rules', command:() => { this.applyExponentRules() } } 
                    ]
                },
                {
                    separator: true
                },
                {
                    label: 'Remove',
                    icon: 'far fa-trash-alt fa-xs',
                    command:() => { this.removeSelectedExpression(); }
                }
            ]
        }
    },
    methods: {
        openPanelMenu(event) {
            this.$refs.panelMenu.toggle(event);
        },
        openExpressionMenu(event, menuId, expressionId) {
            this.expressionSelected = this.selectExpression(expressionId);
            this.$refs[menuId].toggle(event);
        },
        openEditOverlay: function(event, id, edit, type){
            if (type === 'name'){
                this.nameEdit = edit;
            }else if (type === 'expression'){
                this.expressionEdit = edit;
            }
            this.$refs[id].toggle(event);
        },
        closeEditOverlay: function(event, id){
            this.expressionEdit = '';
            this.$refs[id].toggle(event);
        },
        completeEdit: function(id, type){
            var expression = this.selectExpression(id);
            if (type === 'name'){
                expression.name = this.nameEdit;
            }else if (type === 'expression'){
                expression.expression = this.expressionEdit;
            }
        },
        addExpression: function(variableName, expression){
            this.expressions.push(
                {
                    'id': 0,
                    'name': variableName,
                    'expression': expression,
                    'formatted': this.formatExpression(expression)
                }
            );
            
        },
        formatExpression: function(expression){
            return 'Formatted ' + expression;
        },
        selectExpression: function(id){
            return this.expressions.find(expression => expression.id === id);
        },
        removeSelectedExpression: function(){
            var index = this.expressions.indexOf(this.selectExpression);
            if (index > -1) {
                this.expressions.splice(index, 1);
            }
        },
        sumLikeTerms: async function(){
            var result = await commandService.sumLikeTerms(this.expressionSelected.expression);
            this.expressions.push(this.mapCommandResultToExpression(this.expressionSelected.expression, 'Sum Like Terms', result));
        },
        distribute: async function(){
            var result = await commandService.distribute(this.expressionSelected.expression);
            this.expressions.push(this.mapCommandResultToExpression(this.expressionSelected.expression, 'Distribute', result));
        },
        cancel: async function(){
            var result = await commandService.cancel(this.expressionSelected.expression);
            this.expressions.push(this.mapCommandResultToExpression(this.expressionSelected.expression, 'Cancel', result));
        },
        factor: async function(){
            var result = await commandService.factor(this.expressionSelected.expression);
            this.expressions.push(this.mapCommandResultToExpression(this.expressionSelected.expression, 'Factor', result));
        },
        evaluateConstants: async function(){
            var result = await commandService.evaluateConstants(this.expressionSelected.expression);
            this.expressions.push(this.mapCommandResultToExpression(this.expressionSelected.expression, 'Evaluate Constants', result));
        },
        applyExponentRules: async function(){
            var results = JSON.parse(await commandService.applyExponentRules(this.expressionSelected.expression));
            results.forEach(result => {
                this.expressions.push(this.mapCommandResultToExpression(this.expressionSelected.expression, 'Apply Exponent Rules', result));
            });
        },
        isEqual: async function(){

        },
        isEqualByBase: async function(){

        },
        resetExpressions: function(){
            this.expressions = [];
        },
        getExpression: async function(){
            var result = await expressionService.getExpressionById(1, 1);
            var expressionToAdd = this.mapDboToExpression(result);
            this.expressions.push(expressionToAdd);
        },
        getAllExpressions: async function(){
            var userExpressions = JSON.parse(await expressionService.getAllExpressionsByUser(1));
            userExpressions.forEach(result => {
                var expressionToAdd = this.mapDboToExpression(result);
                this.expressions.push(expressionToAdd);
            });
            
        },
        saveExpressions: function(){
            this.expressions.forEach(expression => {
                var toSave = this.mapToDbo(expression);
                expressionService.saveExpression(toSave);
            });            
        },
        mapToDbo: function(expression){
            var toSave = {
                'id': expression.id,
                'userId': 1,
                'expression': expression.expression,
                'expressionName': expression.name
            };
            return toSave;
        },
        mapDboToExpression: function(result){ // result is returned as a dbo
            var expression = {
                'id': result.id,
                'name': result.expressionName,
                'expression': result.expression,
                'formatted': this.formatExpression(result.expression)
            };
            return expression;
        },
        mapCommandResultToExpression: function(command, original, result){ // result is returned as a string
            var expression = {
                'id': 0,
                'name': command + ': ' + original + ' => ' + result,
                'expression': result,
                'formatted': this.formatExpression(result)
            };
            return expression;
        }
    },
    emits: [],
    computed: {
        nameEditError: function(){
            if (this.nameEdit == ''){
                return true;
            }else{
                return false;
            }
        },
        expressionEditError: function(){
            if (this.expressionEdit == ''){
                return true;
            }else{
                return false;
            }
        }
    }
}

</script>

<style scoped>

</style>
