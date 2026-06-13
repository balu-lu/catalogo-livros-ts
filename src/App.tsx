import { useState, useEffect } from 'react';
import { api } from './services/api';
import type { Book, BookInput } from './types/Book';
import { BookForm } from './components/BookForm';
import { BookList } from './components/BookList';

function App() {
  // Tipagem forte do array de livros
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // READ (GET)
  useEffect(() => {
    // função assíncrona DENTRO do useEffect
    const fetchBooks = async () => {
      try {
        const response = await api.get<Book[]>('');
        //states são atualizados APÓS o await (forma assíncrona)
        setBooks(response.data);
      } catch (err) {
        setError('Falha ao carregar os livros. Verifique se o link do CrudCrud expirou.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []); // Array vazio garante que rode apenas 1 vez ao montar o componente


  // CREATE (POST)
  const handleAddBook = async (newBook: BookInput) => {
    const response = await api.post<Book>('', newBook);
    // Atualiza o estado local adicionando o novo livro com _id
    setBooks((prev) => [response.data, ...prev]);
  };

  // DELETE
  const handleDeleteBook = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover este livro?')) return;
    
    try {
      await api.delete(`/${id}`);
      setBooks((prev) => prev.filter((book) => book._id !== id));
    } catch (err) {
      alert('Erro ao excluir o livro.');
      console.error(err);
    }
  };

  // UPDATE Opcional (PUT)
  const handleToggleStatus = async (book: Book) => {
    const novoStatus = book.status === 'Lido' ? 'Não lido' : 'Lido';
    
    try {
      // O crudcrud não aceita o _id no body do PUT
      const { _id, ...bookWithoutId } = book;
      const updatedBookData = { ...bookWithoutId, status: novoStatus };
      
      await api.put(`/${_id}`, updatedBookData);
      
      // Atualiza o estado local
      setBooks((prev) => 
        prev.map((b) => (b._id === _id ? { ...b, status: novoStatus } : b))
      );
    } catch (err) {
      alert('Erro ao atualizar o status.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 max-w-5xl mx-auto">
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Minha Biblioteca
        </h1>
        <p className="text-slate-400">Catálogo pessoal de leituras desenvolvido em React + TypeScript</p>
      </header>

      <main>
        <BookForm onAddBook={handleAddBook} />

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-700 pb-2">
            Meus Livros
          </h2>

          {loading ? (
            <div className="flex flex-col items-center py-20 text-emerald-500">
              <div className="animate-spin h-10 w-10 border-4 border-current border-t-transparent rounded-full mb-4"></div>
              <p className="text-slate-400 animate-pulse">Sincronizando biblioteca...</p>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-center">
              {error}
            </div>
          ) : (
            <BookList 
              books={books} 
              onDelete={handleDeleteBook} 
              onToggleStatus={handleToggleStatus} 
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;