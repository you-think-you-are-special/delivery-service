# Delivery service


# Run

```bash

# install dependencies
npm ci

# run unit tests
npm test

# build index
# If you won't specify a path, routes.txt in will be used as default source
npm run build path_to_routes.txt

# Run application
npm start

```

[Configuration](https://github.com/lorenwest/node-config/wiki)

# Solution details
I wrote my own graph and traversed it, because this is needed as I understood.

Where are some problems with that solution:

* Slow application start (Depends on data)
* Memory limits
* Consistency. If we are going to scale and update application logic
* Also see https://12factor.net/processes

As alternative we could use db as solution. (MongoDb, Neo4J and other)
Case2 and Case3 could be pre calculated.


# Case1 
Calculate the delivery cost of the given delivery route. Follow the route as given; do
not count any extra stops. In case given route is not exists, output ’No Such Route’  
  

```
Welcome to ​Delivery​ Service!
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
Welcome to ​Delivery​ Service!
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
Welcome to ​Delivery​ Service!
Type ".help" to continue

​Eko​ Delivery​ ​Service> .case3 E-D
The delivery cost for route E-D: 9 # dijkstra algorithm
Delivery​ ​Service.case3 E-E
The delivery cost for route E-E: 6
```

# What I used 

* [Comparison path finding algorithms](https://github.com/neo4j-contrib/neo4j-graph-algorithms#path-finding)
* [Graph algorithms](https://github.com/trekhleb/javascript-algorithms)
* [The Twelve Factors](https://12factor.net/)