import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [statusChoice, setStatusChoice] = useState('');
  const [dishIds, setDishIds] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://flaskbackendapp.onrender.com/orders', {
        dish_ids: dishIds.split(",").map((id) => id.trim()),
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://flaskbackendapp.onrender.com/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`https://flaskbackendapp.onrender.com/orders/${orderId}`, {
        status: newStatus,
      });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleFilterByStatus = async () => {
    try {
      const response = await axios.get(
        `https://flaskbackendapp.onrender.com/orders/${statusChoice}`
      );
      setOrders(response.data);
    } catch (error) {
      console.error('Error filtering orders:', error);
    }
  };

  return (
    <div>
      <h2>Order Management</h2>

      <div>
        <label>
          Filter by Status:
          <select value={statusChoice} onChange={(e) => setStatusChoice(e.target.value)}>
            <option value="">All</option>
            <option value="received">Received</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <button onClick={handleFilterByStatus}>Filter</button>
      </div>

      <h3>Orders</h3>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <div>Order ID: {order.id}</div>
              <div>Status: {order.status}</div>
              <div>Total Price: {order.total_price}</div>

              {order.dishes.length === 0 ? (
                <p>No dishes in this order.</p>
              ) : (
                <ul>
                  {order.dishes.map((dish) => (
                    <li key={dish.dish_id}>{dish.dish_name}</li>
                  ))}
                </ul>
              )}

              <div>
                Change Status:
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  <option value="received">Received</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <label>
          Dish IDs (comma-separated):
          <input
            type="number"
            value={dishIds}
            onChange={(e) => setDishIds(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Order;
