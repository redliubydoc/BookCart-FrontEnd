import { BACKEND_BASE_URL } from "./BookCart";

class BookService {
    static getAllBooks() {
        let url = `${BACKEND_BASE_URL}/book`;
        console.log(url);
        return fetch(url, {
            method: "GET"
        });
    }

    static getAllBooksByGenre(genre) {
        let url = `${BACKEND_BASE_URL}/book/search/genre/${genre}`;
        console.log(url);   
        return fetch(url, {
            method: "GET"
        });
    }

    static getBook(id) {
        let url = `${BACKEND_BASE_URL}/book/${id}`;
        console.log(url);
        return fetch(url, {
            method: "GET"
        });
    }

    static getAllFeedbacks(id) {
        let url = `${BACKEND_BASE_URL}/book/${id}/feedback`;
        console.log(url);
        return fetch(url, {
            method: "GET"
        });
    }

    static getAllGenres() {
        let url = `${BACKEND_BASE_URL}/book/genre`;

        console.log(url);

        return fetch(url, {method: "GET"});
    }

    static getAllLanguages() {
        let url = `${BACKEND_BASE_URL}/book/language`;

        console.log(url);

        return fetch(url, {method: "GET"});
    }

    static getSubscriptionPrice(type, genre) {
        let url = `${BACKEND_BASE_URL}/book/subscription/price?type=${type}&genre=${genre}`;
        console.log(url);

        return fetch(url, {
            method: "GET"
        });
    }

    static getSubscriptionCatalogs() {
        let url = `${BACKEND_BASE_URL}/subscription`;

        console.log(url);

        return fetch(url, {method: "GET"});
    }

    static getBookCatalogs(currentPage, recordsPerPage) {
        let url = `${BACKEND_BASE_URL}/book?page=${currentPage}&size=${recordsPerPage}`;
        return fetch(url, {method: "GET"})
    }

    static getBookCatalogsOnSearch(keyword, searchType, currentPage, recordsPerPage) {
        let url = `${BACKEND_BASE_URL}/book/search/${keyword}?searchType=${searchType}&page=${currentPage}&size=${recordsPerPage}`;
        return fetch(url, {method: "GET"})
    }
    
    static getBookCatalogsOnFilter(genresC, languagesC, pricesarr, currentPage, recordsPerPage) {
        let url = `${BACKEND_BASE_URL}/book/search?page=${currentPage}&size=${recordsPerPage}`;
        console.log(url);
        const data = {
            genres: genresC,
            languages: languagesC,
            prices: pricesarr,
            sortByPrice: false
        }
        console.log("Stringyfy"+ JSON.stringify(data))
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            
        });
        
    }

    static getBookCatalogsOnSort(sortType, currentPage, recordsPerPage) {
        let url = `${BACKEND_BASE_URL}/book/sort?sortType=${sortType}&page=${currentPage}&size=${recordsPerPage}`;
        console.log(url)
        return fetch(url, {method: "GET"})
    }


}
export default BookService;