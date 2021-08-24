export async function sendGetRequest(request, object){

    try {

        const response = await fetch(request, {
            method: 'GET',
            credentials: 'same-origin'
        });

        const result = object === true ? await response.json() : await response.text();

        return result;

    } catch (error) {

        console.error(error);

    }
}

export async function sendPostRequest(request, object){

    try {

        const response = await fetch(request, {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify(object)
        });

        const result = await response.json(); // response should be an object or id or something

        return result;

    } catch (error) {

        console.error(error);

    }
}