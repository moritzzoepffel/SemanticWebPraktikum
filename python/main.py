from rdflib import Graph

print("Enter Movie Name: ")
movie_name = input()

print("Starting to parse Graph")
g = Graph()
g.parse("https://www.cs.toronto.edu/~oktie/linkedmdb/linkedmdb-latest-dump.nt", format="turtle")
print("Graph parsed")

print("Creating query:")
query = """
 PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 

 SELECT ?resource ?pre ?label 
 WHERE {
    ?resource ?pre ?label . 
    FILTER regex(?label,'""" + movie_name + """')
}"""

print("############################################")
print(query)
print("############################################")

qres = g.query(query)

print("Query executed")
# print("Length of answer: "+ str(len(qres)))

file = open("response.ttl", "w")
for index, row in enumerate(qres):
    # string = str(index) + ":\t" + row.label + "\t" + row.pre + "\t" + row.resource + "\n"
    string = "<" + row.label + "> <" + row.pre + "> <" + row.resource + "> .\n"
    file.write(string)
file.close()
print("Created and wrote successfully to file: response.ttl")

# python "C:/Users/Danylo/Desktop/Universität/5 Semester/Praktikum/git/ontology-visualization/ontology_viz.py" -o test.dot response.ttl
# dot -Tsvg -o graph.svg test.dot



