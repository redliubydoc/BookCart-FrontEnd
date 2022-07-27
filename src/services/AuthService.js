import moment from "moment";

import { BACKEND_BASE_URL } from "./BookCart"

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
            let url = `${BACKEND_BASE_URL}/reader/register`;
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
        let url = "";
        if (accountType === 1) url = `${BACKEND_BASE_URL}/reader/login`;
        if (accountType === 2) url = `${BACKEND_BASE_URL}/author/login`;
        if (accountType === 3) url = `${BACKEND_BASE_URL}/admin/login`;
            

        return fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: username, password: password})
        });
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

    // to store authentication token and basic user related in local storage
    static storeAuthCookies(type, jwt, uid, username) {
        localStorage.setItem("type", type);
        localStorage.setItem("jwt", jwt);
        localStorage.setItem("uid", uid);
        localStorage.setItem("username", username);
    }

    // to check authentication token present in local storage
    static isLoggedIn() { 
        if (localStorage.getItem("jwt")) return true;
        else return false;
    }

    static loggedInAs() {
        return localStorage.getItem("type");
    }

    static getAuthToke() {
        return "Bearer " + localStorage.getItem("jwt");
    }

    static getLoggedInUser() {
        return localStorage.getItem("uid");
    }
}

export default AuthService;