import os
import json
from flask import Flask, request,jsonify,make_response
from flask_cors import CORS

app = Flask(__name__)
allowed_origins = os.environ.get("ALLOWED_ORIGINS") 
cors = CORS(app, resources={r"/*": {"origins": allowed_origins.split(",")}})
menu_file = "menu.json"
orders_file = "orders.json"

menu = []
orders = []
order_id_counter = 1

def clear_screen():
    os.system("cls" if os.name == "nt" else "clear")

    
@app.route('/',methods=["GET"]) 
def index():
    response = make_response('Welcome')
    response.status_code = 200
    return response

@app.route("/menu", methods=["GET"])
def get_menu():
    with open(menu_file) as file:
        menu_data = json.load(file)
    return json.dumps(menu_data)


@app.route("/add", methods=["POST"])
def add_dish():
    dish = request.get_json()
    menu.append(dish)
    save_data()
    return "Dish added to the menu."

# {
#   "dish_id":2,
#   "dish_name":"idli",
#   "price":40,
#   "availability":"no"
# }

@app.route("/menu/<dish_id>", methods=["DELETE"])
def remove_dish(dish_id):
    for dish in menu:
        if dish["dish_id"] == int(dish_id):
            menu.remove(dish)
            save_data()
            return "Dish removed from the menu."
    return "Dish not found in the menu."


@app.route("/menu/<dish_id>", methods=["PUT"])
def update_availability(dish_id):
    for dish in menu:
        if dish["id"] == dish_id:
            dish["availability"] = not dish["availability"]
            save_data()
            return "Availability updated."
    return "Dish not found in the menu."


@app.route("/orders", methods=["POST"])
def take_order():
    order = request.get_json()
    dish_ids = order.get("dish_ids", [])
    ordered_dishes = []
    total_price = 0

    if not dish_ids:
        return "No dish IDs provided.", 400

    for dish_id in dish_ids:
      valid_dish = False
    for dish in menu:
      if dish["dish_id"] == int(dish_id) and dish["availability"] == "yes":
        ordered_dishes.append(dish)
        total_price += dish["price"]
        valid_dish = True
        break


    if not valid_dish:
        return f"Invalid dish ID: {dish_id} or dish is not available.", 400


    order["id"] = len(orders) + 1
    order["dishes"] = ordered_dishes
    order["status"] = "Received"
    order["total_price"] = total_price
    orders.append(order)
    save_data()

    return "Order placed successfully."



@app.route("/orders/<int:order_id>", methods=["PUT"])
def update_order_status(order_id):
    status_choice = request.get_json()["status"]
    for order in orders:
        if order["id"] == order_id:
            order["status"] = status_choice
            save_data()
            return "Status updated."
    return "Order not found."

@app.route("/orders", methods=["GET"])
def review_orders():
    return json.dumps(orders)

@app.route("/orders/<status_choice>", methods=["GET"])
def filter_orders_by_status(status_choice):
    filtered_orders = [order for order in orders if order["status"].lower() == status_choice.lower()]
    return json.dumps(filtered_orders)

def load_data():
    global menu, orders, order_id_counter

    with open(menu_file) as file:
        menu_data = json.load(file)
        menu = menu_data

    with open(orders_file) as file:
        orders = json.load(file)

    order_id_counter = len(orders)


def save_data():
    with open(menu_file, 'w') as file:
        json.dump(menu, file, indent=4)

    with open(orders_file, 'w') as file:
        json.dump(orders, file, indent=4)



if __name__ == "__main__":
    
    app.run()
