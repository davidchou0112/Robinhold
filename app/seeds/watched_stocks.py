from app.models import db, watched_stocks, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_watched_stocks():
    list1 = watched_stocks.insert().values(
        watchlist_id=1, stock_id=1)
    list2 = watched_stocks.insert().values(
        watchlist_id=1, stock_id=2)
    list3 = watched_stocks.insert().values(
        watchlist_id=1, stock_id=8)
    list4 = watched_stocks.insert().values(
        watchlist_id=2, stock_id=4)
    list5 = watched_stocks.insert().values(
        watchlist_id=2, stock_id=5)
    list6 = watched_stocks.insert().values(
        watchlist_id=2, stock_id=9)


    db.session.execute(list1)
    db.session.execute(list2)
    db.session.execute(list3)
    db.session.execute(list4)
    db.session.execute(list5)
    db.session.execute(list6)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_watched_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watched_stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM watched_stocks")

    db.session.commit()
