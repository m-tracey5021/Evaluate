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
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(object),
        });
        console.log(result);
        const result = await response.json();
        console.log(result);

        return result;

    } catch (error) {

        console.error(error);

    }
}