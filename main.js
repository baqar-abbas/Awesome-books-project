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
  title.value = '';
  author.value = '';
});

const list = document.querySelector('.list');
const listPage = document.querySelector('.main');
const addNew = document.querySelector('.add-new');
const addBooksPage = document.querySelector('.add-books');
const contact = document.querySelector('.contact');
const contactPage = document.querySelector('.contactinfo');

list.addEventListener('click', () => {
  contactPage.style.display = 'none';
  addBooksPage.style.display = 'none';
  listPage.style.display = 'block';
  list.style.color = 'blue';
  addNew.style.color = 'black';
  contact.style.color = 'black';
});

addNew.addEventListener('click', () => {
  contactPage.style.display = 'none';
  addBooksPage.style.display = 'block';
  listPage.style.display = 'none';
  list.style.color = 'black';
  addNew.style.color = 'blue';
  contact.style.color = 'black';
});

contact.addEventListener('click', () => {
  contactPage.style.display = 'block';
  addBooksPage.style.display = 'none';
  listPage.style.display = 'none';
  list.style.color = 'black';
  addNew.style.color = 'black';
  contact.style.color = 'blue';
});

function time() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  };
  const date = now.toLocaleDateString('en-US', options);

  document.getElementById('datetime').textContent = `${date} ${hours}:${minutes}:${seconds}`;
}
setInterval(time, 1000);