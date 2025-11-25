import { IBookRepository, BookRepository } from "../repositories/book.repository";
import { Book } from "../types/book.type";

let bookRepository: IBookRepository = new BookRepository();

export class BookService {
    getAllBooks = () => {
        let reponse = bookRepository
            .getAllBooks()
            .map((book) => {
                return { ...book, title: book.title.toUpperCase() }
            });
        return reponse;
    }
    createBook = (book: Book) => {
        const exist = bookRepository.getOneBook(book.id);
        if(exist){
            throw new Error("Book with this ID already exists");
        }
        // more logic/query/processing can be added here
        return bookRepository.createBook(book);
    }
}