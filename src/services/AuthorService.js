import { BACKEND_BASE_URL } from "./BookCart";

class AuthorService {
    static getAuthorName(id) {
        let url = `${BACKEND_BASE_URL}/author/${id}/name`;

        console.log(url);

        return fetch(url, {method: "GET"});
    }

    static submitBook(
        isbn, 
        title,
        description,
        genre,
        language,
        price,
        dateOfRelease,
        book,
        thumbnail
    ) {
        let url = `${BACKEND_BASE_URL}/author/7/book/-100`;

        const formData = new FormData();
        formData.append("isbn", isbn);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("genre", genre);
        formData.append("language", language);
        formData.append("price", price);
        formData.append("dateOfRelease", dateOfRelease);
        formData.append("book", book);
        formData.append("thumbnail", thumbnail);
        
        return fetch(url, {method: "POST", body: formData});
    }
}

export default AuthorService;