export const API_CONFIG = {
  baseURL: 'https://automationexercise.com/api',
  endpoints: {
    productsList: '/productsList',
    brandList: '/brandsList',
    searchProduct: '/searchProduct',
    verifyLogin: '/verifyLogin',
    createAccount: '/createAccount',
    deleteAccount: '/deleteAccount',
    updateAccount: '/updateAccount',
    getUserDetailByEmail: '/getUserDetailByEmail',
  },
};

// Build the URL for the APIs
export const API_URLS = {
  productsList: API_CONFIG.baseURL + API_CONFIG.endpoints.productsList,
  brandList: API_CONFIG.baseURL + API_CONFIG.endpoints.brandList,
  searchProduct: API_CONFIG.baseURL + API_CONFIG.endpoints.searchProduct,
  verifyLogin: API_CONFIG.baseURL + API_CONFIG.endpoints.verifyLogin,
  createAccount: API_CONFIG.baseURL + API_CONFIG.endpoints.createAccount,
  deleteAccount: API_CONFIG.baseURL + API_CONFIG.endpoints.deleteAccount,
  updateAccount: API_CONFIG.baseURL + API_CONFIG.endpoints.updateAccount,
  getUserDetailByEmail: API_CONFIG.baseURL + API_CONFIG.endpoints.getUserDetailByEmail,
};
