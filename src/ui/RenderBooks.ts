import { BookCard } from "@/templates/BookCard";
import type { IBook } from "@/types/book.types";

export function RenderBooks(wrapper : HTMLDivElement, books : IBook[]) {
  wrapper.innerHTML = "";
  
  for(const book of books) {
    wrapper?.insertAdjacentHTML("beforeend", BookCard(book));
  }
}