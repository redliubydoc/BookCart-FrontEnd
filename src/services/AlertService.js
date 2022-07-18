class AlertService {
    static initializeAlert() {
        return {
            show: false,
            level: "",
            msg: "",
        };
    }

    static showAlert(level, msg) {
        return {
            show: true,
            level: level,
            msg: msg
        }
    }

    static scrollTop() {
        window.scrollTo({
            top: 0, behavior: 'smooth'
        });
    }

    static hideAlert() {
        return {
            show: false,
            level: "",
            msg: "",
        };
    }
}

export default AlertService;