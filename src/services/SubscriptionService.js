import { BACKEND_BASE_URL } from "./BookCart";

class SubscriptionService {
    static getPrice(type, genre) {
        let url = `${BACKEND_BASE_URL}/subscription/price?type=${type}&genre=${genre}`;
        console.log(url);

        return fetch(url, {
            method: "GET"
        });
    }
}
export default SubscriptionService;