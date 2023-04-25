import requests
import os

PEXELS_API_KEY= os.environ['PEXELS_API_KEY']

class ImageQueries:
    base_url = 'https://api.pexels.com/v1/search?query='
    headers = {'Authorization': PEXELS_API_KEY}
    def get_image_by_city(self, city: str):
        response = requests.get(self.base_url + f'{city}', headers=self.headers)
        return response.json()