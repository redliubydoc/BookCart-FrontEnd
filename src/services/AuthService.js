// dummy service layer
class AuthService {
    static sessions = new Map(); // dummy server-side session storage

    static login(username, password, accountType) { // dummy reader login
        if (username === "Raj" && password === "1234" && accountType === 1) {
            return true;
        }
        if (username === "admin" && password === "admin" && accountType === 3) { // dummy admin login
            return true;
        }
        return false;
    }
}

export default AuthService;