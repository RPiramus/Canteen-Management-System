from sqlalchemy import create_engine, MetaData

DATABASE_URL = "sqlite:///../Database/foodsys.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

meta = MetaData()
conn = engine.connect()