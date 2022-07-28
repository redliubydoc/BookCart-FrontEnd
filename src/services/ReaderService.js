import AuthService from "./AuthService";
import {BACKEND_BASE_URL} from "./BookCart";

class ReaderService {
    static getSubscriptions(id) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/subscription`;

        console.log(url);
        

        return fetch(url, {
            method: "GET",
            headers: {
                'Authorization': AuthService.getAuthToke(),
                'Content-Type': 'text/plain',
            }
        });
    }

    static getBooks(id) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/book`;

        console.log(url, AuthService.getAuthToke());

        return fetch(url, {
            method: "GET",
            headers: {
                'Authorization': AuthService.getAuthToke(),
                'Content-Type': 'application/json'
            }
        });
    }

    static getFeedback(id, isbn) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/book/${isbn}/feedback`;

        console.log(url);

        return fetch(url, {
            method: "GET",
            headers: {
                'Authorization': AuthService.getAuthToke(),
                'Content-Type': 'application/json'
            }
        });
    }

    static submitFeedback(id, isbn, feedback) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/book/${isbn}/feedback`;

        console.log(url);

        return fetch(url, {
            method: "POST",
            headers: {
                'Authorization': AuthService.getAuthToke(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedback)
        });
    }

    static updateAccountDetails(id, emailId, phoneNumber, password) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/account`;

        console.log(url);

        let payload = {
            emailId: emailId,
            phoneNumber: phoneNumber,
            password: password
        }

        return fetch(url, {
            method: "PUT",
            headers: {
                'Authorization': AuthService.getAuthToke(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
    }

    static getAccountDetails(id) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/account`;

        console.log(url);

        return fetch(url, {
            method: "GET",
            headers: {
                'Authorization': AuthService.getAuthToke(),
                'Content-Type': 'application/json'
            }
        });
    }

    static deleteAccount(id) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/account`;

        console.log(url);

        return fetch(url, {
            method: "DELETE",
            headers: {
                'Authorization': AuthService.getAuthToke(),
                'Content-Type': 'application/json'
            }
        });
    }

    static loadCart(id) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/cart`;

        console.log(url);

        return fetch(url, {
            method: "GET",
            headers: {
                'Authorization': AuthService.getAuthToke(),
                'Content-Type': 'application/json'
            }
        });
    }

    static addBookToCart(id, isbn) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/book/${isbn}/cart`;

        console.log(url);

        return fetch(url, {
            method: "POST",
            headers: {
                'Authorization': AuthService.getAuthToke(),
                'Content-Type': 'application/json'
            }
        });
    }

    static deleteBookFromCart(id, isbn) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/book/${isbn}/cart`;

        console.log(url);

        return fetch(url, {
            method: "DELETE",
            headers: {
                'Authorization': AuthService.getAuthToke(),
                'Content-Type': 'application/json'
            }
        });
    }

    static checkOutAndBuy(id) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/buy`;

        console.log(url);

        return fetch(url, {
            method: "GET",
            headers: {
                'Authorization': AuthService.getAuthToke(),
                'Content-Type': 'application/json'
            }
        });
    }

    static isSubscriptionAlreadyTaken(id, type, genre) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/buy/subscription/check?type=${type}&genre=${genre}`;

        console.log(url);

        return fetch(url, {
            method: "GET",
            headers: {
                'Authorization': AuthService.getAuthToke(),
                'Content-Type': 'application/json'
            }
        });
    }

    static buySubscription(id, type, genre) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/buy/subscription?type=${type}&genre=${genre}`;

        console.log(url);

        return fetch(url, {
            method: "GET",
            headers: {
                'Authorization': AuthService.getAuthToke(),
                'Content-Type': 'application/json'
            }
        });
    }

    static getOrderHistories(readerId) {
        let url = `${BACKEND_BASE_URL}/reader/${readerId}/order`;

        console.log(url);

        return fetch(url, {
            method: "GET",
            headers: {
                'Authorization': AuthService.getAuthToke(),
                'Content-Type': 'application/json'
            }
        });
    }
}

export default ReaderService;
