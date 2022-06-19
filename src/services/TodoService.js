class TodoService {
    static getAllTodos(username) {
        return fetch(`http://localhost:8080/users/${username}/todos`, {
            method: "GET"
        });
    }

    static getTodo(username, id) {
        return fetch(`http://localhost:8080/users/${username}/todos/${id}`, {
            method: "GET"
        });
    }

    static deleteTodo(username, id) {
        return fetch(`http://localhost:8080/users/${username}/todos/${id}`, {
            method: "DELETE"
        });
    }

    static updateTodo(username, id, todo) {
        return fetch(`http://localhost:8080/users/${username}/todos/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
    }

    static addTodo(username, todo) {
        return fetch(`http://localhost:8080/users/${username}/todos/-100`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
    }
}

export default TodoService;