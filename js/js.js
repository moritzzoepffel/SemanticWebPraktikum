const jsonld = require('jsonld');
const axios = require('axios');

var quads;
var turtle;
var rdfXml;
var svg;

//TODO https://github.com/digitalbazaar/jsonld.js Dropdown with different view options
//TODO Build SVG in external python file/javascript
//TODO https://github.com/dherault/semantic-graphql#resolvers
//TODO https://issemantic.net/rdf-visualizer
//TODO https://www.easyrdf.org/docs/rdf-formats-json
//TODO https://www.ldf.fi/service/rdf-grapher
//TODO https://json-ld.org/playground/
//TODO https://github.com/alangrafu/visualRDF


document.getElementById('form1').onsubmit = async function (e) {
    e.preventDefault();
    await getMovie();
};


document.getElementById('btn1').addEventListener("click", async function (e) {
    await getMovie();
});

var collection = document.getElementsByClassName("tablinks");
for (let i = 0; i < collection.length; i++) {
    console.log(collection[i])
    collection[i].addEventListener("click", async function (e) {
        await renewElements();
    });
}

function showSpinner() {
    var spinnerString = "<div class=\"d-flex justify-content-center\">\n" +
        "<div class=\"spinner-border\" role=\"status\" style=\"display: block\">\n" +
        "<span class=\"visually-hidden\"></span>\n" +
        "</div>";
    document.getElementById('n-quads_container').innerHTML = spinnerString;
    document.getElementById('turtle_container').innerHTML = spinnerString;
    document.getElementById('rdf_container').innerHTML = spinnerString;
    document.getElementById('visual_container').innerHTML = spinnerString;
}

async function getMovie() {
    svg = undefined;
    showSpinner();
    const filmTitle = document.getElementById('filmName').value;
    if (filmTitle == "") {
        document.getElementById('n-quads_container').innerHTML = "Please type in a Movie Name";
        document.getElementById('turtle_container').innerHTML = "Please type in a Movie Name";
        document.getElementById('rdf_container').innerHTML = "Please type in a Movie Name";
        document.getElementById('visual_container').innerHTML = "Please type in a Movie Name";
        return;
    }

    quads = await getQuads(filmTitle);

    document.getElementById('n-quads_container').innerHTML = "<p style=\"white-space: pre-wrap\">" + quads + "</p>";

    await axios.get('http://127.0.0.1:8080/' + filmTitle)
        .then(res => {
            console.log(`statusCode: ${res.status}`)
            console.log(res)
            rdfXml = res.data.xml
            turtle = res.data.turtle
            svg = res.data.svg;
            console.log(quads)
            console.log(rdfXml)
            console.log(turtle)
            console.log(svg)
        })
        .catch(error => {
            console.error(error)
        })

    // document.getElementById('graph_scatter_1').innerHTML = svg;
}

async function renewElements() {
    if (svg != undefined) {
        document.getElementById('n-quads_container').innerHTML = "<p style=\"white-space: pre-wrap\">" + quads + "</p>";
        document.getElementById('turtle_container').innerHTML = "<p style=\"white-space: pre-wrap\">" + turtle + "</p>";
        document.getElementById('rdf_container').innerHTML = "<textarea cols=\"80\" rows=\"20\" style=\"resize: none; border: none\">" + rdfXml + "</textarea>";
        document.getElementById('visual_container').innerHTML = svg;
    }
}

//gets JSON from imdb and converts it to quads
async function getQuads(filmTitle) {
    const url = "http://www.omdbapi.com/?apikey=faeed64f&t=" + filmTitle;
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

    quads = await jsonld.toRDF(response, {format: 'application/n-quads'});
    quads = format_quads(quads, filmTitle);
    return quads;
}

//is used in getQuads(filmTitle)
function format_quads(text, filmTitle) {
    text = text.replace(/_:b0/gi, '&lt;' + "http://schema.org/Movie" + '&gt;');
    text = text.replace(/</gi, '&lt;');
    text = text.replace(/>/gi, '&gt;');
    return text;
}

