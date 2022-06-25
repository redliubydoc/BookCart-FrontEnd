class ValidationService {
    static emailIsValid(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if(regex.test(email)) {
            return true;
        }

        return false;
    }

    static phoneNoIsValid(phoneNo) {
        const regex = /^[6-9]\d{9}$/gm;

        if(regex.test(phoneNo)) {
            console.log(true)
            return true;
        }

        return false;
    }
}

export default ValidationService;