import moment from "moment";

class ValidationService {
    static emailIsValid(email) {
        // TODO: code to validate email
        return true;
    }

    static phoneNoIsValid(phoneNo) {
        // TODO: code to validate Indian phone number
        return true;
    }

    static dateIsValid(date) {
        return moment(date).isValid();
    }
}

export default ValidationService;