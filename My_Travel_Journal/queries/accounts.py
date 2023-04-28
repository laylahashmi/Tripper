from pydantic import BaseModel
from queries.client import Queries


class DuplicateAccountError(ValueError):
    pass

class AccountIn(BaseModel):
    first_name: str
    last_name: str
    username: str
    email: str
    password: str

class AccountOut(BaseModel):
    id: str
    first_name: str
    last_name: str
    username: str
    email: str

class AccountOutWithPassword(AccountOut):
    hashed_password: str

class AccountQueries(Queries):

    COLLECTION = "accounts"
    
    def get(self, username: str) -> AccountOutWithPassword: 
        account = self.collection.find_one({'username': username})
        if account is None:
            return None
        account['id'] = str(account['_id'])
        return AccountOutWithPassword(**account)
        
        
    
    def create(self, info: AccountIn, hashed_password: str) -> AccountOutWithPassword:
        account = info.dict()
        del account['password']
        account['hashed_password'] = hashed_password
        if self.get(account['username']) is not None:
            raise DuplicateAccountError
        self.collection.insert_one(account)
        account['id'] = str(account['_id'])
        return AccountOutWithPassword(**account)
        

       
    