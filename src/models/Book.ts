import { type IBook, type AvailableStatus } from '@/types/book.types'

export class Book implements IBook {
  public id! : number;
  public bookTitle!: string;
  public authorName!: string;
  public publishYear!: number;
  public available!: AvailableStatus;
  
  constructor(bookObj : IBook) {
    this.id = bookObj.id;
    this.bookTitle = bookObj.bookTitle;
    this.authorName = bookObj.authorName;
    this.publishYear = bookObj.publishYear;
    this.available = bookObj.available;
  }
}