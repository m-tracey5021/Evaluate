import * as dataService from './dataService';

export async function sumLikeTerms(expression){

    var url = 'https://localhost:5001/command/sumliketerms/' + expression;

    return await dataService.sendGetRequest(url, false);
}

export async function distribute(expression){

    var url = 'https://localhost:5001/command/distribute/' + expression;

    return await dataService.sendGetRequest(url, false);
}

export async function cancel(expression){

    var url = 'https://localhost:5001/command/cancel/' + expression;

    return await dataService.sendGetRequest(url, false);
}

export async function evaluateConstants(expression){

    var url = 'https://localhost:5001/command/evaluateconstants/' + expression;

    return await dataService.sendGetRequest(url, false);
}

export async function applyExponentRules(expression){

    var url = 'https://localhost:5001/command/applyexponentrules/' + expression;

    return await dataService.sendGetRequest(url, false);
}

export async function applyExponentRuleOne(expression){

    var url = 'https://localhost:5001/command/er1/' + expression;

    return await dataService.sendGetRequest(url, false);
}

export async function applyExponentRuleTwo(expression){

    var url = 'https://localhost:5001/command/er2/' + expression;

    return await dataService.sendGetRequest(url, false);
}

export async function applyExponentRuleThree(expression){

    var url = 'https://localhost:5001/command/er3/' + expression;

    return await dataService.sendGetRequest(url, false);
}

export async function applyExponentRuleFour(expression){

    var url = 'https://localhost:5001/command/er4/' + expression;

    return await dataService.sendGetRequest(url, false);
}

export async function applyExponentRuleFive(expression){

    var url = 'https://localhost:5001/command/er5/' + expression;

    return await dataService.sendGetRequest(url, false);
}

export async function applyExponentRuleSix(expression){

    var url = 'https://localhost:5001/command/er6/' + expression;

    return await dataService.sendGetRequest(url, false);
}

export async function isEqual(expression, other){

    var url = 'https://localhost:5001/command/isequal/' + expression + '/' + other;

    return await dataService.sendGetRequest(url, false);
}

export async function isEqualByBase(expression, other){

    var url = 'https://localhost:5001/command/isequalbybase/' + expression + '/' + other;

    return await dataService.sendGetRequest(url, false);
}
