from app.models import db, Stock, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_stocks():
    tesla = Stock(
        name='Tesla', symbol='TSLA', price=190.09, description='Tesla, Inc. engages in the design, development, manufacture, and sale of fully electric vehicles and energy generation and storage systems. It also provides vehicle service centers, Supercharger stations, and self-driving capability.', ceo='Elon Reeve Musk', employees=99290, headquarter='Austin, Texas', founded=2003)
    apple = Stock(
        name='Apple', symbol='AAPL', price=149.13, description='Apple, Inc. engages in the design, manufacture, and sale of smartphones, personal computers, tablets, wearables and accessories, and other varieties of related services. It operates through the following geographical segments: Americas, Europe, Greater China, Japan, and Rest of Asia Pacific.', ceo='Timothy Donald Cook', employees=164000, headquarter='Cupertino, California', founded=1976)
    google = Stock(
        name='Google', symbol='GOOGL', price=96.54, description='Alphabet, Inc. is a holding company, which engages in the business of acquisition and operation of different companies. It operates through the Google and Other Bets segments.', ceo='Sundar Pichai', employees=156500, headquarter='Mountain View, California', founded=2015)
    amc = Stock(
        name="AMC Entertainment", symbol="AMC", price=7.07, description="AMC Entertainment Holdings, Inc. engages in the theatrical exhibition business through its subsidiaries. It operates through the U.S. Markets and International Markets segments. The U.S. Markets segment is involved in owning, leasing, or operating theaters and screens in the U.S.", ceo="Adam M.Aron", employees=31198, headquarter="Leawood, Kansas", founded=1920)
    amazon = Stock(
        name="Amazon", symbol="AMZN", price=101.32, description="Amazon.com, Inc. is a multinational technology company, which engages in the provision of online retail shopping services. It operates through the following business segments: North America, International, and Amazon Web Services (AWS).", ceo="Andrew R. Jassy", employees=1608000, headquarter="Seattle, Washington", founded=1994)
    disney = Stock(
        name="Disney", symbol="DIS", price=95.27, description="The Walt Disney Co. is a diversified international family entertainment and media enterprise. It operates through the following segments: Disney Media and Entertainment Distribution (DMED) and Disney Parks, Experiences and Products (DPEP).", ceo="Robert A. Chapek", employees=190000, headquarter="Burbank, California", founded=1923)
    microsoft = Stock(
        name="Microsoft", symbol="MSFT", price=244.61, description="Microsoft Corp. engages in the development and support of software, services, devices, and solutions. It operates through the following business segments: Productivity and Business Processes, Intelligent Cloud, and More Personal Computing.", ceo="Satya Nadella", employees=221000, headquarter="Redmond, Washington", founded=1975)
    cocacola = Stock(
        name="Coca-Cola", symbol="KO", price=60.49, description="The Coca-Cola Co. is the nonalcoholic beverage company, which engages in the manufacture, market, and sale of non-alcoholic beverages which include sparkling soft drinks, water, enhanced water and sports drinks, juice, dairy and plant-based beverages, tea and coffee and energy drinks.", ceo="James Quincey", employees=79000, headquarter="Atlanta, Georgia", founded=1886)
    paypal = Stock(
        name="PayPal", symbol="PYPL", price=92.06, description="PayPal Holdings, Inc. engages in the development of technology platforms for digital payments. Its solutions include PayPal, PayPal Credit, Braintree, Venmo, Xoom, and Paydiant products.", ceo="Daniel H. Schulman", employees=30900, headquarter="San Jose, California", founded=1998)
    gm = Stock(
        name="GM", symbol="GM", price=41.01, description="General Motors Co. engages in the designing, manufacturing, and selling of cars, trucks and automobile parts. It also provides automotive financing services through General Motors Financial Company, Inc.", ceo="Mary Teresa Barra", employees=157000, headquarter="Detroit, Michigan", founded=1908)
    boeing = Stock(
        name="Boeing", symbol="BA", price=174.52, description="The Boeing Co. is an aerospace company, which engages in the manufacture of commercial jetliners and defense, space, and security systems. It operates through the following segments: Commercial Airplanes (BCA), Defense, Space and Security (BDS), Global Services (BGS), and Boeing Capital (BCC).", ceo="David L. Calhoun", employees=142000, headquarter="Arlington, Virginia", founded=1916)
    amd = Stock(
        name="AMD", symbol="AMD", price=77.46, description="Advanced Micro Devices, Inc. engages in the provision of semiconductor businesses. It operates through the following segments: Computing & Graphics, and Enterprise, Embedded and Semi-Custom.", ceo="Lisa T. Su", employees=15500, headquarter="Santa Clara, California", founded=1969)

    db.session.add(tesla)
    db.session.add(apple)
    db.session.add(google)
    db.session.add(amc)
    db.session.add(amazon)
    db.session.add(disney)
    db.session.add(microsoft)
    db.session.add(cocacola)
    db.session.add(paypal)
    db.session.add(gm)
    db.session.add(boeing)
    db.session.add(amd)

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
