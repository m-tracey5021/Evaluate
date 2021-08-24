import * as dataService from './dataService';

export async function distribute(expression){

    var url = 'https://localhost:5001/manipulation/distribute/' + expression;

    return await dataService.sendGetRequest(url, false);
}

export async function sumLikeTerms(expression){

    var url = 'https://localhost:5001/manipulation/sumliketerms/' + expression;

    return await dataService.sendGetRequest(url, false);
}

