import { fetchDataFromAPI } from "./utils/FetchFromAPI";
import { BookManager } from "./services/BookServices";
import type { BookData, IBook } from "./types/book.types";
import { RenderBooks } from "./ui/RenderBooks";
import { 
  cleanDataInForm, 
  fillUpFormWithData, 
  getFormInputElements, 
  getFormValidationElements, 
  returnBookDataFromForm, 
  validateFormData, 
  type FormInputRecord, 
  type FormValidationRecord, 
  type InputAndValidateRecord 
} from "./utils/FormManipulation";
import { hideValidationElements } from "./ui/ValidationRender";
import type { Book } from "./models/Book";
import { Developer, Employee } from "./models/Employees";

// This is the meat of the project.
const bookManager = new BookManager();
let searchState : string = "";

let bookListState : Book[] = bookManager.bookList;
function updateBookListState() {
  bookListState = bookManager.searchBookByName(searchState);
}

let bookIdState : number | undefined = undefined;

document.addEventListener("DOMContentLoaded", async () => {
  const mainElement : HTMLElement | null = document.querySelector<HTMLElement>("main");

  /* Absolutely under no circumstance run the project if you can't fetch data or
     if you can't find the main element. */
  try {
    if(!mainElement) {
      throw new Error("Main element does not exist!");
    }
    
    const fetchData : IBook[] = await fetchDataFromAPI();
    bookManager.addBook(fetchData)
  }
  catch (error) {
    console.error(error);
    return;
  }

  const searchInput : HTMLInputElement | null = 
    document.querySelector<HTMLInputElement>("#search-book");
  const addNewBookButton : HTMLButtonElement | null = 
    document.querySelector<HTMLButtonElement>("#new-book");
  
  const bookFormModal : HTMLDialogElement | null = 
    mainElement!.querySelector<HTMLDialogElement>("#book-modal");
  const bookDeleteModal : HTMLDialogElement | null = 
    mainElement!.querySelector<HTMLDialogElement>("#delete-confirm");
  
  const bookForm : HTMLFormElement | undefined | null = bookFormModal?.querySelector("form");
  if(!bookForm) {
    console.error("Can't get accesss to the Form Modal. Aborting!");
    return;
  }
  const formTitle : HTMLParagraphElement | undefined | null = bookFormModal?.querySelector("#form-title");
  const inputRecord : FormInputRecord = getFormInputElements(bookForm);
  const validationRecord : FormValidationRecord = getFormValidationElements(bookForm);

  /* Also no reason to try and render books, if there is no book wrapper. */
  /* No need to specify type to bookWrapper cuz it will get assigned anyway. */
  const bookWrapper = mainElement?.querySelector<HTMLDivElement>("#book-wrapper");
  if(!bookWrapper) {
    console.error("That is bad. I don't see a book wrapper!");
    return;
  }
  RenderBooks(bookWrapper, bookListState);

  searchInput?.addEventListener("input", (event : Event) => {
    const target : HTMLInputElement = event.target as HTMLInputElement;
    searchState = target.value;
    updateBookListState();
    RenderBooks(bookWrapper, bookListState);
  })

  bookWrapper.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    /* 
      Using closest() in case I will decide to have the text 
      Inside the button be paragraphs.
    */
    const editButton = target.closest("#edit-button");
    const deleteButton = target.closest("#delete-button");
    const availabilityToggle = target.closest("#availability");

    if (!editButton && !deleteButton && !availabilityToggle) return;

    const bookCard = target.closest<HTMLElement>("[id^='book-']");
    if (!bookCard) return;

    const bookId = Number(bookCard.id.replace("book-", ""));

    if (editButton) {
      handleEditBook(bookId);
    } else if (deleteButton) {
      handleDeleteBook(bookId);
    } else if(availabilityToggle) {
      bookManager.changeBookAvailability(bookId);
      updateBookListState();
      RenderBooks(bookWrapper, bookListState);
    }
  });

  function handleEditBook(id: number) {
    bookIdState = id;

    const book = bookManager.findBookById(id);
    if (!book) {
      console.error("Could not find book!");
      return;
    }

    fillUpFormWithData(inputRecord, book);
    if(formTitle) {
      formTitle.innerText = "Edit a book!";
    }
    bookFormModal?.showModal();
  }

  function handleDeleteBook(id: number) {
    bookIdState = id;
    bookDeleteModal?.showModal();
  }

  addNewBookButton?.addEventListener("click", () => {
    if(formTitle) {
      formTitle.innerText = "Add a book!";
    }
    bookFormModal?.showModal();
  });

  bookFormModal?.addEventListener("click", (event : MouseEvent) => {
    event.preventDefault();
    const target = event.target as HTMLElement;

    const submitButton = target.closest("#submit-btn");
    const cancelButton = target.closest("#close-btn");
    const inputValidationMapping : InputAndValidateRecord = {
      "title":  "title-validation",
      "author": "author-validation",
      "year":   "year-validation"
    }
    
    if(submitButton) {
      if(validateFormData(inputRecord, validationRecord, inputValidationMapping)) {
        const bookData : BookData | undefined = returnBookDataFromForm(inputRecord);
        console.log(bookData);

        try {
          if(!bookData) throw new Error("Can't get data from the form. Aborting!"); 

          if(bookIdState) {
            bookManager.editBook(bookIdState, bookData);
            updateBookListState();
            bookIdState = undefined;
          } 
          else {
            bookManager.addBook(bookData);
            updateBookListState();
          }
        } catch (error) {
          console.error(error);
        }

        hideValidationElements(validationRecord);
        RenderBooks(bookWrapper, bookListState);
        cleanDataInForm(inputRecord);
        bookFormModal.close();
      }
    }

    if(cancelButton) {
      hideValidationElements(validationRecord);
      cleanDataInForm(inputRecord);
      bookFormModal.close();
    }
  });

  bookDeleteModal?.addEventListener("click", (event : MouseEvent) => {
    event.preventDefault();
    const target = event.target as HTMLElement;

    const submitButton = target.closest("#delete-btn");
    const cancelButton = target.closest("#close-btn");

    if (submitButton) {
      if(bookIdState) {
        bookManager.removeBook(bookIdState);
        updateBookListState();
      }

      bookIdState = undefined;
      RenderBooks(bookWrapper, bookListState);
      bookDeleteModal?.close();
    }

    if(cancelButton) {
      bookDeleteModal?.close();
    }
  })
})

/*
====== This is just for requirement, not important to the project. ======
*/

const employee : Employee = new Employee("Employee");
const developer : Developer = new Developer("Developer", "TypeScript");
const developer2 : Employee = new Developer("Developer2", "TypeScript2");

employee.printName();

developer.printName();
developer.developmentLanguage();
developer2.printName();
// developer2.developmentLanguage();
// ^^^
// Won't work, because Employee class doesn't have this method.
// It allowed me to create it anyway, because it is inheriting
// all the other Employee fields and methods. OOP.
