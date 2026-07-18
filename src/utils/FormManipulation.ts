import type { BookData, AvailableStatus } from "@/types/book.types";

export type FormInputRecord = Record<string, HTMLInputElement | undefined>;
export type FormValidationRecord = Record<string, HTMLParagraphElement | undefined>;
export type InputAndValidateRecord = Record<string, string>;

export const getFormInputElements = (bookForm : HTMLFormElement) : FormInputRecord => {
  const elementsRecord : FormInputRecord = {};

  // Grab each element and their ID and create a Record.
  Array.from(bookForm.elements).forEach((element) => {
    const htmlElement : Element = element;

    if(htmlElement.tagName !== 'BUTTON') {
      const key = htmlElement.id;
      
      if(key) {
        elementsRecord[key] = htmlElement as HTMLInputElement;
      }
    }
  })
  return elementsRecord;
}

export const getFormValidationElements = (bookForm: HTMLFormElement): FormValidationRecord => {
  const validations: NodeListOf<HTMLParagraphElement> | undefined = 
    bookForm?.querySelectorAll("p");
    
  const validationArray: HTMLParagraphElement[] = validations ? Array.from(validations) : [];
  
  return validationArray.reduce<FormValidationRecord>((acc, element) => {
    acc[element.id] = element;
    return acc;
  }, {});
}

export const validateFormData = (inputElements: FormInputRecord, validationRecord : FormValidationRecord, inputValidationMapping : InputAndValidateRecord) : boolean => {
  let validated : boolean = true;

  if (inputElements && validationRecord) {
    for (const inputKey in inputElements) {
      const inputElement : HTMLInputElement | undefined = inputElements[inputKey];
      if(!inputElement) { console.log(inputKey, inputElement); continue; };
      
      const validateElement : string = inputValidationMapping[inputElement!.id];

      if(
          inputElement.value.length <= 0 ||
          Number(inputElement.value) < 1600
      ) {
        validationRecord[validateElement]?.classList.remove("invisible");
        validated = false;
      }
      else {
        validationRecord[validateElement]?.classList.add("invisible");
      }
    }
  }
  return validated;
}

export const fillUpFormWithData = (inputElements: FormInputRecord, book : BookData) : void => {
  if (inputElements) {
    // We map out our form with what data the book should provide.
    const fieldMapping = {
      title: book.bookTitle,
      author: book.authorName,
      year: String(book.publishYear),
      availability: book.available,
    };

    Object.entries(fieldMapping).forEach(([key, value]) => {
      const element = inputElements[key];
      if (element) {
        element.value = value;
      }
    });
  }
}

export const cleanDataInForm = (inputElements : FormInputRecord) : void => {
  if(inputElements) {
    for(const inputKey in inputElements) {
      const input : HTMLInputElement | undefined = inputElements[inputKey];
      if (input) {
        if (input.dataset.defaultValue) {
          input.value = input.dataset.defaultValue;
        }
        else {
          input.value = input.defaultValue;
        }
      }
    }
  }
}

export const returnBookDataFromForm = (inputElements: FormInputRecord) : BookData | undefined => {
  if (!inputElements) {
    return undefined;
  }

  if (
    !inputElements.title?.value && 
    !inputElements.author?.value &&
    !Number(inputElements.year?.value) &&
    !inputElements.availability?.value
  ) {
    return undefined;
  }

  return {
    bookTitle: inputElements.title!.value,
    authorName: inputElements.author!.value,
    publishYear: Number(inputElements.year!.value),
    available: inputElements.availability!.value as AvailableStatus
  };
}