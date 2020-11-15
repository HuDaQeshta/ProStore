import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  CREATE_PRODUCT_REVIEW_REQUEST,
  CREATE_PRODUCT_REVIEW_SUCCESS,
  CREATE_PRODUCT_REVIEW_FAIL,
  CREATE_PRODUCT_REVIEW_RESET,
  TOP_PRODUCTS_REQUEST,
  TOP_PRODUCTS_SUCCESS,
  TOP_PRODUCTS_FAIL,
} from "../constants/productConstants";

const productListReducer = (state = { products: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS_REQUEST:
      return {
        products: [],
        loading: true,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        products: payload.products,
        pages: payload.pages,
        page: payload.page,
        loading: false,
      };
    case GET_PRODUCTS_FAIL:
      return {
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

const productDetailsReducer = (
  state = { product: { imgs: [], reviews: [] } },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCT_REQUEST:
      return {
        product: {},
        loading: true,
      };
    case GET_PRODUCT_SUCCESS:
      return {
        product: payload,
        loading: false,
      };
    case GET_PRODUCT_FAIL:
      return {
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

const productDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case DELETE_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        success: true,
        loading: false,
      };
    case DELETE_PRODUCT_FAIL:
      return {
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

const productCreateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        success: true,
        product: payload,
        loading: false,
      };
    case CREATE_PRODUCT_FAIL:
      return {
        error: payload,
        loading: false,
      };
    case CREATE_PRODUCT_RESET:
      return {};

    default:
      return state;
  }
};

const productUpdateReducer = (state = { product: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        success: true,
        product: payload,
        loading: false,
      };
    case UPDATE_PRODUCT_FAIL:
      return {
        error: payload,
        loading: false,
      };
    case UPDATE_PRODUCT_RESET:
      return { product: {} };

    default:
      return state;
  }
};

const productCreateReviewReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_PRODUCT_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case CREATE_PRODUCT_REVIEW_SUCCESS:
      return {
        success: true,
        loading: false,
      };
    case CREATE_PRODUCT_REVIEW_FAIL:
      return {
        error: payload,
        loading: false,
      };
    case CREATE_PRODUCT_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

const productTopRatedReducer = (state = { products: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOP_PRODUCTS_REQUEST:
      return {
        products: [],
        loading: true,
      };
    case TOP_PRODUCTS_SUCCESS:
      return {
        products: payload,
        loading: false,
      };
    case TOP_PRODUCTS_FAIL:
      return {
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productCreateReviewReducer,
  productTopRatedReducer,
};
