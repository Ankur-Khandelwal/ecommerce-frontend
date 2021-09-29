import axios from '../helpers/axios';
import { productConstants } from './constants';

export const getAllProducts = () => {
  return async (dispatch) => {
    dispatch({ 
      type: productConstants.GET_ALL_PRODUCTS_REQUEST
    })
    const res = await axios.get('/product/getProducts');
    if(res.status === 200){
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
        payload: {
          products: res.data.products
        }
      })
    }
    else{
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_FAILURE,
        payload: {
          error: res.data.error
        }
      })
    }
  }
}

export const addProduct = (data) => {
  console.log("Inside Product Actions");
  return async dispatch => {
    dispatch({
      type: productConstants.ADD_NEW_PRODUCT_REQUEST
    });
    const res = await axios.post('/product/create', data);
    if(res.status === 201){
      dispatch({
        type: productConstants.ADD_NEW_PRODUCT_SUCCESS,
        payload: {
          product: res.data.product
        }
      })
    }else{
      dispatch({
        type: productConstants.ADD_NEW_PRODUCT_FAILURE,
        payload: {
          error: res.data.error
        }
      })
    }
  }
}