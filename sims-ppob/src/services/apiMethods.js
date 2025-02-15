import apiRequest from "./api";

const apiMethods = {
  get: (url, params = {}) => apiRequest.get(url, { params }),
  post: (url, data) => apiRequest.post(url, data),
  put: (url, data) => apiRequest.put(url, data),
  delete: (url) => apiRequest.delete(url),
};

export default apiMethods;
