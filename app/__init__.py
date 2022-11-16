import os
from flask import Flask, render_template, request, session, redirect, jsonify, make_response
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager, login_required, current_user
from .forms.new_watchlist_form import CreateWatchlistForm
from .models import db, User, Watchlist, Stock, Transaction, watched_stocks
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .seeds import seed_commands
from .config import Config
from sqlalchemy.orm import joinedload, sessionmaker


app = Flask(__name__, static_folder='../react-app/build', static_url_path='/')
# comment cass branch/second try
# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')



@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list


# @app.route('/testing')
# def api_testing():

#     user_watchlist = User.query.get(1)


#     print(user_watchlist.to_dict())
#     return user_watchlist.to_dict()

# ============ Get all users =============
@app.route('/users')
@login_required
def get_all_users():
    all_users = []
    data = User.query.all()
    for user in data:
        all_users.append(user.to_dict())
    return jsonify(all_users)

# =========== Get single user by id ==========
@app.route('/users/<int:id>')
@login_required
def get_user(id):
    # print(request, 'this is request')
    data = User.query.get(id).to_dict()
    return data

# ========== Update Buying Power ===========
# deposit/withdraw money should update buying power
# buying/selling stock should update buying power
@app.route('/users/<int:id>', methods=['PUT'])
@login_required
def update_buying_power(id):
    user = User.query.get(id)
    if not user:
        return {
            "message": "User not found",
            "statusCode": 404,
        }, 404
    data = request.get_json()
    user.buying_power = data['buying_power']
    db.session.commit()
    return 'update buying power testing'

# ============== Get all stocks ==============
@app.route("/stocks")
@login_required
def get_stocks():
    all_stocks = []
    data = Stock.query.all()
    for stock in data:
        all_stocks.append(stock.to_dict())
    return jsonify(all_stocks)

# ======== Get single stock by stock_id ==========
@app.route("/stocks/<int:stock_id>")
@login_required
def get_single_stock(stock_id):
    stock = Stock.query.get(stock_id)
    if not stock:
        return {
            "message": "Stock couldn't be found",
            "statusCode": 404,
        }, 404
    return stock.to_dict()

# ========== Get user's watchlists ==============
# route could be "api/watchlists/current" and how to get current user id
@app.route("/users/<int:user_id>/watchlists")
# @login_required
def get_user_watchlists(user_id):
    all_watchlists = []
    data = Watchlist.query.filter(Watchlist.user_id==user_id).all()
    for lst in data:
        all_watchlists.append(lst.to_dict())
        print(all_watchlists)
    return jsonify(all_watchlists)

# =============== Get watchlist by id ===============
@app.route("/watchlists/<int:id>")
# @login_required
def get_watchlist_by_id(id):
    watchlist = Watchlist.query.get(id)
    print(watchlist)
    if not watchlist:
        return {
            "message": "Watchlist not found",
            "statusCode": 404,
        }, 404
    return watchlist.to_dict()



# ========== Update a watchlist ===============
@app.route("/watchlists/<int:id>",methods=["PUT"])
# @login_required
def update_watchlist(id):
    watchlist = Watchlist.query.get(id)
    # if watchlist not founded:
    if not watchlist:
        return {
            "message": "Watchlist not found",
            "statusCode": 404,
        }, 404
    data = request.get_json()
    watchlist.name = data["name"]
    db.session.commit()
    return "update watchlist test"

# ========= Create new watchlist ==============
@app.route("/users/<int:user_id>/watchlists", methods=["POST"])
# @login_required
def post_new_watchlist(user_id):
    # ----------- Attempt 1 -------------could work
    data = request.get_json()
    new_list = Watchlist(
        user_id = user_id,
        name = data["name"]
    )

    db.session.add(new_list)
    db.session.commit()
    return new_list.to_dict()

# @app.route("/watchlists", methods=["POST"]).
# def post_new_watchlist():
#     form = CreateWatchlistForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         watchlist = Watchlist(
#             user_id=current_user.get_id(),
#             name=form.data['name']
#         )
#         db.session.add(watchlist)
#         db.session.commit()
#         return "new creating testing"

# ========= Delete a watchlist ==============
@app.route("/watchlists/<int:id>",methods=["DELETE"])
@login_required
def delete_watchlist(id):
    watchlist = Watchlist.query.get(id)
    db.session.delete(watchlist)
    db.session.commit()
    return "successfully delete watchlist"


# ========== Get all transations ============
@app.route("/users/<int:user_id>/transactions")
@login_required
def get_user_transactions(user_id):
    all_transations = []
    data = Transaction.query.filter(Transaction.user_id == user_id).all()
    for transation in data:
        all_transations.append(transation.to_dict())
    return jsonify(all_transations)

# ========= Create new transaction ==============
# might need to work something that changes our buying power when stocks are
# purchased/sold (PUT method somewhere? or even new route)
@app.route("/users/<int:user_id>/transactions", methods=["POST"])
@login_required
def post_new_transaction(user_id):
    data = request.get_json()
    new_transaction = Transaction(
        user_id = user_id,
        stock_id = data["stock_id"],
        quantity = data["quantity"],
        is_purchased = True,
        price = data["price"]
    )
    db.session.add(new_transaction)
    db.session.commit()
    return "testing post transaction"

# # ========= Update a transaction ==============
# @app.route("/transactions/<int:id>", methods=["PUT"])
# @login_required
# def update_transaction(id):
#     transaction = Transaction.query.get(id)
#     if not transaction:
#         return {
#             "message": "Transaction not found",
#             "statusCode": 404,
#         }, 404
#     data = request.get_json()
#     transaction.quantity = data["quantity"]


#     return "testing update transaction"


# ========= Delete a transaction ==============
@app.route("/transactions/<int:id>", methods=["DELETE"])
@login_required
def delete_transaction(id):
    transaction = Transaction.query.get(id)
    db.session.delete(transaction)
    db.session.commit()
    return "successfully delete transaction"


# # ============  Add stock into watchlist ===========
# @app.route("/users/watchlists/<int:watchlist_id>", methods=["PUT"])
# def add_stock_to_watchlist(watchlist_id):
#     watchlist = Watchlist.query.get(watchlist_id)



# # ============= Get all stocks of current user ===========
# @app.route("/api/stocks/current")
# def get_user_stocks():
#     # need current user id
#     return

# ========== ADD STOCK TO WATCHLIST ==========
@app.route('/watchlists/<int:watchlist_id>/<int:stock_id>', methods=['POST'])
# @login_required
def add_to_watchlist(watchlist_id, stock_id):
    watchlist = Watchlist.query.get(watchlist_id)
    stock = Stock.query.get(stock_id)
    print('watchlist from seed' , watchlist)

    data = request.get_json()

    new_list = watched_stocks.insert().values(
        watchlist_id = data['watchlist_id'],
        stock_id = data['stock_id'])

    db.session.execute(new_list)
    db.session.commit()
    return 'testing'

# ========== DELETE STOCK FROM WATCHLIST ==========
@app.route('/watchlists/<int:watchlist_id>/<int:stock_id>', methods=['DELETE'])
# @login_required
def delete_from_watchlist(watchlist_id, stock_id):
    stock = Stock.query.get(stock_id)
    print('stock from seed' , stock)

    db.session.delete(stock)
    db.session.commit()
    return 'stock deleted from watchlist'
