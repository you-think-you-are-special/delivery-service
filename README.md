# Delivery service




# Run

```bash

# install dependencies
npm ci

# build index
# If you won't specify a path, routes.txt in will be used as default source
npm build path_to_routes.txt

# Run application
npm start

```


# Case1 
Calculate the delivery cost of the given delivery route. Follow the route as given; do
not count any extra stops. In case given route is not exists, output ’No Such Route’


```
Welcome to Eko ​Delivery​ Service!
Type ".help" to continue

​Eko​ Delivery​ ​Service> .case1 A-B-E
The delivery cost for route A-B-E: 4
​Eko​ Delivery​ ​Service> .case1 A-D
The delivery cost for route A-D: 10
​Eko​ Delivery​ ​Service> .case1 E-A-C-F
The delivery cost for route E-A-C-F: 8
​Eko​ Delivery​ ​Service> .case1 A-D-F
No Such Route
​Eko​ Delivery​ ​Service> 
```

# Case2
Calculate the number of possible delivery route that can be construct by the given
conditions. ( Do not count the route that has 0 cost )

```
Welcome to Eko ​Delivery​ Service!
Type ".help" to continue

​Eko​ Delivery​ ​Service> .case2 E-D limit:4
The number of possible delivery route from E to D with a maximum of 4 stop: 4
​Eko​ Delivery​ ​Service> .case2 E-E
The number of possible delivery route from E to E with a maximum of undefined stop: 5
​Eko​ Delivery​ ​Service> 
```

# Case3
Calculate the cheapest delivery route between two town


```
Welcome to Eko ​Delivery​ Service!
Type ".help" to continue

​Eko​ Delivery​ ​Service> .case3 E-D
The delivery cost for route E-D: 9 # dijkstra algorithm
```


# What I did not have enough time

* Unit tests
* Validation
* Bonus task
* The cost of cheapest delivery route between E to E


# What I used 

* My own graph implementation for case1 and case2 tasks
* node-dijkstra library for saving my time in the last task
* [Comparison path finding algorithms](https://github.com/neo4j-contrib/neo4j-graph-algorithms#path-finding)
* [Graph algorithms](https://github.com/trekhleb/javascript-algorithms)
