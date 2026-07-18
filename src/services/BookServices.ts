import { type BookData, type IBook } from "@/types/book.types";
import { Book } from "@/models/Book";
import { BookFactory } from "@/models/BookFactory";

export class BookManager {
  public bookList : Book[] = [];
  public addBook(data : BookData) : void;
  public addBook(data : IBook[]) : void;

  public addBook (data : BookData | IBook[]) : void {
    if (Array.isArray(data)) {
      for (const book of data) {
        this.bookList.push(new Book(book));
        BookFactory.currentId = book.id;
      }
    }
    else {
      this.bookList.push(BookFactory.CreateBook(data));
    }
  }

  public removeBook = (id : number) : void => {
    const bookIndex = this.bookList.findIndex((book) => book.id === id);
    if (bookIndex === -1) return;
    this.bookList.splice(bookIndex, 1);
  }

  public editBook = (id : number, newData : BookData) : void => {
    /* I want to try and instead recreate this with findIndex to save on CPU Cycles. */
    this.bookList = this.bookList.map((book) => {
      if (book.id === id ) {
        return {
          ...book,
          ...newData,
          id: book.id
        };
      }
      return book;
    })
  }

  public changeBookAvailability = (id: number) : void => {
    const bookIndex : number = this.bookList.findIndex((book) => book.id === id);
    if(bookIndex === -1) { 
      console.warn("This book ID doesn't exist.");
      return; 
    }

    const book = this.bookList[bookIndex];
    if (book.available === "available") {
      book.available = "notAvailable";
    }
    else {
      book.available = "available";
    }

    this.bookList[bookIndex] = book;
  }
  
  /* filter() creates a new list with new elements, which is important for us to not
  accidentally wipe our own data and instead return it. */
  public searchBookByName = (bookName : string) : Book[] => {
    return this.bookList.filter((book) => 
      book.bookTitle.toLocaleLowerCase().includes(bookName.toLocaleLowerCase())
    );
  }

  public findBookById = (id : number) : Book | undefined => {
    return this.bookList.find((book) => book.id === id);
  }
}