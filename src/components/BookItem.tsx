import type { Book } from '../types/Book';

interface BookItemProps {
  book: Book;
  onDelete: (id: string) => void;
  onToggleStatus: (book: Book) => void;
}

export function BookItem({ book, onDelete, onToggleStatus }: BookItemProps) {
  const isLido = book.status === 'Lido';

  return (
    <div className="flex flex-col justify-between p-5 rounded-xl bg-slate-800 border border-slate-700 shadow-md transition-transform hover:-translate-y-1">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-100 line-clamp-1" title={book.title}>
            {book.title}
          </h3>
          <span 
            className={`text-xs px-2 py-1 rounded-full font-semibold whitespace-nowrap ${
              isLido ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-300'
            }`}
          >
            {book.status}
          </span>
        </div>
        <p className="text-sm text-slate-400 mb-6">{book.author}</p>
      </div>

      <div className="flex gap-2 mt-auto">
        <button
          onClick={() => onToggleStatus(book)}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
            isLido 
              ? 'bg-slate-700 hover:bg-slate-600 text-white' 
              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
          }`}
        >
          Marcar como {isLido ? 'Não lido' : 'Lido'}
        </button>
        <button
          onClick={() => onDelete(book._id)}
          className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
          title="Excluir livro"
        >
          ✕
        </button>
      </div>
    </div>
  );
}