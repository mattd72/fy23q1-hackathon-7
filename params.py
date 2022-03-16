target_conn_string = 'mongodb+srv://admin:admin@team7.vtftv.mongodb.net/'
target_database = 'hackathon'
target_collection = 'networkpackets'

# Set to an empty string to turn off compression
# compressor = ''         # No compression
compressor = 'snappy'

# Tunables
drop_collection = False   # Drop collection on run
records_to_insert = 30000
batch_size = 10000       # Batch size of bulk insert
