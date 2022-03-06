const jsonld = require('jsonld');
const { getInitialContext } = require('jsonld/lib/context');

//const puppeteer = require('puppeteer')
//const {spawn} = require('child_process');
const axios = require('axios');

var quads;
var turtle;
var rdfXml;

//TODO https://github.com/digitalbazaar/jsonld.js Dropdown with different view options
//TODO Build SVG in external python file/javascript
//TODO https://github.com/dherault/semantic-graphql#resolvers
//TODO https://issemantic.net/rdf-visualizer
//TODO https://www.easyrdf.org/docs/rdf-formats-json
//TODO https://www.ldf.fi/service/rdf-grapher
//TODO https://json-ld.org/playground/
//TODO https://github.com/alangrafu/visualRDF


document.getElementById('btn1').addEventListener("click", async function () {
    console.log("Button was pressed.");
    getMovie();
});


document.getElementById('form1').onsubmit = function (e) {
    e.preventDefault();
    getMovie();
}


async function getMovie() {
    const filmTitle = document.getElementById('filmName').value;
    if (filmTitle == "") {
        document.getElementById('n-quads_container').innerHTML = "Please type in a Movie Name";
        document.getElementById('graph_scatter_1').innerHTML = "Please type in a Movie Name";
        return;
    }

    quads = await getQuads(filmTitle);
    
    axios.get('http://127.0.0.1:8080/' + filmTitle)
        .then(res => {
            console.log(`statusCode: ${res.status}`)
            console.log(res)
            rdfXml = res.data.xml
            turtle = res.data.turtle
            console.log(quads)
            console.log(rdfXml)
            console.log(turtle)
        })
        .catch(error => {
            console.error(error)
        })
 
    document.getElementById('n-quads_container').innerHTML = "<p style=\"white-space: pre-wrap\">" + quads + "</p>";
    d3.json(res, (err, data) => {
        if (err) return console.warn(err);
        d3.jsonldvis(data, 'graph_scatter_global_2', { w: 800, h: 600, maxLabelWidth: 250 });
    });
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

    quads = await jsonld.toRDF(response, { format: 'application/n-quads' });
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