import * as dataService from './dataService';

export async function getExpressionById(userId, id){

    var url = 'https://localhost:5001/expression/' + userId + '/' + id;

    return await dataService.sendGetRequest(url);
}

export async function getAllExpressionsByUser(userId){

    var url = 'https://localhost:5001/expression/' + userId;

    return await dataService.sendGetRequest(url);
}

export function saveExpression(expression){

    var url = 'https://localhost:5001/expression/save'; // url for saving to db on api end

    dataService.sendPostRequest(url, expression);
}

export function saveExpressions(expressions){

    var url = 'https://localhost:5001/expression/save'; // url for saving to db on api end

    expressions.foreach (expression => {

        dataService.sendPostRequest(url, expression);

    });
}