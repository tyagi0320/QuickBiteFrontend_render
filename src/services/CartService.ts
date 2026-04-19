// import axios from 'axios';
// import { TokenService } from './TokenService';
// const BASE_URL = import.meta.env.VITE_BASE_URL;


// export const CartService = {
//   async addToCart(food_id: number, quantity: number = 1) {
//     const token = TokenService.getAccessToken();
//     const res = await axios.post(`${BASE_URL}/cart/add`, 
//       { food_id, quantity }, 
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     return res.data;
//   },

//   async getCartItems() {
//     const token = TokenService.getAccessToken();
//     const res = await axios.get(`${BASE_URL}/cart/`, { 
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     return res.data;
//   },

//   async updateCart(cart_id: number, quantity: number) {
//     const token = TokenService.getAccessToken();
//     const res = await axios.put(
//       `${BASE_URL}/cart/${cart_id}?quantity=${quantity}`, 
//       {}, 
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     return res.data;
//   },

//   async removeFromCart(cart_id: number, tokenOverride?: string) {
//   const token = tokenOverride || TokenService.getAccessToken();
//   const res = await axios.delete(`${BASE_URL}/cart/${cart_id}`, { 
//     headers: { Authorization: `Bearer ${token}` }

import axios from 'axios';
import { TokenService } from './TokenService';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const CartService = {

  async addToCart(food_id: number, quantity: number = 1) {
    const token = TokenService.getAccessToken();

    // 🔍 DEBUG
    console.log("ADD TO CART TOKEN:", token);

    if (!token) {
      throw new Error("No token found. User not logged in.");
    }

    const res = await axios.post(
      `${BASE_URL}/cart/add`,
      { food_id, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return res.data;
  },


  async getCartItems() {
    const token = TokenService.getAccessToken();

    // 🔍 DEBUG
    console.log("GET CART TOKEN:", token);

    if (!token) {
      throw new Error("No token found. User not logged in.");
    }

    const res = await axios.get(`${BASE_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data;
  },


  async updateCart(cart_id: number, quantity: number) {
    const token = TokenService.getAccessToken();

    console.log("UPDATE CART TOKEN:", token);

    if (!token) {
      throw new Error("No token found. User not logged in.");
    }

    const res = await axios.put(
      `${BASE_URL}/cart/${cart_id}?quantity=${quantity}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return res.data;
  },


  async removeFromCart(cart_id: number, tokenOverride?: string) {
    const token = tokenOverride || TokenService.getAccessToken();

    console.log("REMOVE CART TOKEN:", token);

    if (!token) {
      throw new Error("No token found. User not logged in.");
    }

    const res = await axios.delete(`${BASE_URL}/cart/${cart_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data;
  }
};
//   });
//   return res.data;
// }
// };
