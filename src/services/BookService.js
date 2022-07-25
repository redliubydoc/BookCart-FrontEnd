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
        let url = `${BACKEND_BASE_URL}/genre`;

        console.log(url);

        return fetch(url, {method: "GET"});
    }

    static getAllLanguages() {
        let url = `${BACKEND_BASE_URL}/language`;

        console.log(url);

        return fetch(url, {method: "GET"});
    }

    // Search
    static findByKeyword(keyword, searchType, page, size) {
        let url = `${BACKEND_BASE_URL}/book/search/${keyword}?searchType=${searchType}&page=${page}&size=${size}`
        return fetch(url, {method: "GET"});
    }

    // static deleteTodo(username, id) {
    //     return fetch(`http://localhost:8080/users/${username}/todos/${id}`, {
    //         method: "DELETE"
    //     });
    // }

    // static updateTodo(username, id, todo) {
    //     return fetch(`http://localhost:8080/users/${username}/todos/${id}`, {
    //         method: "PUT",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(todo)
    //     });
    // }

    // static addTodo(username, todo) {
    //     return fetch(`http://localhost:8080/users/${username}/todos/-100`, {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(todo)
    //     });
    // }
}
export default BookService;