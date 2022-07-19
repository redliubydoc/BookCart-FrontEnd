function SearchBar() {
    return(<>
        <div class="input-group">
                <select class="btn btn-primary">
                    <option value="ISBN"> ISBN </option>
                    <option value="Title">Title</option>
                    <option value="Author">Author</option>
                    <option value="Subject">Subject</option>
                </select>
                <input type="search" class="form-control" placeholder="ISBN / Title / Author / Subject"
                    aria-label="Search" aria-describedby="search-addon" />
                <button type="button" class="btn btn-primary"><i class="bi bi-search"></i></button>
            </div>
    </>);
}

export default SearchBar;