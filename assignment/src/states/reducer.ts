import {
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_PROGRESS,
  FETCH_PRODUCT_ERROR,
  ADD_TO_CART,
  CHANGE_SCREEN,
  INCREASE_COUNT,
  REMOVE_FROM_CART,
} from './actionType';

interface action {
  type: string;
  payload?: any;
}

const INITIAL_STATE: any = {
  products: {
    response: [],
    error: false,
    success: false,
  },
  showCart: false,
  loading: false
};

export default function mainReducer(state = INITIAL_STATE, action: action) {
  switch (action.type) {
    case FETCH_PRODUCT_PROGRESS:
        return {
          ...state,
         loading: true
        };
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        products: {
          response: manipulateData(action.payload),
          success: true,
          error: false,
        },
        loading: false
      };
      case FETCH_PRODUCT_ERROR:
        return {
          ...state,
          products: {
            response: [],
            success: false,
            error: true,
          },
          loading: false
        };
    case ADD_TO_CART:
      return {
        ...state,
        products: {
          ...state.products,
          response: updateCount(state.products.response, {...action.payload, add: true}),
        },
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        products: {
          ...state.products,
          response: updateCount(state.products.response, {...action.payload, add: false}, true),
        },
      };
    case CHANGE_SCREEN:
      return {
        ...state,
        showCart: action.payload ,
      };

    case INCREASE_COUNT:
      return {
        ...state,
        products: {
          ...state.products,
          response: updateCount(state.products.response, action.payload),
        },
      };

    default:
      return state;
  }
}

function updateCount(state: any[], payload: {id: number; add: boolean}, removing?: boolean) {
  return state.map((item: any) => {
    if (item.id == payload.id) {
      return {
        ...item,
        count:removing? 0 : payload.add ? item.count + 1 : item.count - 1,
      };
    } else return item;
  });
}

function manipulateData(dataArray: []) {
  return dataArray.map((item: any) => {
    return {
      ...item,
      isAdded: false,
      count: 0,
    };
  });
}
