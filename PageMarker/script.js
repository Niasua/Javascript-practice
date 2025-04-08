const input = document.querySelector("#input-title");
const addButton = document.querySelector("#btn-add");
const bookContainer = document.querySelector(".book-container");

let books = JSON.parse(localStorage.getItem("books")) || [];

window.addEventListener("DOMContentLoaded", () => {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    storedBooks.forEach(renderBook);
    books = storedBooks;
});

addButton.addEventListener("click", () => {
    if(input.value.trim() === "") return;

    // store the input value
    const bookName = input.value;
    // reset the input
    input.value = "";

    // Add a book to the list 
    const newBook = {title: bookName, page: ""};
    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));

    renderBook(newBook);

    
});

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addButton.click();
        input.blur();
    }
});

function renderBook(bookObj) {
    const bookRow = document.createElement("div");
    bookRow.classList.add("book-row");
    bookRow.setAttribute("draggable", "true");

    // The book container
    const book = document.createElement("div");
    book.classList.add("book");

    // Drag handle
    const dragHandle = document.createElement("span");
    dragHandle.classList.add("drag-handle");
    const imgDrag = document.createElement("img");
    imgDrag.src = "./images/drag.png";
    imgDrag.id = "img-drag";
    dragHandle.appendChild(imgDrag);

    // Title in a span (so we can access it separately)
    const titleSpan = document.createElement("span");
    titleSpan.textContent = bookObj.title;
    titleSpan.classList.add("book-title");

    // Page input
    const pageInput = document.createElement("input");
    pageInput.type = "text";
    pageInput.placeholder = "Page ...";
    pageInput.classList.add("page-input");
    pageInput.value = bookObj.page;


    
    // Append to book
    book.appendChild(dragHandle);
    book.appendChild(titleSpan);
    book.appendChild(pageInput);

    // URL button
    const btnUrl = document.createElement("button");
    btnUrl.classList.add("btn-url");
    const imgUrl = document.createElement("img");
    imgUrl.src = "./images/link.png";
    imgUrl.classList.add("img-url");
    btnUrl.appendChild(imgUrl);

    // Delete button
    const btnDelete = document.createElement("button");
    btnDelete.classList.add("btn-delete");
    const imgDelete = document.createElement("img");
    imgDelete.src = "./images/bin.png";
    imgDelete.classList.add("img-delete");
    btnDelete.appendChild(imgDelete);

    // Build the row
    bookRow.appendChild(book);
    bookRow.appendChild(btnUrl);
    bookRow.appendChild(btnDelete);
    bookContainer.appendChild(bookRow);

    // Delete event
    btnDelete.addEventListener("click", () => {
        bookContainer.removeChild(bookRow);
        books = books.filter(b => b.title !== bookObj.title);
        localStorage.setItem("books", JSON.stringify(books));
    });

    // Update page on blur
    pageInput.addEventListener("blur", () => {
        const updatedPage = pageInput.value;
        const foundBook = books.find(b => b.title === bookObj.title);
        if (foundBook) {
            foundBook.page = updatedPage;
            localStorage.setItem("books", JSON.stringify(books));
        }
    });


    // Double click --> go to the book
    btnUrl.addEventListener("dblclick", (e) => {
        e.preventDefault();
        if (bookObj.url) {
            window.open(bookObj.url, "_blank");
        }
    });

    // One click --> Edit the url
    btnUrl.addEventListener("click", (e) => {
        e.preventDefault();

        // If there is an input, don't create another
        if (book.querySelector(".url-input")) return;

        const urlInput = document.createElement("input");
        urlInput.type = "text";
        urlInput.placeholder = "Enter URL";
        urlInput.classList.add("url-input");
        urlInput.value = bookObj.url || "";
        book.appendChild(urlInput);
        urlInput.focus();

        urlInput.addEventListener("blur", () => {
            const url = urlInput.value.trim();
            if (url !== "") {
                bookObj.url = url;
                const foundBook = books.find(b => b.title === bookObj.title);
                if (foundBook) {
                    foundBook.url = url;
                    localStorage.setItem("books", JSON.stringify(books));
                }
            }
            book.removeChild(urlInput);
        });

        urlInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                urlInput.blur();
            }
        });
    });



    Sortable.create(bookContainer, {
        animation: 150,
        handle: ".drag-handle",
        onEnd: () => {
          // Save the new order in localStorage
          const updatedBooks = [];
          document.querySelectorAll(".book-row").forEach(row => {
            const title = row.querySelector(".book-title").textContent;
            const page = row.querySelector(".page-input").value;
            const book = books.find(b => b.title === title);
            if (book) updatedBooks.push(book);
          });
          books = updatedBooks;
          localStorage.setItem("books", JSON.stringify(books));
        }
      });
}





 