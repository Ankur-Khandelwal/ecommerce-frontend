/* eslint-disable import/no-anonymous-default-export */
import { productConstants } from '../actions/constants';

const initialState = {
  products: [],
  loading: false,
  error: null
}

const updateProducts = (products, newProduct) => {
  return [
    ...products,
    {
      _id: newProduct._id,
      name: newProduct.name,
      price: newProduct.price,
      stock: newProduct.stock,
      productPictures: newProduct.productPictures,
      description: newProduct.description,
      category: newProduct.category
    }
  ]
}

export default (state = initialState, action) => {
  switch (action.type){
    case productConstants.GET_ALL_PRODUCTS_REQUEST:
      
      state={
        ...state,
        loading: true
      }
      break;
    case productConstants.GET_ALL_PRODUCTS_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
        loading: false
      }
      break;
    case productConstants.GET_ALL_PRODUCTS_FAILURE:
      state={
        ...state,
        error: action.payload.error,
        loading: false
      }
      break;
      case productConstants.ADD_NEW_PRODUCT_REQUEST:
        console.log(action);
        state = {
          ...state,
          loading: true
        }
        break;
      case productConstants.ADD_NEW_PRODUCT_SUCCESS:
        console.log(action.payload);
        const newProduct = action.payload.product
        const updatedProducts = updateProducts(state.products, newProduct);
        state = {
          ...state,
          products: updatedProducts,
          loading: false
        }
        break;
      case productConstants.ADD_NEW_PRODUCT_FAILURE:
        state = {
          ...state,
          error: action.payload.error,
          loading: false
        }
        break;

    default: 
      break;  
  }
  return state;
}