import os
import pymongo


MONGO_URL = os.environ["MONGO_URL"]
client = pymongo.MongoClient(MONGO_URL)


class Queries:
    @property
    def collection(self):
        db = client['mongo']
        return db[self.COLLECTION]
