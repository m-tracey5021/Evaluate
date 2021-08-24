import * as dataService from './dataService';

export function save(expressions){

    var url = ''; // url for saving to db on api end

    expressions.foreach (expression => {

        dataService.sendPostRequest(url, expression);

    });
}