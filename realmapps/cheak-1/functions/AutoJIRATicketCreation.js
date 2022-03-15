exports = function(changeEvent){
    const docId = changeEvent.documentKey._id;
    const fullDocument = changeEvent.fullDocument;
    var collection = context.services.get("mongodb-atlas").db("hackathon").collection("issue");
    const newIssue = 
       {"issue_id":"matt",
       "type":"Threat",
       "threat_id":docId,
       "assignee":"triage@mycompany.com",
       "reporter":"system",
       "created_date": new Date(),
       "createdDateinMillis":Date.now(),
       "network_event":fullDocument
       }
       
      

collection.insertOne(newIssue)
  .then(result => console.log(`Successfully inserted item with _id: ${result.insertedId}`))
  .catch(err => console.error(`Failed to insert item: ${err}`))

};