const http = require('http')
const puppeteer = require('puppeteer')
const jsonld = require('jsonld');
const {getInitialContext} = require('jsonld/lib/context');

const port = process.env.PORT || 8080

var QUADS = "";
var xml = "";
var turtle = "";
var svg = "";
var json = "";

const server = http.createServer((req, res) => {
    if (req.url == "/" || req.url == "") {
        //do nothing
        //return empty?
    } else {
        var title = req.url.substring(1);
        console.log("Received Movie: " + title);
        console.log("Starting formatting...")
        start(title).then(answer);
    }

    function answer() {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
        res.setHeader('Access-Control-Allow-Credentials', true); // If needed
        res.write(JSON.stringify({
            'quads': QUADS,
            'xml': xml,
            'turtle': turtle,
            'svg': svg
        }))
        res.end()
    }
})

server.listen(port, "127.0.0.1", () => {
    console.log(`Server listening to: http://${server.address().address}:${server.address().port}`)
})


async function start(filmTitle) {
    quads = await getQuads(filmTitle);
    await convert(quads, 'rdfxml');
    await getGraphRDFGrapher();
    console.log("###################    Quads   #########################");
    console.log(quads);
    console.log("###################    XML     #########################");
    console.log(xml);
    console.log("################### Turtle     #########################");
    console.log(turtle);
    console.log("##################################################");
}

//gets JSON from imdb and converts it to quads
async function getQuads(filmTitle) {
    const url = "http://www.omdbapi.com/?apikey=faeed64f&t=" + filmTitle;
    let response = await fetch(url)
        .then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        });

    response["@context"] = "https://schema.org/";
    let res = JSON.stringify(response).toString();
    json = res;

    var quads = await jsonld.toRDF(response, {format: 'application/n-quads'});
    //quads = await format_quads(quads, filmTitle);
    quads = quads.replace(/_:b0/gi, '<http://schema.org/Movie>');
    QUADS = format_quads(quads, filmTitle);
    return quads;

}

//is used in getQuads(filmTitle)
function format_quads(text, filmTitle) {
    text = text.replace(/_:b0/gi, '&lt;' + "http://schema.org/Movie" + '&gt;');
    text = text.replace(/</gi, '&lt;');
    text = text.replace(/>/gi, '&gt;');
    return text;
}


async function convert(quads, type) {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://www.easyrdf.org/converter');


    //put in the data
    await page.type("#data", quads);

    //change dropdown  to xml
    if (type == 'rdfxml') {
        await Promise.all([page.select("#out", "rdfxml")])
    }

    //submit form
    await page.evaluate(() => {
        document.querySelector('input[type=submit]').click();
    });

    //waiting for page to process
    await page.waitForTimeout(1000);

    //read result
    const data = await page.$eval('#result', el => el.innerText);

    if (type == 'rdfxml') {
        xml = data;
    } else {
        turtle = data;
    }
    await browser.close();

    if (type != 'turtle') {
        await convert(quads, 'turtle')
    }
}

async function getGraph() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('https://json-ld.org/playground/');

    console.log(json)

    await page.waitForTimeout(1000)
    await page.waitForSelector("#pane-input > div > div:nth-child(1) > textarea");
    await page.waitForTimeout(1000)
    await page.type("#pane-input > div > div:nth-child(1) > textarea", json);

    await page.evaluate(() => {
        document.querySelector('#tab-visualized > span').click();
    });

    //waiting for page to process
    await page.waitForTimeout(2000);

    //read result
    svg = await page.$eval('#visualized', el => el.innerHTML);

    console.log(svg)

    await browser.close();
}

async function getGraphRDFGrapher() {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.goto('https://www.ldf.fi/service/rdf-grapher');

    await page.waitForTimeout(1000)
    await page.waitForSelector("#body > form > textarea");
    await page.evaluate(() => document.querySelector("#body > form > textarea").innerHTML = "");
    await page.waitForTimeout(1000)
    await page.type("#body > form > textarea", turtle);


    await page.select("#body > form > select:nth-child(6)", "svg");

    await page.click("#body > form > input[type=\"submit\"]:nth-child(11)")

    //waiting for page to process
    await page.waitForTimeout(1000);

    svg = await page.evaluate(() => document.querySelector('*').outerHTML);

    //read result
    // svg = await page.$eval('#visualized', el => el.innerHTML);

    var begin = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width='100%' height='100%' viewBox=\"0.00 0.00 2000 1500\">"

   // svg = begin + svg.substring(svg.search("\n"));

    await browser.close();
}