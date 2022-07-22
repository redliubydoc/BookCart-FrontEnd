import { BACKEND_BASE_URL } from "./BookCart";

class SubscriptionService {
    static getPrice(type, genre) {
        let url = `${BACKEND_BASE_URL}/subscription/price?type=${type}&genre=${genre}`;
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
        return fetch(url, {
            method: "GET"
        });
    }

    static getAllFeedbacks(id) {
        let url = `${BACKEND_BASE_URL}/book/${id}/feedback`;
        return fetch(url, {
            method: "GET"
        });
    }

    static deleteTodo(username, id) {
        return fetch(`http://localhost:8080/users/${username}/todos/${id}`, {
            method: "DELETE"
        });
    }

    static updateTodo(username, id, todo) {
        return fetch(`http://localhost:8080/users/${username}/todos/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
    }

    static addTodo(username, todo) {
        return fetch(`http://localhost:8080/users/${username}/todos/-100`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
    }
}
export default SubscriptionService;