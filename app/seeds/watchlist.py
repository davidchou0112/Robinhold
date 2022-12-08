from app.models import db, Watchlist, environment, SCHEMA


def seed_watchlists():
    watchlist1 = Watchlist(
        user_id=1, name='SP500')
    watchlist2 = Watchlist(
        user_id=1, name='Long-term')
    watchlist3 = Watchlist(
        user_id=1, name='Short-term')

    db.session.add(watchlist1)
    db.session.add(watchlist2)
    db.session.add(watchlist3)
    db.session.commit()


def undo_watchlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM watchlists")

    db.session.commit()
