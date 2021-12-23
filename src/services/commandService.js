import * as dataService from './dataService';

import { endpoints } from '../config/apiEndpointConfig';

export async function sumLikeTerms(expression){

    // var url = 'https://localhost:8000/command/sumliketerms/' + expression;

    // return await dataService.sendGetRequest(url, false);

    return await dataService.sendPostRequest(endpoints.sumliketerms, getApiRequest(expression));
}

export async function distribute(expression){

    return await dataService.sendPostRequest(endpoints.distribute, getApiRequest(expression));
}

export async function cancel(expression){

    return await dataService.sendPostRequest(endpoints.cancel, getApiRequest(expression));
}

export async function factor(expression){

    return await dataService.sendPostRequest(endpoints.factor, getApiRequest(expression));
}

export async function evaluateConstants(expression){

    return await dataService.sendPostRequest(endpoints.evaluateConstants, getApiRequest(expression));
}

export async function applyExponentIdentities(expression){

    return await dataService.sendPostRequest(endpoints.applyExponentIdentities, getApiRequest(expression));
}

export async function applyAlgebraicIdentities(expression){

    return await dataService.sendPostRequest(endpoints.applyAlgebraicIdentities, getApiRequest(expression));
}

export async function isEqual(expression, other){

    var url = 'https://localhost:5001/command/isequal/' + expression + '/' + other;

    return await dataService.sendGetRequest(url, false);
}

export async function isEqualByBase(expression, other){

    var url = 'https://localhost:5001/command/isequalbybase/' + expression + '/' + other;

    return await dataService.sendGetRequest(url, false);
}

function getApiRequest(expression) {

    return {

        "expression": expression
    }
}
