from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password):
    return pwd_context.hash(password)

print("Alice1290 →", hash_password("Alice1290"))
print("Bobxd10 →", hash_password("Bobxd10"))
print("Admin1212 →", hash_password("Admin1212"))
print("CharlieBarlie →", hash_password("CharlieBarlie"))
print("Diana2004 →", hash_password("Diana2004"))
print("Ethan2024 →", hash_password("Ethan2024"))
print("FionaCool →", hash_password("FionaCool"))
print("Grace888 →", hash_password("Grace888"))
print("HenryStrong →", hash_password("HenryStrong"))
print("IsaSmart →", hash_password("IsaSmart"))
