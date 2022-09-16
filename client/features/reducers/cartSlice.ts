import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item: any) => item.product_name === action.payload.product_name,
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity,
        };
        console.info('Increased product quantity');
      } else {
        let tempProductItem = {...action.payload, cartQuantity: 1};
        state.cartItems.push(tempProductItem);
        console.log('Product added to cart');
        AsyncStorage.setItem('cartItems', JSON.stringify(tempProductItem));
      }
      AsyncStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    IncreseCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item: any) => item.product_name === action.payload.product_name,
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
        console.info('Increased product quantity');
      } else {
        let tempProductItem = {...action.payload, cartQuantity: 1};
        state.cartItems.push(tempProductItem);
        console.log('Product added to cart');
        AsyncStorage.setItem('cartItems', JSON.stringify(tempProductItem));
      }
      AsyncStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item: any) => item.product_name === action.payload.product_name,
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        console.info('Decreased product quantity');
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item: any) => item.product_name !== action.payload.product_name,
        );

        state.cartItems = nextCartItems;

        console.error('Product removed from cart', {
          position: 'bottom-left',
        });
      }

      AsyncStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem: any) => {
        if (cartItem.product_name === action.payload.product_name) {
          const nextCartItems = state.cartItems.filter(
            (item: any) => item.product_name !== cartItem.product_name,
          );

          state.cartItems = nextCartItems;

          console.error('Product removed from cart', {
            position: 'bottom-left',
          });
        }
        AsyncStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        return state;
      });
    },
    getTotals(state, action) {
      let {total, quantity} = state.cartItems.reduce(
        (cartTotal: any, cartItem: any) => {
          const {price, cartQuantity} = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        },
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state, action) {
      state.cartItems = [];
      AsyncStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      console.error('Cart cleared', {position: 'bottom-left'});
    },
  },
});

export const {
  addToCart,
  decreaseCart,
  removeFromCart,
  getTotals,
  clearCart,
  IncreseCart,
} = cartSlice.actions;

export default cartSlice.reducer;
