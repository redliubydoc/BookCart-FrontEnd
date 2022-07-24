import { BACKEND_BASE_URL } from "./BookCart";

class ReaderService {
    static getSubscriptions(id) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/subscription`;

        console.log(url);

        return fetch(url, {method: "GET"});
    }

    static getBooks(id) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/book`;

        console.log(url);

        return fetch(url, {method: "GET"});
    }

    static getFeedback(id, isbn) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/book/${isbn}/feedback`;

        console.log(url);

        return fetch(url, {method: "GET"});
    }

    static submitFeedback(id, isbn, feedback) {
        let url = `${BACKEND_BASE_URL}/reader/${id}/book/${isbn}/feedback`;

        console.log(url);

        return fetch(url, {method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedback)
        });
    }

    // static getAuthorName(id) {
    //     let url = `${BACKEND_BASE_URL}/author/${id}/name`;

    //     console.log(url);

    //     return fetch(url, {method: "GET"});
    // }

    // static submitBook(
    //     isbn, 
    //     title,
    //     description,
    //     genre,
    //     language,
    //     price,
    //     dateOfRelease,
    //     book,
    //     thumbnail
    // ) {
    //     let url = `${BACKEND_BASE_URL}/author/7/book/-100`;

    //     const formData = new FormData();
    //     formData.append("isbn", isbn);
    //     formData.append("title", title);
    //     formData.append("description", description);
    //     formData.append("genre", genre);
    //     formData.append("language", language);
    //     formData.append("price", price);
    //     formData.append("dateOfRelease", dateOfRelease);
    //     formData.append("book", book);
    //     formData.append("thumbnail", thumbnail);
        
    //     return fetch(url, {method: "POST", body: formData});
    // }
}

export default ReaderService;