import { BACKEND_ADMIN_SERVER_BASE_URL } from "./BookCart";

import AuthService from "./AuthService";

class AdminService {
    static getBooksToBeReviewed() {
        let url = `${BACKEND_ADMIN_SERVER_BASE_URL}/admin/review`;

        console.log(url);

        return fetch(url, {
            method: "GET",
            headers: {
                'Authorization': AuthService.getAuthToke(),
            }
        });
    }

    static approveBook(isbn) {
        let url = `${BACKEND_ADMIN_SERVER_BASE_URL}/admin/review/approve`;

        console.log(url);

        return fetch(url, {
            method: "POST",
            headers: {
                'Authorization': AuthService.getAuthToke(),
            },
            body: isbn
        });
    }

    // static submitBook(isbn, title, description, genre, language, price, dateOfRelease, book, thumbnail) {
    //     let url = `${BACKEND_BASE_URL}/author/${AuthService.getLoggedInUser()}/book/-100`;

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

    //     return fetch(url, {
    //         method: "POST",
    //         headers: {
    //             "Authorization": AuthService.getAuthToke(),
    //         },
    //         body: formData
    //     });
    // }

    // static getBooks(id) {
    //     let url = `${BACKEND_BASE_URL}/author/${id}/book`;

    //     console.log(AuthService.getAuthToke());
    //     console.log(url);

    //     return fetch(url, {
    //         method: "GET",
    //         headers: {
    //             'Authorization': AuthService.getAuthToke()
    //         }
    //     });
    // }

    // static deleteBook(id, isbn) {
    //     let url = `${BACKEND_BASE_URL}/author/${id}/book/${isbn}`;

    //     console.log(AuthService.getAuthToke());
    //     console.log(url);

    //     return fetch(url, {
    //         method: "DELETE",
    //         headers: {
    //             'Authorization': AuthService.getAuthToke()
    //         }
    //     });
    // }

    // static updateAccountDetails(id, phoneNumber, password) {
    //     let url = `${BACKEND_BASE_URL}/author/${id}/account`;

    //     console.log(url);

    //     let payload = {
    //         phoneNumber: phoneNumber,
    //         password: password
    //     }

    //     return fetch(url, {
    //         method: "PUT",
    //         headers: {
    //             'Authorization': AuthService.getAuthToke(),
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(payload)
    //     });
    // }

    // static getAccountDetails(id) {
    //     let url = `${BACKEND_BASE_URL}/author/${id}/account`;

    //     console.log(url);

    //     return fetch(url, {
    //         method: "GET",
    //         headers: {
    //             'Authorization': AuthService.getAuthToke(),
    //         }
    //     });
    // }

    // static deleteAccount(id) {
    //     let url = `${BACKEND_BASE_URL}/author/${id}/account`;

    //     console.log(url);

    //     return fetch(url, {
    //         method: "DELETE",
    //         headers: {
    //             'Authorization': AuthService.getAuthToke(),
    //         }
    //     });
    // }
}

export default AdminService;
