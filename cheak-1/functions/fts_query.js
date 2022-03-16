// This function is the webhook's request handler.
exports = function(payload, response) {
  const collection = context.services.get("mongodb-atlas").db("hackathon").collection("issue");
  
  	let arg = payload.query.arg;

  	return collection.aggregate([
  	  {$search: {
        compound: {
          must: {
            search: {
              path: ['issue_id','description','summary','reporter'],
              query: arg
            }
          },
          should: {
            search: {
              path: 'summary',
              query: arg
            }
          }
        }
      }}, 
      {$project: {
        description: 1,
        _id: 0,
        issue_id: 1,
        summary: 1,
        reporter: 1,
        assignee: 1,
        type: 1,
        status: 1,
        score: {$meta: 'searchScore'}
        
      }},
      { $limit: 15 }
      ]).toArray();
};