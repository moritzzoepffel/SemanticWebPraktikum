const puppeteer = require('puppeteer')
quads = `
<http://schema.org/Movie> <http://schema.org/Actors> "Sean Connery, Gert Fröbe, Honor Blackman" .
<http://schema.org/Movie> <http://schema.org/Awards> "Won 1 Oscar. 6 wins & 6 nominations total" .
<http://schema.org/Movie> <http://schema.org/BoxOffice> "$51,081,062" .
<http://schema.org/Movie> <http://schema.org/Country> "United Kingdom" .
<http://schema.org/Movie> <http://schema.org/DVD> "07 Nov 2006" .
<http://schema.org/Movie> <http://schema.org/Director> "Guy Hamilton" .
<http://schema.org/Movie> <http://schema.org/Genre> "Action, Adventure, Thriller" .
<http://schema.org/Movie> <http://schema.org/Language> "English, Chinese, Spanish" .
<http://schema.org/Movie> <http://schema.org/Metascore> "87" .
<http://schema.org/Movie> <http://schema.org/Plot> "While investigating a gold magnate's smuggling, James Bond uncovers a plot to contaminate the Fort Knox gold reserve." .
<http://schema.org/Movie> <http://schema.org/Poster> "https://m.media-amazon.com/images/M/MV5BMTQ2MzE0OTU3NV5BMl5BanBnXkFtZTcwNjQxNTgzNA@@._V1_SX300.jpg" .
<http://schema.org/Movie> <http://schema.org/Production> "N/A" .
<http://schema.org/Movie> <http://schema.org/Rated> "PG" .
<http://schema.org/Movie> <http://schema.org/Ratings> _:b1 .
<http://schema.org/Movie> <http://schema.org/Ratings> _:b2 .
<http://schema.org/Movie> <http://schema.org/Ratings> _:b3 .
<http://schema.org/Movie> <http://schema.org/Released> "09 Jan 1965" .
<http://schema.org/Movie> <http://schema.org/Response> "True" .
<http://schema.org/Movie> <http://schema.org/Runtime> "110 min" .
<http://schema.org/Movie> <http://schema.org/Title> "Goldfinger" .
<http://schema.org/Movie> <http://schema.org/Type> "movie" .
<http://schema.org/Movie> <http://schema.org/Website> "N/A" .
<http://schema.org/Movie> <http://schema.org/Writer> "Richard Maibaum, Paul Dehn, Ian Fleming" .
<http://schema.org/Movie> <http://schema.org/Year> "1964" .
<http://schema.org/Movie> <http://schema.org/imdbID> "tt0058150" .
<http://schema.org/Movie> <http://schema.org/imdbRating> "7.7" .
<http://schema.org/Movie> <http://schema.org/imdbVotes> "184,450" .
_:b1 <http://schema.org/Source> "Internet Movie Database" .
_:b1 <http://schema.org/Value> "7.7/10" .
_:b2 <http://schema.org/Source> "Rotten Tomatoes" .
_:b2 <http://schema.org/Value> "99%" .
_:b3 <http://schema.org/Source> "Metacritic" .
_:b3 <http://schema.org/Value> "87/100" .

`
xml = '';
turtle = '';

convert(quads, 'rdfxml');

async function convert(quads, type) {
    const browser = await puppeteer.launch();
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
    await page.waitForTimeout(2000);

    //read result
    const data = await page.$eval('#result', el => el.innerText);

    if (type == 'rdfxml') {
        xml = data;
    } else {
        turtle = data;
    }
    await browser.close();

    if(type != 'turtle'){
        await convert(quads, 'turtle')
    }else{
        printall();
    }
}

function printall(){
    console.log("##################################################");
    console.log(quads);
    console.log("##################################################");
    console.log(xml)
    console.log("##################################################");
    console.log(turtle);
    console.log("##################################################")
}
