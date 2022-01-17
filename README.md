# SemanticWebPraktikum

Executes Query on [linkedmdb.nt](linkedmdb.nt) database and writes response into file. 
Then you can convert response into .dot file and afterwards create an svg image out of it.

* run [main.py](python/main.py) and enter a movie name (e.g. Batman Begins)
* A [response.ttl](python/response.ttl) file should appear
* Now you can execute the following command to create the dot file where path is the path to the [ontology_viz.py](python/ontology-visualization/ontology_viz.py) file: 
```
python [path] -o test.dot response.ttl
```
* This should create a [test.dot](test.dot) file
* To viualize the dot file you have to download https://graphviz.org/ and execute the following command
```
dot -Tsvg -o graph.svg test.dot
```
* This sould create a [graph.svg](graph.svg) file which is a visualization of the query answer