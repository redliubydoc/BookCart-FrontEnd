import { BACKEND_BASE_URL } from "./BookCart";

class ReaderService {
    static getSubscriptions(id) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/subscription`;

        console.log(url);

        return fetch(url, {method: "GET"});
    }

    static getBooks(id) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/book`;

        console.log(url);

        return fetch(url, {method: "GET"});
    }

    static getFeedback(id, isbn) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/book/${isbn}/feedback`;

        console.log(url);

        return fetch(url, {method: "GET"});
    }

    static submitFeedback(id, isbn, feedback) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/book/${isbn}/feedback`;

        console.log(url);

        return fetch(url, {method: "POST",
            headers: {
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

        return fetch(url, {method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
    }

    static getAccountDetails(id) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/account`;

        console.log(url);

        return fetch(url, {method: "GET"});
    }

    static deleteAccount(id) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/account`;

        console.log(url);

        return fetch(url, {method: "DELETE"});
    }

    static loadCart(id) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/cart`;

        console.log(url);

        return fetch(url, {method: "GET"});
    }

    static addBookToCart(id, isbn) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/book/${isbn}/cart`;

        console.log(url);

        return fetch(url, {method: "POST"});
    }

    static deleteBookFromCart(id, isbn) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/book/${isbn}/cart`;

        console.log(url);

        return fetch(url, {method: "DELETE"});
    }

    static checkOutAndBuy(id) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/buy`;

        console.log(url);

        return fetch(url, {method: "GET"});
    }

    static isSubscriptionAlreadyTaken(id, type, genre) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/buy/subscription/check?type=${type}&genre=${genre}`;

        console.log(url);

        return fetch(url, {method: "GET"});
    }

    static buySubscription(id, type, genre) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/buy/subscription?type=${type}&genre=${genre}`;

        console.log(url);

        return fetch(url, {method: "GET"});
    }

    static getOrderHistories(readerId) {
        let url = `${BACKEND_BASE_URL}/reader/${readerId}/order`;
        
        console.log(url);

        return fetch(url, {
            method: "GET"
        });
    }
    // static getAuthorName(id) {
    //     let url = `${BACKEND_BASE_URL}/author/${id}/name`;

    //     console.log(url);

    //     return fetch(url, {method: "GET"});
    // }

    // static submitBook(
    //     isbn, 
    //     title,
    //     description,
    //     genre,
    //     language,
    //     price,
    //     dateOfRelease,
    //     book,
    //     thumbnail
    // ) {
    //     let url = `${BACKEND_BASE_URL}/author/7/book/-100`;

    //     const formData = new FormData();
    //     formData.append("isbn", isbn);
    //     formData.append("title", title);
    //     formData.append("description", description);
    //     formData.append("genre", genre);
    //     formData.append("language", language);
    //     formData.append("price", price);
    //     formData.append("dateOfRelease", dateOfRelease);
    //     formData.append("book", book);
    //     formData.append("thumbnail", thumbnail);
        
    //     return fetch(url, {method: "POST", body: formData});
    // }
}

export default ReaderService;