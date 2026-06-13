import { useState } from 'react';
import type { BookInput, BookStatus } from '../types/Book';

interface BookFormProps {
  onAddBook: (book: BookInput) => Promise<void>;
}

export function BookForm({ onAddBook }: BookFormProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState<BookStatus>('Não lido');
  
  const [erro, setErro] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !author.trim()) {
      setErro('Por favor, preencha o título e o autor.');
      return;
    }

    setErro('');
    setIsSubmitting(true);

    try {
      await onAddBook({
        title: title.trim(),
        author: author.trim(),
        status
      });
      // Limpa formulário após sucesso
      setTitle('');
      setAuthor('');
      setStatus('Não lido');
    } catch {
      setErro('Erro ao cadastrar livro. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 rounded-2xl bg-slate-800/50 p-6 border border-slate-700 backdrop-blur-md shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-emerald-400">Novo Livro</h2>
      
      {erro && (
        <div className="mb-4 rounded-lg bg-red-500/10 p-3 border border-red-500/50 text-red-400 text-sm">
          {erro}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            placeholder="Ex: O Senhor dos Anéis"
          />
        </div>
        
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Autor</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            placeholder="Ex: J.R.R. Tolkien"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as BookStatus)}
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          >
            <option value="Não lido">Não lido</option>
            <option value="Lido">Lido</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Salvando...' : 'Adicionar ao Catálogo'}
        </button>
      </div>
    </form>
  );
}
