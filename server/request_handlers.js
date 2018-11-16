

//handle route requests should take in request data, handlers, routes, req and res
function handleRequests(requestData, handlers, routes, req, res){

    var chosenHandler = typeof(routes[requestData.path]) !== 'undefined' ? routes[requestData.path] : handlers.notFound;
    
    chosenHandler(requestData, function(statusCode, payload){
            
            //validate statusCode
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            //validate payload
            payload = typeof(payload) == 'object' ? payload : {};

            //convert payload to string
            var payloadString = JSON.stringify(payload);

            //return a reponse
            res.setHeader('Content-Type', 'Application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            //log requested route
            console.log('requested route info: ', statusCode, payload);
    })
};



module.exports = handleRequests;
