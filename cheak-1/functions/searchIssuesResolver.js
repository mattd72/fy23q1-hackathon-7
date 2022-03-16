
/*
  This function is run when a GraphQL Query is made requesting your
  custom field name. The return value of this function is used to
  populate the resolver generated from your Payload Type.

  This function expects the following input object:

  {
    "type": "object",
    "title": "MyCustomResolverInput",
    "properties": {
      "name": {
        "type": "string"
      }
    },
    "required": ["name"]
  }

  And the following payload object:

  {
    "type": "object",
    "title": "MyCustomResolverResult",
    "properties": {
      "hello": {
        "type": "string"
      }
    }
  }
*/

exports = async (query) => {
    const cluster = context.services.get("mongodb-atlas");
    const recipes = cluster.db("hackathon").collection("issue");
    const result = await recipes.aggregate([
        {
            "$search": {
                "text": {
                    "query": query,
                    "path": ["summary", "description", "assignee", "assignee_username", "reporter", "reporter_username"],
                    "fuzzy": {
                        "maxEdits": 2,
                        "prefixLength": 2
                    }
                }
            }
        },
        {
          "$limit": 20
        }
    ]).toArray();
    return result;
};