
   
// This function is the webhook's request handler.
exports = function(payload, response) {
  const collection = context.services.get("mongodb-atlas").db("hackathon").collection("issue");
  
    let arg = payload.query.arg + "*";

    return collection.aggregate(
      //PASTE AGG PIPELINE CODE HERE
      [
        {$search: { 
          "index": "ix_autocomplete",
            "autocomplete": {
              "query": arg,
              "path": "summary",
              fuzzy: {
                maxEdits: 2,
                prefixLength: 0
              }  
            }
        }}, 
        {$sort: { created_date: -1}},
        {$project: { 
          description: 1, 
          _id: 0, 
          summary: 1, 
          issue_id: 1
        }}, 
        {$limit: 15}
      ]      
    ).toArray();
};