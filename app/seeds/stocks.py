from app.models import db, Stock, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_stocks():
    tesla = Stock(
        name='Tesla', symbol='TSLA', price=190, description='Tesla, Inc. engages in the design, development, manufacture, and sale of fully electric vehicles and energy generation and storage systems. It also provides vehicle service centers, Supercharger stations, and self-driving capability.', ceo='Elon Reeve Musk', employees=99290, headquarter='Austin, Texas', founded=2003)
    apple = Stock(
        name='Apple', symbol='APPL', price=149, description='Apple, Inc. engages in the design, manufacture, and sale of smartphones, personal computers, tablets, wearables and accessories, and other varieties of related services. It operates through the following geographical segments: Americas, Europe, Greater China, Japan, and Rest of Asia Pacific.', ceo='Timothy Donald Cook', employees=164000, headquarter='Cupertino, California', founded=1976)
    google = Stock(
        name='Google', symbol='GOOGL', price=96, description='Alphabet, Inc. is a holding company, which engages in the business of acquisition and operation of different companies. It operates through the Google and Other Bets segments.', ceo='Sundar Pichai', employees=156500, headquarter='Mountain View, California', founded=2015)
    amc = Stock(
        name="AMC Entertainment", symbol="AMC", price=7.07, description="AMC Entertainment Holdings, Inc. engages in the theatrical exhibition business through its subsidiaries. It operates through the U.S. Markets and International Markets segments. The U.S. Markets segment is involved in owning, leasing, or operating theaters and screens in the U.S.", ceo="Adam M.Aron", employees=31198, headquarter="Leawood, Kansas", founded=1920)
    db.session.add(tesla)
    db.session.add(apple)
    db.session.add(google)
    db.session.add(amc)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM stocks")

    db.session.commit()
