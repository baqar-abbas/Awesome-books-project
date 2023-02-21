class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  static add(book) {
    const books = Book.getAll();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static remove(id) {
    const books = Book.getAll();
    const index = books.findIndex((book) => book.id === id);
    if (index >= 0) {
      books.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(books));
    }
  }

  static getAll() {
    return JSON.parse(localStorage.getItem('books')) || [];
  }

  static displayAll() {
    const list = document.querySelector('#list');
    list.innerHTML = '';
    Book.getAll().forEach((book) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `"${book.title}" by ${book.author}`;

      // Create a Remove button for each list item
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        Book.remove(book.id);
        listItem.remove();
      });

      listItem.appendChild(removeButton);
      list.appendChild(listItem);
    });
  }
}

window.onload = Book.displayAll();

const form = document.querySelector('#form1');
let j = 1;

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.querySelector('#title');
  const author = document.querySelector('#author');

  const book = new Book(title.value, author.value, j += 1);
  Book.add(book);
  Book.displayAll();
});