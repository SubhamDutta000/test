import dispatchResponseToReducers from '../utils/actionDispatcher';
import { getProducts } from '../utils/api';
import {
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_PROGRESS,
    FETCH_PRODUCT_ERROR,
    ADD_TO_CART,
    INCREASE_COUNT,
    CHANGE_SCREEN,
    REMOVE_FROM_CART
   } from './actionType';

export const fetchProducts: any = () =>
  dispatchResponseToReducers(
    getProducts.bind(this),
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_ERROR,
    FETCH_PRODUCT_PROGRESS,
  );

export const addToCart = (id: number) =>{
    return{
        type: ADD_TO_CART,
        payload: {id}
    }
}

export const increaseCount = (id: number, add: boolean) =>{
    return{
        type: INCREASE_COUNT,
        payload: {id, add}
    }
}


export const toggleScreen = (showCart: boolean) =>{
    return{
        type: CHANGE_SCREEN,
        payload: showCart
    }
}

export const removeFromCart = (id: number) =>{
    return{
        type: REMOVE_FROM_CART,
        payload: {id}
    }
}