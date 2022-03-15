# fy23q1-hackathon-7

// probe.json - aggregation matches on a connection duration threshold and sourcebytes threashold to detect possible probing attack, $merge to threats collection.  Needs to do a $lookup on a field (datetimestamp?) in the networkpackets collection to pull the jira data into it.

// dos.json - aggregation matches on sourcebytes threshold and errorRate threshold to flag potential DOS attack, $merge to threats collection.  Needs to do a $lookup on a field (datetimestamp?)
