# fy23q1-hackathon-7

// probe.json - aggregation matches on a connection duration threshold and sourcebytes threashold to detect possible probing attack, $merge to threats collection.  Needs to do a $lookup on a field (datetimestamp?) in the networkpackets collection to pull the jira data into it.

// dos.json - aggregation matches on sourcebytes threshold and errorRate threshold to flag potential DOS attack, $merge to threats collection.  Needs to do a $lookup on a field (datetimestamp?)

# Details

**Project** : Real-time Network Packet Analysis and Reporting Solution <br>
**Team Number** : 7 <br>
**Team Name** : Oploggers <br>
**Demonstration Video** : _Insert link to demonstration video_  

# Overview

Many organizations have challenges efficiently collecting and analyzing data that can inform them of security threats happening at the network layer. Many COTS solutions don't have the technical underpinning to support capturing the high velocity and volume of network packets that need to be analyzed to determine whether there is potentially malicious activity occuring. 

MongoDB's time series capabilities can efficiently store and analyze event data such as network packet metadata while also providing search and reporting capabilities in the same application data platform. This gives organizations the means to react to potential security threats quicker and to significantly reduce to risks to their business.

# Justification

This was a real problem faced by one of Sharath's customers and allows us to showcase many of MongoDB's differentiating capabilities. 

# Detailed Application Overview

![image](https://user-images.githubusercontent.com/1675548/158637882-5ea34f9b-63e0-4939-b9df-c78ff5e4c682.png)

## MongoDB components used
* Atlas Search
* Realm triggers and functions
* Realm Charts
* Realm static hosting
* Realm GraphQL (custom resolver /w Atlas Search)

## Functional description

MongoDB is used as the core database for storing network packet data. Realm triggers are used to persist logic to take action when an event is captured which meets certain criteria that represents a potential security threat--this logic creates a new threat document for reporting/analysis purposes in a separate collection and also creates a "JIRA ticket" to assign to a human being to follow up on. 

The GUI allows analysts to search "JIRA tickets" and also provides visualizations on all detected threats. 

A GraphQL endpoint is available for analysts and developers to query "JIRA tickets" programmatically.

# Roles and Responsibilities

Matt Davis <br>
Jeffrey Cheak <br>
Peter Kim <br>
Sharath Rao <br>
Will Chow <br>
Chris Tselebis (Out Sick)

# Demonstration Script

_Demonstration script (or link to script) goes here_

_The demonstration script should provide all the information required for another MongoDB SA to deliver your demonstration to a prospect. This should include:_

* _setup/installation steps_
* _step by step instructions on how to give the demonstration_
* _key points to emphasize at each point in the demonstration_
* _any tear down steps required to reset the demonstration so it is ready for the next time_
