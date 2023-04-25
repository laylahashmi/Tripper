from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List
from queries.pexels import ImageQueries

router = APIRouter();

class ImageOut(BaseModel):
    photos: List

@router.get('/api/pexels/{city}', response_model=ImageOut)
def get_image(
    city: str,
    queries: ImageQueries = Depends()
):
    return queries.get_image_by_city(city)