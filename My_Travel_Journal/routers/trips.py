from fastapi import Depends, APIRouter, HTTPException, status
from queries.trips import AllTripsOut, TripIn, TripOut, TripQueries, StopIn, StopOut
from authenticator import authenticator
from typing import List
from queries.pexels import ImageQueries


router = APIRouter(prefix="/api/trips")

@router.post("/", response_model=TripOut)
async def create_trip(
    info: TripIn,
    user_id: dict = Depends(authenticator.get_current_account_data),
    repo: TripQueries = Depends()
):
    return repo.create(info, user_id)

@router.get("/", response_model=AllTripsOut)
async def get_all_trips(
    user_id: dict = Depends(authenticator.get_current_account_data),
    repo: TripQueries = Depends()
):
    return repo.get_all_trips(user_id)

@router.get("/{trip_id}", response_model=TripOut)
async def get_trip(
    trip_id: str,
    user_id: dict = Depends(authenticator.get_current_account_data),
    repo: TripQueries = Depends()
):
    trip = repo.get_trip(trip_id, user_id)
    if not trip:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")
    return trip

@router.delete("/{trip_id}", response_model=bool)
async def delete_trip(
    trip_id: str,
    user_id: dict = Depends(authenticator.get_current_account_data),
    repo: TripQueries = Depends()
):
    trip = repo.delete_trip(trip_id, user_id)
    if not trip:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")
    return trip
    
@router.put("/{trip_id}", response_model=TripOut)
async def update_trip(
    info: TripIn,
    trip_id: str,
    user_id: dict = Depends(authenticator.get_current_account_data),
    repo: TripQueries = Depends()
):
    trip = repo.update_trip(info, trip_id, user_id)
    if not trip:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")
    return trip

@router.post('/{trip_id}', response_model=StopOut)
async def create_stop(
    info: StopIn,
    trip_id: str,
    user_id: dict = Depends(authenticator.get_current_account_data),
    repo: TripQueries = Depends(),
    image: ImageQueries = Depends(),
):
    photo = image.get_image_by_city(info.city)
    stop = repo.create_stop(info, trip_id, user_id, photo)
    return stop

@router.get('/{trip_id}/stops/{stop_id}', response_model=StopOut)
async def get_stop(
    trip_id: str,
    stop_id: str,
    user_id: dict = Depends(authenticator.get_current_account_data),
    repo: TripQueries = Depends()
):
    stop = repo.get_stop(trip_id, stop_id, user_id)
    if not stop:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Stop not found")
    return stop

@router.put('/{trip_id}/stops/{stop_id}', response_model=StopOut | None)
async def update_stop(
    info: StopIn,
    trip_id: str,
    stop_id: str,
    user_id: dict = Depends(authenticator.get_current_account_data),
    repo: TripQueries = Depends()
): 
    return repo.update_stop(info, trip_id, stop_id, user_id)

@router.delete('/{trip_id}/stops/{stop_id}', response_model= bool)
async def delete_stop(
    trip_id: str,
    stop_id: str,
    user_id: dict = Depends(authenticator.get_current_account_data),
    repo: TripQueries = Depends()
):
    return repo.delete_stop(trip_id, stop_id, user_id)