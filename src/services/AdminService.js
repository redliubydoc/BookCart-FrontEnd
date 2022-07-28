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

    static changePassword(id, username, password) {
        let url = `${BACKEND_ADMIN_SERVER_BASE_URL}/admin/admin`;

        console.log(url);

        return fetch(url, {
            method: "PUT",
            headers: { 
                'Authorization': AuthService.getAuthToke(),
                'Content-type': "application/json"
            },
        
            body: JSON.stringify({
                adminId: id,
                username: username,
                password: password
            })
        });
    }

    static getAdmin() {
        let url = `${BACKEND_ADMIN_SERVER_BASE_URL}/admin/admin`;

        console.log(url);

        return fetch(url, {
            method: "GET",
            headers: { 'Authorization': AuthService.getAuthToke() }
        });
    }

    static deleteAdmin(id) {
        let url = `${BACKEND_ADMIN_SERVER_BASE_URL}/admin/admin/${id}`;

        console.log(url, id);

        return fetch(url, {
            method: "DELETE",
            headers: { 'Authorization': AuthService.getAuthToke() }
        });
    }

    static getAdmins() {
        let url = `${BACKEND_ADMIN_SERVER_BASE_URL}/admin/admin/all`;

        console.log(url);

        return fetch(url, {
            method: "GET",
            headers: { 'Authorization': AuthService.getAuthToke() }
        });
    }

    static addAdmin(username, password) {
        let url = `${BACKEND_ADMIN_SERVER_BASE_URL}/admin/admin`;

        console.log(url);

        let payload = {
            username: username,
            password: password
        };

        return fetch(url, {
            method: "POST",
            headers: { 
                'Authorization': AuthService.getAuthToke(),
                'Content-type': "application/json"
            },
            body: JSON.stringify(payload)
        });
    }

    static getSalesDetails() {
        let url = `${BACKEND_ADMIN_SERVER_BASE_URL}/admin/sales`;

        console.log(url);

        return fetch(url, {
            method: "GET",
            headers: { 'Authorization': AuthService.getAuthToke() },
        });
    }
}

export default AdminService;
