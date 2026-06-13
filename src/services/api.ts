// src/services/api.ts
import axios from 'axios';

// COLE AQUI A SUA URL GERADA NO CRUDCRUD (adicione /livros no final)
const API_BASE_URL = 'https://crudcrud.com/api/c4c14408976e4ae7a66cc7991d9ab182/livros';

export const api = axios.create({
  baseURL: API_BASE_URL,
});
