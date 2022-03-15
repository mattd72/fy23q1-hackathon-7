// This function is the webhook's request handler.
exports = function(payload, response) {
  const collection = context.services.get("mongodb-atlas").db("hackathon").collection("issue");
  
  	let arg = payload.query.arg;

  	return collection.aggregate([
  	  {$search: {
        compound: {
          must: {
            search: {
              path: ['description','summary','reporter'],
              query: arg
            }
          },
          should: {
            search: {
              path: 'description',
              query: arg
            }
          }
        }
      }}, 
      {$project: {
        description: 1,
        _id: 0,
        summary: 1,
        reporter: 1,
        status: 1,
        score: {$meta: 'searchScore'}
        
      }},
      { $limit: 15 }
      ]).toArray();
};