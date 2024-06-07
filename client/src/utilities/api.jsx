import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'https://beauty-buddy-7f3e1b864c30.herokuapp.com'; 

export const getQuestionnaire = () => {
  return axios.get(`${API_URL}/questionnaire`);
};

export const getRoutines = () => {
  return axios.get(`${API_URL}/routines`);
};

export const addRoutine = (routine) => {
  return axios.post(`${API_URL}/routines`, routine);
};

export const updateRoutine = (id, routine) => {
  return axios.put(`${API_URL}/routines/${id}`, routine);
};

export const deleteRoutine = (id) => {
  return axios.delete(`${API_URL}/routines/${id}`);
};

export const getProductTracking = () => {
  return axios.get(`${API_URL}/product-tracking`);
};

export const addProductTracking = (product) => {
  return axios.post(`${API_URL}/product-tracking`, product);
};

export const updateProductTracking = (id, product) => {
  return axios.put(`${API_URL}/product-tracking/${id}`, product);
};

export const deleteProductTracking = (id) => {
  return axios.delete(`${API_URL}/product-tracking/${id}`);
};
