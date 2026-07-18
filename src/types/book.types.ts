type AvailableStatus = "available" | "notAvailable"

type BookData = {
  bookTitle : string,
  authorName : string,
  publishYear : number,
  available : AvailableStatus
}

interface IBook extends BookData {
  id : number
}

export {
  type AvailableStatus,
  type BookData,
  type IBook
}