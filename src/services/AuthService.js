import moment from "moment";

// dummy service layer
class AuthService {
    static register(accountType, firstName, lastName, email, phoneNo, password, dob, securityQuestion1, securityQuestion2, securityQuestion3) {
        console.log("AuthService.register()");
        console.log(
            accountType, firstName, lastName, email, phoneNo, password, dob, securityQuestion1, securityQuestion2, securityQuestion3  
        );        
    }

    static login(username, password, accountType) {
        let flag = false;
        let url = "http://localhost:8080/login";
        let payload = {
            "type": accountType,
            "emailId": username,
            "password": password
        }

        return fetch(url , {
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(payload)
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
}

export default AuthService;