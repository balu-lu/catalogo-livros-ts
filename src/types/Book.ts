export type BookStatus = 'Lido' | 'Não lido';

export interface Book {
  _id: string; // O CrudCrud gera o ID com underline
  title: string;
  author: string;
  status: BookStatus;
}

// Omitir o _id pois a API quem gera
export type BookInput = Omit<Book, '_id'>;