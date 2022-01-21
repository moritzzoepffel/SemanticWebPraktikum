import io
import urllib.request

import matplotlib.pyplot as plt
import requests
from PIL import Image

# url = "https://www.ldf.fi/service/rdf-grapher?rdf=%40prefix+rml%3A+%3Chttp%3A%2F%2Fsemweb.mmlab.be%2Fns%2Frml%23%3E+.%0D%0A%40prefix+rr%3A+%3Chttp%3A%2F%2Fwww.w3.org%2Fns%2Fr2rml%23%3E+.%0D%0A%40prefix+ql%3A+%3Chttp%3A%2F%2Fsemweb.mmlab.be%2Fns%2Fql%23%3E+.%0D%0A%40prefix+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E+.%0D%0A%40prefix+%3A+%3Chttp%3A%2F%2Fexample.org%2Frules%2F%3E+.%0D%0A%40prefix+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E+.%0D%0A%40prefix+dbo%3A+%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2F%3E+.%0D%0A%0D%0A%3ATriplesMap+a+rr%3ATriplesMap%3B%0D%0A++rml%3AlogicalSource+%5B%0D%0A++++rml%3Asource+%22characters.xml%22%3B%0D%0A++++rml%3AreferenceFormulation+ql%3AXPath%3B%0D%0A++++rml%3Aiterator+%22%2Fcharacters%2Fcharacter%22%0D%0A++%5D.%0D%0A%0D%0A%3ATriplesMap+rr%3AsubjectMap+%5B%0D%0A++rr%3Atemplate+%22http%3A%2F%2Fexample.org%2Fcharacter%2F%7B%40id%7D%22%0D%0A%5D.%0D%0A%0D%0A%3ATriplesMap+rr%3ApredicateObjectMap+%5B%0D%0A++rr%3Apredicate+rdf%3Atype%3B%0D%0A++rr%3AobjectMap+%5B%0D%0A+++rr%3Aconstant+schema%3APerson%0D%0A+%5D%0D%0A%5D.%0D%0A%0D%0A%3ATriplesMap+rr%3ApredicateObjectMap+%5B%0D%0A++rr%3Apredicate+schema%3AgivenName%3B%0D%0A++rr%3AobjectMap+%5B%0D%0A++++rml%3Areference+%22firstname%22%0D%0A++%5D%0D%0A%5D.%0D%0A%0D%0A%3ATriplesMap+rr%3ApredicateObjectMap+%5B%0D%0A++rr%3Apredicate+schema%3AlastName%3B%0D%0A++rr%3AobjectMap+%5B%0D%0A++++rml%3Areference+%22lastname%22%0D%0A++%5D%0D%0A%5D.%0D%0A%0D%0A%3ATriplesMap+rr%3ApredicateObjectMap+%5B%0D%0A++rr%3Apredicate+dbo%3AhairColor%3B%0D%0A++rr%3AobjectMap+%5B%0D%0A++++rml%3Areference+%22hair%22%0D%0A++%5D%0D%0A%5D.&from=ttl&to=png"

# response = requests.get(url).content
# img = plt.imread(io.BytesIO(response), format='JPG')
# Importing Image module from PIL package

# urllib.request.urlretrieve(url, "image.jpg")

str = """<root, Title, Goldfinger>
<root, Year, 1964>
<root, Rated, PG>
<root, Released, 09 Jan 1965>
<root, Runtime, 110 min>
<root, Genre, Action, Adventure, Thriller>
<root, Director, Guy Hamilton>
<root, Writer, Richard Maibaum, Paul Dehn, Ian Fleming>
<root, Actors, Sean Connery, Gert Fröbe, Honor Blackman>
<root, Plot, While investigating a gold magnate's smuggling, James Bond uncovers a plot to contaminate the Fort Knox gold reserve.>
<root, Language, English, Chinese, Spanish>
<root, Country, United Kingdom>
<root, Awards, Won 1 Oscar. 6 wins & 6 nominations total>
<root, Poster, https://m.media-amazon.com/images/M/MV5BMTQ2MzE0OTU3NV5BMl5BanBnXkFtZTcwNjQxNTgzNA@@._V1_SX300.jpg>
<root, Ratings, 0>
<0, param, Source>
<Source, type, Internet Movie Database>
<0, param, Value>
<Value, type, 7.7/10>
<root, Ratings, 1>
<1, param, Source>
<Source, type, Rotten Tomatoes>
<1, param, Value>
<Value, type, 99%>
<root, Ratings, 2>
<2, param, Source>
<Source, type, Metacritic>
<2, param, Value>
<Value, type, 87/100>
<root, Metascore, 87>
<root, imdbRating, 7.7>
<root, imdbVotes, 184,450>
<root, imdbID, tt0058150>
<root, Type, movie>
<root, DVD, 07 Nov 2006>
<root, BoxOffice, $51,081,062>
<root, Production, N/A>
<root, Website, N/A>
<root, Response, True>"""

ls = str.split("\n")

print(ls)

sent_str = "https://www.ldf.fi/service/rdf-grapher?rdf="

'+'.join(ls)

for i in ls:
    entry = i.replace("<", "")
    entry = entry.replace(">", "")
    entry = entry.split(", ")
    print(entry)
    for j in entry:
        sent_str = sent_str + "<" + j + ">+"
    sent_str = sent_str + "."

sent_str = sent_str + "&from=ttl&to=png"

print(sent_str)

#  from=ttl & to = png

https://www.ldf.fi/service/rdf-grapher?rdf=%3Croot%3E+%3CTitle%3E+%3CGoldfinger%3E+.%3Croot%3E+%3CYear%3E+%3C1964%3E+.%3Croot%3E+%3CRated%3E+%3CPG%3E+.%3Croot%3E+%3CReleased%3E+%3C09%20Jan%201965%3E+.%3Croot%3E+%3CRuntime%3E+%3C110%20min%3E+.%3Croot%3E+%3CGenre%3E+%3CAction%3E+%3CAdventure%3E+%3CThriller%3E+.%3Croot%3E+%3CDirector%3E+%3CGuy%20Hamilton%3E+.%3Croot%3E+%3CWriter%3E+%3CRichard%20Maibaum%3E+%3CPaul%20Dehn%3E+%3CIan%20Fleming%3E+.%3Croot%3E+%3CActors%3E+%3CSean%20Connery%3E+%3CGert%20Fröbe%3E+%3CHonor%20Blackman%3E+.%3Croot%3E+%3CPlot%3E+%3CWhile%20investigating%20a%20gold%20magnate%27s%20smuggling%3E+%3CJames%20Bond%20uncovers%20a%20plot%20to%20contaminate%20the%20Fort%20Knox%20gold%20reserve.%3E+.%3Croot%3E+%3CLanguage%3E+%3CEnglish%3E+%3CChinese%3E+%3CSpanish%3E+.%3Croot%3E+%3CCountry%3E+%3CUnited%20Kingdom%3E+.%3Croot%3E+%3CAwards%3E+%3CWon%201%20Oscar.%206%20wins%20&%206%20nominations%20total%3E+.%3Croot%3E+%3CPoster%3E+%3Chttps://m.media-amazon.com/images/M/MV5BMTQ2MzE0OTU3NV5BMl5BanBnXkFtZTcwNjQxNTgzNA@@._V1_SX300.jpg%3E+.%3Croot%3E+%3CRatings%3E+%3C0%3E+.%3C0%3E+%3Cparam%3E+%3CSource%3E+.%3CSource%3E+%3Ctype%3E+%3CInternet%20Movie%20Database%3E+.%3C0%3E+%3Cparam%3E+%3CValue%3E+.%3CValue%3E+%3Ctype%3E+%3C7.7/10%3E+.%3Croot%3E+%3CRatings%3E+%3C1%3E+.%3C1%3E+%3Cparam%3E+%3CSource%3E+.%3CSource%3E+%3Ctype%3E+%3CRotten%20Tomatoes%3E+.%3C1%3E+%3Cparam%3E+%3CValue%3E+.%3CValue%3E+%3Ctype%3E+%3C99%%3E+.%3Croot%3E+%3CRatings%3E+%3C2%3E+.%3C2%3E+%3Cparam%3E+%3CSource%3E+.%3CSource%3E+%3Ctype%3E+%3CMetacritic%3E+.%3C2%3E+%3Cparam%3E+%3CValue%3E+.%3CValue%3E+%3Ctype%3E+%3C87/100%3E+.%3Croot%3E+%3CMetascore%3E+%3C87%3E+.%3Croot%3E+%3CimdbRating%3E+%3C7.7%3E+.%3Croot%3E+%3CimdbVotes%3E+%3C184,450%3E+.%3Croot%3E+%3CimdbID%3E+%3Ctt0058150%3E+.%3Croot%3E+%3CType%3E+%3Cmovie%3E+.%3Croot%3E+%3CDVD%3E+%3C07%20Nov%202006%3E+.%3Croot%3E+%3CBoxOffice%3E+%3C$51,081,062%3E+.%3Croot%3E+%3CProduction%3E+%3CN/A%3E+.%3Croot%3E+%3CWebsite%3E+%3CN/A%3E+.%3Croot%3E+%3CResponse%3E+%3CTrue%3E+.&from=ttl&to=png

https://www.ldf.fi/service/rdf-grapher?rdf=%40prefix+rml%3A+%3Chttp%3A%2F%2Fsemweb.mmlab.be%2Fns%2Frml%23%3E+.%0D%0A%40prefix+rr%3A+%3Chttp%3A%2F%2Fwww.w3.org%2Fns%2Fr2rml%23%3E+.%0D%0A%40prefix+ql%3A+%3Chttp%3A%2F%2Fsemweb.mmlab.be%2Fns%2Fql%23%3E+.%0D%0A%40prefix+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E+.%0D%0A%40prefix+%3A+%3Chttp%3A%2F%2Fexample.org%2Frules%2F%3E+.%0D%0A%40prefix+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E+.%0D%0A%40prefix+dbo%3A+%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2F%3E+.%0D%0A%0D%0A%3ATriplesMap+a+rr%3ATriplesMap%3B%0D%0A++rml%3AlogicalSource+%5B%0D%0A++++rml%3Asource+%22characters.xml%22%3B%0D%0A++++rml%3AreferenceFormulation+ql%3AXPath%3B%0D%0A++++rml%3Aiterator+%22%2Fcharacters%2Fcharacter%22%0D%0A++%5D.%0D%0A%0D%0A%3ATriplesMap+rr%3AsubjectMap+%5B%0D%0A++rr%3Atemplate+%22http%3A%2F%2Fexample.org%2Fcharacter%2F%7B%40id%7D%22%0D%0A%5D.%0D%0A%0D%0A%3ATriplesMap+rr%3ApredicateObjectMap+%5B%0D%0A++rr%3Apredicate+rdf%3Atype%3B%0D%0A++rr%3AobjectMap+%5B%0D%0A+++rr%3Aconstant+schema%3APerson%0D%0A+%5D%0D%0A%5D.%0D%0A%0D%0A%3ATriplesMap+rr%3ApredicateObjectMap+%5B%0D%0A++rr%3Apredicate+schema%3AgivenName%3B%0D%0A++rr%3AobjectMap+%5B%0D%0A++++rml%3Areference+%22firstname%22%0D%0A++%5D%0D%0A%5D.%0D%0A%0D%0A%3ATriplesMap+rr%3ApredicateObjectMap+%5B%0D%0A++rr%3Apredicate+schema%3AlastName%3B%0D%0A++rr%3AobjectMap+%5B%0D%0A++++rml%3Areference+%22lastname%22%0D%0A++%5D%0D%0A%5D.%0D%0A%0D%0A%3ATriplesMap+rr%3ApredicateObjectMap+%5B%0D%0A++rr%3Apredicate+dbo%3AhairColor%3B%0D%0A++rr%3AobjectMap+%5B%0D%0A++++rml%3Areference+%22hair%22%0D%0A++%5D%0D%0A%5D.&from=ttl&to=png
