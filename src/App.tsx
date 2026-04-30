import { useEffect, useState } from 'react';
import { BookCard } from './components/BookCard';

interface Book {
  id: number;
  title: string;
  isbn: string;
  pageCount: number;
  authors: string[];
}

interface BookWithCover extends Book {
  coverUrl: string;
}

function App() {
  const [books, setBooks] = useState<BookWithCover[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Функция для задержки (чтобы не превысить лимиты API)
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Запрос к API книг...');
        const response = await fetch('https://fakeapi.extendsclass.com/books');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const booksData: Book[] = await response.json();
        console.log('Получено книг:', booksData.length);

        const booksWithCovers: BookWithCover[] = [];

        // Обрабатываем книги ПО ОДНОЙ с задержкой
        for (let i = 0; i < booksData.length; i++) {
          const book = booksData[i];
          console.log(`Обработка книги ${i + 1}/${booksData.length}: ${book.title}`);

          try {
            // Очищаем ISBN от лишних символов
            const cleanIsbn = book.isbn.replace(/[-\s]/g, '');

            // Проверяем, что ISBN не пустой
            if (!cleanIsbn) {
              console.warn(`Книга "${book.title}" не имеет ISBN`);
              booksWithCovers.push({ ...book, coverUrl: '' });
              continue;
            }
            //API Key для проекта
            const APIkey = 'AIzaSyA2YuB1O1dv2oVUyw10T_k4msjT76kEtOI';
            
            // Запрос к Google Books API с правильным ISBN
            const googleRes = await fetch(
              `https://www.googleapis.com/books/v1/volumes?q=isbn:${cleanIsbn}&key=${APIkey}`
            );

            // Если получен 429, ждем дольше
            if (googleRes.status === 429) {
              console.warn('Превышен лимит запросов. Ждем 2 секунды...');
              await delay(2000);
              // Повторяем запрос
              const retryRes = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=isbn:${cleanIsbn}&key=${APIkey}`
              );

              if (retryRes.ok) {
                const googleData = await retryRes.json();
                const coverUrl = await extractCoverUrl(googleData);
                booksWithCovers.push({ ...book, coverUrl });
              } else {
                booksWithCovers.push({ ...book, coverUrl: '' });
              }
            } else if (googleRes.ok) {
              const googleData = await googleRes.json();
              const coverUrl = await extractCoverUrl(googleData);
              booksWithCovers.push({ ...book, coverUrl });
            } else {
              console.warn(`Не найдена обложка для ISBN: ${cleanIsbn}`);
              booksWithCovers.push({ ...book, coverUrl: '' });
            }

          } catch (err) {
            console.error(`Ошибка загрузки обложки для ${book.title}`, err);
            booksWithCovers.push({ ...book, coverUrl: '' });
          }

          // Задержка между запросами (300мс чтобы не превысить лимит)
          if (i < booksData.length - 1) {
            await delay(500);
          }
        }

        console.log('Все книги загружены:', booksWithCovers);
        setBooks(booksWithCovers);

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
        console.error('Ошибка загрузки:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    // Вспомогательная функция для извлечения URL обложки
    const extractCoverUrl = async (googleData: any): Promise<string> => {
      if (googleData.items && googleData.items.length > 0) {
        const imageUrl: string | undefined = googleData.items[0].volumeInfo.imageLinks?.thumbnail;

        if (imageUrl) {
          try {
            // Заменяем http на https
            const secureUrl = imageUrl.replace('http://', 'https://');

            // Пробуем загрузить как BLOB 
            const imgResponse = await fetch(secureUrl);
            if (imgResponse.ok) {
              const blob = await imgResponse.blob();
              return URL.createObjectURL(blob);
            }
          } catch (e) {
            console.warn('Не удалось загрузить обложку как BLOB, используем прямой URL');
            return imageUrl;
          }
        }
      }
      return '';
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div style={containerStyle}>
        <h1>Загрузка...</h1>
        <p>Пожалуйста, подождите. Загружаем обложки книг...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <h1>Ошибка</h1>
        <p style={{ color: 'red' }}>Произошла ошибка: {error}</p>
        <button onClick={() => window.location.reload()}>Попробовать снова</button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1>Список книг</h1>
      <p>Всего книг: {books.length}</p>
      <div style={gridStyle}>
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            authors={book.authors}
            coverUrl={book.coverUrl}
          />
        ))}
      </div>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
};

const gridStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  gap: '10px',
};

export default App;