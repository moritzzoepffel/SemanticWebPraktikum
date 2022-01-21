const jsonld = require("jsonld");

run();

async function run() {
    const url = "http://www.omdbapi.com/?apikey=faeed64f&t=Goldfinger";
    console.log(url)
    let response = await fetch(url)
        .then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        });

    response["@context"] = "https://schema.org/";
    let res = JSON.stringify(response).toString();
    console.log(res)
    console.log(response);
    const quads = await jsonld.toRDF(response, {format: 'application/n-quads'});
    console.log(quads);
}
