import {
   FETCH_PRODUCT_SUCCESS,
   FETCH_PRODUCT_PROGRESS,
   FETCH_PRODUCT_ERROR,
   ADD_TO_CART,
   CHANGE_SCREEN,
   INCREASE_COUNT
  } from './actionType';

  interface action {
    type: string,
    payload?: any
  }
  
  const INITIAL_STATE: any = {
    products: {
      response: [],
      error: false,
      success: false,
    },
    showCart: false
  };
  
  export default function mainReducer(state = INITIAL_STATE, action: action) {
    switch (action.type) {
        case FETCH_PRODUCT_SUCCESS:
            return{
                ...state,
                products:{
                    response: manipulateData(action.payload),
                    success: true,
                    error: false
                }
            }
        case ADD_TO_CART:
            return{
                ...state,
                products:{
                    ...state.products,
                    response:onPressAddtoCart(state.products.response, action.payload),
                }
            }
        case CHANGE_SCREEN:
            return{
                ...state,
                showCart: !state.showCart
            }
        
        case INCREASE_COUNT:
            return{
                ...state,
                products:{
                    ...state.products,
                    response:updateCount(state.products.response, action.payload),
                }
            }
  
      default:
        return state;
    }
  }

  function updateCount(state: any[], payload: {id: number, add: boolean}){
    return state.map((item: any)=>{
        if(item.id == payload.id){
            return{
                ...item,
                count: payload.add? item.count + 1: item.count - 1
            }
        } else return item
    })
  }

  function onPressAddtoCart(state: any[], payload: number){
    return state.map((item: any)=>{
        if(item.id == payload){
            return{
                ...item,
                isAdded: true
            }
        } else return item
    })
  }

  function manipulateData(dataArray: []){
    return dataArray.map((item:any) =>{
        return{
            ...item,
            isAdded: false,
            count: 1
        }
    })
  }
  