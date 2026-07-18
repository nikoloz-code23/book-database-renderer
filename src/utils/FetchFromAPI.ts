import { type IBook } from "@/types/book.types";

export async function fetchDataFromAPI() : Promise<IBook[]> {
  try {
    const response : Response = await fetch("./BookAPI.json");
    const data = await response.json() as IBook[];
    return data;
  } catch(error) {
    console.error("Error in fetching the data.", error);
    return [];
  }
}