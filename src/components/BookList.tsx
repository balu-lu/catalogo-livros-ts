import type { Book } from '../types/Book';
import { BookItem } from './BookItem';

interface BookListProps {
  books: Book[];
  onDelete: (id: string) => void;
  onToggleStatus: (book: Book) => void;
}

export function BookList({ books, onDelete, onToggleStatus }: BookListProps) {
  if (books.length === 0) {
    return (
      <div className="text-center py-12 rounded-2xl border border-dashed border-slate-700 bg-slate-800/20">
        <p className="text-slate-400">Nenhum livro cadastrado na sua biblioteca.</p>
        <p className="text-sm text-slate-500 mt-1">Adicione um novo livro acima para começar.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookItem 
          key={book._id} 
          book={book} 
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
}