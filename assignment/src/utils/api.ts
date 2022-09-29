
// Request Generator
function request(URL : string, method: string, headers: {}, body?:any, formData?:any) {
    return fetch(
        URL,
        {
            method,
            headers,
            body: body !== null ? JSON.stringify(body) : formData,
        },
    );
}

//Get products API call

export async function getProducts() {
    let URL = 'https://my-json-server.typicode.com/benirvingplt/products/products';
    const headers = {
        'Content-Type': 'application/json',
        'x-requested-with': 'XMLHttpRequest',
    };
    return request(URL, 'GET', headers, null);
}