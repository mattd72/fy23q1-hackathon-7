exports = function() {
 // const mongodb = context.services.get("team7");
  const networkpacketsCollection = context.services.get("mongodb-atlas").db("hackathon").collection("networkpackets");

  //const networkpacketsCollection = mongodb.db("hackathon").collection("networkpackets");


const pipeline = [
  {$match: {
    sourceBytes: {$gte: 1480},
    errorRate: {$gte: 85}
  }}, {$addFields: {
    condition: "DOS"
  }}, {$merge: {
    into: 'threats'
  }}
]
  

  
return networkpacketsCollection.aggregate(pipeline).toArray()
  .then(networkpackets => {
    console.log(`Found threats for ${networkpackets.length} networkpackets.`)
    
  })
  .catch(err => console.error(`Failed to group threats: ${err}`))




};