from typing import Optional
from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email: EmailStr
    role: str

class UserCreate(UserBase):
    password: str
    first_name: str
    last_name: str

class User(UserBase):
    id: int
    is_active: bool
    
    class Config:
        orm_mode = True

class PatientBase(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: str
    gender: str

class PatientCreate(PatientBase):
    contact_number: str
    address: str
    email: EmailStr
    medical_history: Optional[str] = None

class Patient(PatientBase):
    patient_id: int
    created_at: str
    
    class Config:
        orm_mode = True

# 其他Pydantic模型...