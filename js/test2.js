const puppeteer = require("puppeteer");

run();

json = {
    "Title": "James Bond",
    "Year": "2015",
    "Rated": "N/A",
    "Released": "24 Jul 2015",
    "Runtime": "142 min",
    "Genre": "Action, Comedy",
    "Director": "Sai Kishore Macha",
    "Writer": "Gopimohan, Sai Kishore Macha",
    "Actors": "Allari Naresh, Sakshi Chaudhary, Raghu Babu",
    "Plot": "A down-to-earth software employee marries a lady without knowing about her past and criminal activities. Halfway through his marriage, he finds out her background and decides to run away, but ultimately comes to terms with his proble",
    "Language": "Telugu",
    "Country": "India",
    "Awards": "N/A",
    "Poster": "https://m.media-amazon.com/images/M/MV5BM2IwZDRiOTAtNTUxOC00ZWQxLThlYTYtZTM2NTRmMjEzNmQwXkEyXkFqcGdeQXVyODAzNzAwOTU@._V1_SX300.jpg",
    "Ratings": [{"Source": "Internet Movie Database", "Value": "5.5/10"}],
    "Metascore": "N/A",
    "imdbRating": "5.5",
    "imdbVotes": "231",
    "imdbID": "tt4896340",
    "Type": "movie",
    "DVD": "N/A",
    "BoxOffice": "N/A",
    "Production": "N/A",
    "Website": "N/A",
    "Response": "True",
    "@context": "https://schema.org/"
}


async function run() {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.goto('https://json-ld.org/playground/');

    var jsonString = JSON.stringify(json)

    await page.waitForTimeout(1000)
    await page.waitForSelector("#pane-input > div > div:nth-child(1) > textarea");
    await page.waitForTimeout(1000)
    await page.type("#pane-input > div > div:nth-child(1) > textarea", jsonString);

    await page.evaluate(() => {
        document.querySelector('#tab-visualized > span').click();
    });

    //waiting for page to process
    await page.waitForTimeout(1000);

    //read result
    console.log(await page.$eval('#visualized', el => el.innerHTML));

    await browser.close();
}