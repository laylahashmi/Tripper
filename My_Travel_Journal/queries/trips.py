from pydantic import BaseModel, Field
from queries.client import Queries
from typing import Optional, List
from bson import ObjectId

class StopIn(BaseModel):
    name: str
    street: Optional[str]
    state: str
    city: str
    description: str

class StopOut(StopIn):
    id: str

class TripIn(BaseModel):
    name: str
    picture_url: str
    start_date: str
    end_date: str
    description: str
   
    # TODO: add username to the trip on creation so it belongs to a user
    # TODO: do we add an id here to make attaching a stop easier?

class TripOut(TripIn):
    id: str
    stops: List[StopOut]| None

class TripQueries(Queries):

    COLLECTION = "trips"
    
    def create(self, info: TripIn, user_id: str) -> TripOut:
        trip = info.dict()
        trip['user_id'] = user_id
        self.collection.insert_one(trip)
        trip['id'] = str(trip['_id'])
        return TripOut(**trip)

    def get_all_trips(self, user_id: str) -> List[TripOut]:
        trips = []
        all_trips = self.collection.find({'user_id': user_id})
        for trip in all_trips:
            trip['id'] = str(trip['_id'])
            for stop in trip['stops']:
                stop['id'] = str(stop['_id'])
            trips.append(TripOut(**trip))
        return trips
        
    
    def get_trip(self, trip_id: str, user_id: str) -> TripOut:
        trip = self.collection.find_one({'_id': ObjectId(trip_id), 'user_id': user_id})
        if trip is None:
            return None
        trip['id'] = str(trip['_id'])
        return TripOut(**trip)

    def delete_trip(self, trip_id: str, user_id: str) -> bool:
        trip = self.collection.delete_one({'_id': ObjectId(trip_id), 'user_id': user_id})
        return trip.deleted_count == 1

    def update_trip(self, info: TripIn, trip_id: str, user_id: str) -> TripOut:
        trip = self.collection.update_one({'_id': ObjectId(trip_id), 'user_id': user_id}, {'$set': info.dict()})
        if trip.matched_count == 0:
            return None
        return self.get_trip(trip_id, user_id)

    def create_stop(self, info: StopIn, trip_id: str, user_id: str) -> StopOut:
        stop = info.dict()
        stop['_id'] = ObjectId()
        trip = self.collection.update_one({'user_id': user_id, '_id': ObjectId(trip_id)}, {'$push':{'stops': stop}},)
        stop['id'] = str(stop['_id'])
        if not trip:
            return None
        return StopOut(**stop)

    def get_stop(self, trip_id: str, stop_id: str, user_id: str) -> StopOut:
        stop = self.collection.find_one({'_id': ObjectId(trip_id), 'user_id': user_id})
        if stop is None:
            return None
        stop['id'] = str(stop['_id'])
        return StopOut(**stop)

    def update_stop(self, info: StopIn, trip_id: str, stop_id: str, user_id: str) -> TripOut| None:
        trip = self.collection.find_one({'_id': ObjectId(trip_id), 'user_id': user_id})
        for stop in trip['stops']:
            stop['id'] = str(stop['_id'])
            if stop['id'] == ObjectId(stop_id):
                self.collection.update_one({'id': ObjectId(stop_id)}, {'$set': { trip['stops']: info.dict()}})
        if not trip:
            return None
        return self.get_trip(trip_id, user_id)

