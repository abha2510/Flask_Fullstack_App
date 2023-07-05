import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../Css/Menu.css";


const Menu = () => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    getMenuData();
  }, []);

  const getMenuData = async () => {
    try {
      const response = await axios.get('https://flaskbackendapp.onrender.com/menu');
      setMenuData(response.data);
    } catch (error) {
      console.error('Error retrieving menu:', error);
    }
  };

  return (
    <div>
      <h2>Menu</h2>
      <div className='menuContainer'>
        {menuData.map((dish) => (
            <div key={dish.dish_id} className='menu'>
                <p>Id:{dish.dish_id}</p>
                <h3>Name:{dish.dish_name}</h3>
                <p>Price{dish.price}</p>
                <p>Availability:{dish.availability}</p>
            </div>
          
        ))}
      </div>
    </div>
  );
};

export default Menu;
