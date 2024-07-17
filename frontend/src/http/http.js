import axios from 'axios';

export async function fetchProducts() {
  const response = await axios.get('/api/product');

  return response.data.body;
}

export async function fetchProduct(id) {
  const response = await axios.get(`/api/product/${id}`);

  return response.data.body;
}

export async function editProducts(id, data) {
  const response = await axios.put(`/api/product/${id}`, data);

  return response;
}

export async function postProducts(data) {
  const response = await axios.post('/api/product', data);

  return response;
}

export async function deleteProducts(id) {
  const response = await axios.delete(`/api/product/${id}`);

  return response;
}