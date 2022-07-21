import moment from "moment";

import { BACKEND_BASE_URL } from "./BookCart";

class AuthService {
    static register(accountType, firstName, lastName, emailId, phoneNo, password, dateOfBirth, sq1, sq2, sq3) {
        
        let data = {
            firstName: firstName,
            lastName: lastName,
            emailId: emailId,
            phoneNo: phoneNo,
            password: password,
            dateOfBirth: dateOfBirth,
            sq1: sq1,
            sq2: sq2,
            sq3: sq3
        }
        
        if (accountType === 1) {
            let url = `${BACKEND_BASE_URL}/user/register/reader`;
            return fetch(url, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
        }
        else if (accountType === 2) {

        }
        // console.log("AuthService.register()");
        // console.log(
        //     accountType, firstName, lastName, email, phoneNo, password, dob, securityQuestion1, securityQuestion2, securityQuestion3  
        // );        
    }

    static login(username, password, accountType) { 
        if (accountType === 1) {
            let url = `${BACKEND_BASE_URL}/user/login/reader`;
            return fetch(url, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: username, password: password})
            });
        }
        
        else if (accountType === 2) {
            if (username === "author@gmail.com" && password === "author") {
                localStorage.setItem("login", true);
                localStorage.setItem("user-type", 2);
                return true;
            }
        }

        else if (accountType === 3) {
            if (username === "admin" && password === "admin") {
                localStorage.setItem("login", true);
                localStorage.setItem("user-type", 3);
                return true;
            }
        }
        return false;
    }

    static findAccount(email, accountType) { // dummy find account
        if (email === "raj@gmail.com" && accountType === 1) {
            return true;
        }
        else if (email === "rohit@yahoo.com" && accountType === 2) {
            return true;
        }
        return false;
    }

    static securityCheck(email, accountType, dob, securityQuestion1, securityQuestion2, securityQuestion3) {
        console.log(
            email === "raj@gmail.com",
            accountType === 1,
            moment("2022-06-01").isSame(dob), 
            securityQuestion1 === "a", 
            securityQuestion2 === "b",
            securityQuestion3 === "c"
        );
        
        if (email === "raj@gmail.com" &&
            accountType === 1 &&
            moment("2022-06-01").isSame(dob) && 
            securityQuestion1 === "a" && 
            securityQuestion2 === "b" &&
            securityQuestion3 === "c") {
                return true;
            }
            return false;
    }
}

export default AuthService;