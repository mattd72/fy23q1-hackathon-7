import params
import sys
import time
from datetime import datetime
from pymongo import MongoClient
from faker import Faker
from bson.decimal128 import Decimal128
import argparse

# Process arguments
# parser = argparse.ArgumentParser(description='MongoDB Network Compression Test')
# parser.add_argument('-c', '--compressor', help="The compressor to use.",
#    choices=["snappy", 'zlib', 'zstd'])
# args = parser.parse_args()

print("\nGenerating packets...")

# Establish connection to MongoDB

# https://pymongo.readthedocs.io/en/stable/api/pymongo/mongo_client.html?highlight=compression#pymongo.mongo_client.MongoClient
client = MongoClient(params.target_conn_string, compressors=params.compressor)

print("Now:", datetime.now(), "\n")

db = client[params.target_database]
collection = db[params.target_collection]

if params.drop_collection:
    collection.drop()

fake = Faker()
records_to_insert = params.records_to_insert
insert_count = 0  # Count the records inserted.
batch_size = params.batch_size
t_start = time.time()

packets = []  # customers array for bulk insert

print("Records to insert: {}".format(records_to_insert))
print("Batch insert size: {}".format(batch_size))

while insert_count < records_to_insert:

    try:

        packet = {
            "id": fake.random_int(min=1, max=99999999),
            "source_ip_address": fake.ipv4(),
            "destination_ip_address": fake.ipv4(),
            "ping_time": fake.random_int(min=5, max=70),
            "createdOn": datetime.now(),
            "durationInMillis": fake.random_int(min=10, max=120000),
            "sourceBytes": fake.random_int(min=200, max=3200),
            "errorRate": fake.random_int(min=0, max=90),
            "location": {
                "type": "point",
                "coordinates": [
                    Decimal128(fake.longitude()),
                    Decimal128(fake.latitude())]
            }
        }

        packets.append(packet)

        insert_count += 1

        # If the modulus falls in the range of the record size, insert the batch.
        if(insert_count % batch_size == 0):

            collection.insert_many(packets)
            packets = []

            # Print performance stats
            duration = time.time()-t_start
            print('{:.0f} records inserted'.format(insert_count),
                  'at {:.1f} records/second'.format(insert_count/duration))

    except KeyboardInterrupt:
        print
        sys.exit(0)

    except Exception as e:
        print('\n********\nConnection Problem:')
        print(e)
        print('********')
        sys.exit(0)


print("\n", insert_count, 'records inserted in',
      str(round(time.time()-t_start, 0)), 'seconds')
