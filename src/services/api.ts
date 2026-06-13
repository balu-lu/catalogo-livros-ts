// src/services/api.ts
import axios from 'axios';

// COLE AQUI A SUA URL GERADA NO CRUDCRUD (adicione /livros no final)
const API_BASE_URL = 'https://crudcrud.com/api/SEU_HASH_AQUI/livros';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});