import type { BookData, IBook } from "@/types/book.types";
import { Book } from "./Book";

export class BookFactory {
  static currentId : number = 0;
  static CreateBook = (data : BookData) : Book => {
    BookFactory.currentId++;
    const newBookData : IBook = {
      ...data,
      id: BookFactory.currentId
    };
    
    return new Book(newBookData);
  };
}