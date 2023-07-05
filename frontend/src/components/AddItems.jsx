import React, { useState } from 'react'
import axios from 'axios';

const AddItems = () => {
    const [dishid,setDish_id]=useState(0)
    const [dishName, setDishName] = useState('');
    const [price, setPrice] = useState(0);
    const [availability, setAvailability] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('https://flaskbackendapp.onrender.com/add', {
          dish_id:+dishid,
          dish_name: dishName,
          price: price,
          availability: availability,
        });
        console.log(response.data);
        alert('Congratulation'+response.data);
        
      } catch (error) {
        console.error('Error adding dish:', error);
      }
    };
  
    return (
      <div>
        <h2>Add Dish</h2>
        <form onSubmit={handleSubmit}>
        <label>
            Dish Id:
            <input
              type="number"
              value={dishid}
              onChange={(e) => setDish_id(e.target.value)}
            />
          </label>
          <br />
          <label>
            Dish Name:
            <input
              type="text"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <br />
          <label>
            Availability:
            <input
              type="text"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Add Dish</button>
        </form>
      </div>
    );
}

export default AddItems