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
            if 'stops' in trip:
                for stop in trip['stops']:
                    stop['id'] = str(stop['_id'])
            trip['id'] = str(trip['_id'])
            trips.append(TripOut(**trip))
        return trips
        
    
    def get_trip(self, trip_id: str, user_id: str) -> TripOut:
        trip = self.collection.find_one({'_id': ObjectId(trip_id), 'user_id': user_id})
        if trip is None:
            return None
        trip['id'] = str(trip['_id'])
        if 'stops' in trip:
            for stop in trip['stops']:
                stop['id'] = str(stop['_id'])
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
        trip = self.collection.find_one(
            {'_id': ObjectId(trip_id), 'user_id': user_id}, {'stops': {'$elemMatch': {'_id': ObjectId(stop_id)}}}
            )
        if not trip or not trip['stops']:
            return None
        stop = trip['stops'][0]
        stop['id'] = str(stop['_id'])
        return StopOut(**stop)

    def update_stop(self, info: StopIn, trip_id: str, stop_id: str, user_id: str) -> TripOut| None:
        filter_criteria = {"_id": ObjectId(trip_id), "user_id": user_id, "stops._id": ObjectId(stop_id)}

        stop_update_dict = info.dict()

        update_operations = {}

        for key, value in stop_update_dict.items():
            update_operations[f"stops.$.{key}"] = value

        result = self.collection.update_one(filter_criteria, {"$set": update_operations})

        if not result.matched_count:
            return None

        updated_stop = self.get_stop(trip_id, stop_id, user_id)

        return updated_stop

    def delete_stop(self, trip_id: str, stop_id: str, user_id: str) -> bool:
        result = self.collection.update_one(
            {"_id": ObjectId(trip_id), "user_id": user_id},
            {"$pull": {"stops": {"_id": ObjectId(stop_id)}}},
        )
        return bool(result.modified_count)