const jsonld = require('jsonld');



document.getElementById('btn1').addEventListener("click", async function () {
    const filmTitle = document.getElementById('filmName').value;
    if (filmTitle == "") {
        document.getElementById('n-quads_container').innerHTML = "Please type in a Movie Name";
        document.getElementById('graph_scatter_1').innerHTML = "Please type in a Movie Name";
        return;
    }
    const url = "http://www.omdbapi.com/?apikey=faeed64f&t=" + filmTitle;
    console.log(url)
    let response = await fetch(url)
        .then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
                console.log("ManOhMan")
            }
            return response.json();
        });

    response["@context"] = "https://schema.org/";
    let res = JSON.stringify(response).toString();
    console.log(res)
    console.log(response);
    const quads = await jsonld.toRDF(response, {format: 'application/n-quads'});
    document.getElementById('n-quads_container').innerHTML = quads;
    d3.json(res, (err, data) => {
        console.log("Hier bims ich")
        if (err) return console.warn(err);
        d3.jsonldvis(data, 'graph_scatter_global_2', {w: 800, h: 600, maxLabelWidth: 250});
    });

});

