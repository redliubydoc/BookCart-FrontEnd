class AlertService {
    static getAlertInstance(show = false, level = "", msg = "") {
        return {
            show: show,
            level: level,
            msg: msg
        };
    } 

    static showAlert(component, level, msg, duration = 0, scrollTop = true) {
        component.setState({
            alert: { 
                show: true, 
                level: level, 
                msg: msg
            }
        }, () => { 
            if (scrollTop) window.scrollTo({top: 0, behavior: 'smooth'});
            if (duration) window.setTimeout(() => AlertService.hideAlert(component), duration * 1000);
        });
    }

    static hideAlert(component) {
        component.setState({
            alert: { 
                show: false,
                level: "", 
                msg: "" 
            }
        });
    }
}

export default AlertService;