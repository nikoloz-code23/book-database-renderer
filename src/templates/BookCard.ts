import type { IBook } from "@/types/book.types";

export const BookCard = (data: IBook) : string => `
<div class="w-56 h-72 relative mt-4" id="book-${data.id}">
  <!-- The book effect for the back of it -->
  <div class="p-4 bg-amber-300 w-55 h-71 absolute rounded-2xl ml-1 mt-4 z-0">
  </div>
  <div class="p-4 bg-amber-100 w-54 h-71 absolute rounded-2xl ml-1 mt-3 shadow-[.2rem_.2rem_.2px_rgba(255,10,50,0.15)] z-20">
  </div>
  <div class="p-4 bg-amber-100 w-54 h-71 absolute rounded-2xl ml-1.2 mt-2 shadow-[.2rem_.2rem_.2px_rgba(0,0,0,0.25)] z-30">
  </div>

  <div class="flex flex-col justify-around w-54 h-72 absolute rounded-2xl p-4 bg-amber-300 z-40">
    <div class="bg-amber-50 rounded-2xl px-2 py-1">
      <div class="flex items-center flex-col">
        <p class="font-black">Book Title:</p>
        <p class="line-clamp-2">${data.bookTitle}</p>
      </div>
      <div class="flex items-center flex-col">
        <p class="font-black">Author:</p>
        <p class="text-center">${data.authorName}</p>
      </div>
    </div>
    <div>
      <div class="flex items-center flex-col">
        <p class="font-black">Published on:</p>
        <p>${data.publishYear}</p>
      </div>
      <div class="flex items-center flex-col text-2xl ${data.available === "available" ? "text-green-600" : "text-red-600"} hover:cursor-pointer hover:underline" id="availability">
        <p>${data.available === "available" ? "Available!" : "Not Available"}</p>
      </div>
      <div class="flex justify-center itmes-center gap-x-2 mt-4">
        <button id="edit-button" class="bg-amber-50 px-2 rounded-2xl hover:cursor-pointer hover:outline-2 hover:outline-amber-700">Edit</button>
        <button id="delete-button" class="bg-amber-50 px-2 rounded-2xl hover:cursor-pointer hover:outline-2 hover:outline-amber-700">Delete</button>
      </div>
    </div>
  </div>
</div>
`