import React from 'react';
import { Link } from 'react-router-dom';
import AlertService from '../../services/AlertService';
import AuthorService from '../../services/AuthorService';
import BookService from '../../services/BookService';
import ValidationService from '../../services/ValidationService';
import Alert from '../Misc/Alert';
import AuthorNavbar from '../Misc/AuthorNavbar';
import "./SellBooks.css"
class SellBooks extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isbn: "", 
            title: "",
            description: "",
            genre: "",
            language: "",
            author: "",
            price: 1,
            dateOfRelease: "",
            bookFile: "",
            thumbnailFile: "",

            genres: [],
            languages: [],

            alert: AlertService.getAlertInstance()
        }

        this.handleChange = this.handleChange.bind(this);
        this.doSubmit = this.doSubmit.bind(this);
        this.getAuthorName = this.getAuthorName.bind(this);
        this.getGenres = this.getGenres.bind(this);
        this.getLanguages = this.getLanguages.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }
   
    render() {
        return (
            <div>
                <AuthorNavbar/>
                {/* alert placeholder */}
                {this.state.alert.show && 
                    <Alert level={this.state.alert.level} msg={this.state.alert.msg}/>
                }
                
                <div className='container' id='sellBooks'>
                        <div className='row m-3'>
                            <div className='col-sm-1'/>
                            <div className='col-sm-3'>
                                <label htmlFor='isbn'>ISBN</label>
                            </div>
                            <div className='col-sm-7'>
                                <input className='form-control'
                                    type="text"
                                    name="isbn"
                                    value={this.state.isbn}
                                    onChange={this.handleChange}/>
                            </div>
                            <div className='col-sm-1' />
                        </div>
                        <div className='row m-3'>
                            <div className='col-sm-1'/>
                            <div className='col-sm-3'>
                                <label htmlFor='title'>Title</label>
                            </div>
                            <div className='col-sm-7'>
                                <input className='form-control'
                                    type="text" 
                                    name='title'
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className='col-sm-1'/>
                        </div>
                        <div className='row m-3'>
                            <div className='col-sm-1'/>
                            <div className='col-sm-3'>
                                <label htmlFor='description'>Description</label>
                            </div>
                            <div className='col-sm-7'>
                                <textarea rows={2} className='form-control' 
                                    name='description' 
                                    value={this.state.description} 
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className='col-sm-1'/>
                        </div>
                        <div className='row m-3'>
                            <div className='col-sm-1'/>
                            <div className='col-sm-3'>
                                <label htmlFor='genre'>Genre</label>
                            </div>
                            <div className='col-sm-7'>
                                <select 
                                    name='genre' 
                                    value={this.state.genre}
                                    className='form-select bg-warning' 
                                    onChange={this.handleChange}> {
                                        this.state.genres.map((genre) => (
                                            <option key={genre} value={genre}> {genre} </option>
                                        ))
                                    } </select>
                            </div>
                            <div className='col-sm-1'/>
                        </div>
                        <div className='row m-3'>
                            <div className='col-sm-1'/>
                            <div className='col-sm-3'>
                                <label htmlFor='language'>Language</label>
                            </div>
                            <div className='col-sm-7'>
                            <select 
                                    name="language" 
                                    value={this.state.language}
                                    className='form-select bg-warning' 
                                    onChange={this.handleChange}> {
                                        this.state.languages.map((language) => (
                                            <option key={language} value={language}> {language} </option>
                                        ))
                                    } </select>
                            </div>
                            <div className='col-sm-1'/>
                        </div>
                        <div className='row m-3'>
                            <div className='col-sm-1'/>
                            <div className='col-sm-3'>
                                <label htmlFor='author'>Author</label>
                            </div>
                            <div className='col-sm-7'>
                                <input 
                                    className='form-control' 
                                    name="author"
                                    value={this.state.author}
                                    disabled/>
                            </div>
                            <div className='col-sm-1'/>
                        </div>
                        <div className='row m-3'>
                            <div className='col-sm-1'/>
                            <div className='col-sm-3'>
                                <label htmlFor='price'>Price (INR)</label>
                            </div>
                            <div className='col-sm-7'>
                                <input className='form-control' type="number" name='price' value={this.state.price} onChange={this.handleChange}/>
                            </div>
                            <div className='col-sm-1'/>
                        </div>
                        <div className='row m-3'>
                            <div className='col-sm-1'/>
                            <div className='col-sm-3'>
                                <label htmlFor='dateOfRelease'>Date Of Release</label>
                            </div>
                            <div className='col-sm-7'>
                                <input className='form-control' type="date" name='dateOfRelease' value={this.state.dateOfRelease} onChange={this.handleChange}/>
                            </div>
                            <div className='col-sm-1'/>
                        </div>
                        <div className='row m-3'>
                            <div className='col-sm-1'/>
                            <div className='col-sm-3'>
                                <label htmlFor='book'>Book (.epub)</label>
                            </div>
                            <div className='col-sm-7'>
                                <input className="form-control" 
                                type="file" 
                                name="bookFile" 
                                onChange={this.handleChange}/>
                            </div>
                            <div className='col-sm-1'/>
                        </div>
                        <div className='row m-3'>
                            <div className='col-sm-1'/>
                            <div className='col-sm-3'>
                                <label htmlFor='cover-page'>Cover Page (.jpg)</label>
                            </div>
                            <div className='col-sm-7'>
                                <input className='form-control' 
                                type="file" 
                                name="thumbnailFile"
                                onChange={this.handleChange}/>
                            </div>
                            <div className='col-sm-1'/>
                        </div>
                        <div className='row m-3'>
                            <div className='col-sm-1'/>
                            <div className='col-sm-3'>
                                <div className='d-grid'>
                                    <Link 
                                        className="btn btn-secondary"
                                        to="/author/book">Cancel</Link>
                                </div>
                            </div>
                            <div className='col-sm-7'>
                                <div className='d-grid gap-2'>
                                    <button 
                                        className="btn btn-primary"
                                        onClick={this.doSubmit}>Submit For Review</button>
                                </div>
                            </div>
                            <div className='col-sm-1'/>
                        </div>
                    
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.getAuthorName();
        this.getLanguages();
        this.getGenres();
    }

    handleChange(e) {
        // special care for file input fields
        if (e.target.type === "file") this.setState({[e.target.name]: e.target.files[0]});
        else this.setState({[e.target.name]: e.target.value});
    }

    getLanguages() {
        BookService.getAllLanguages()
            .then((response) => {if (response.status === 200) return response.json()})
            .then(data => this.setState({languages: data.languages}))
            .catch(e => console.log(e));
    }

    getGenres() {
        BookService.getAllGenres()
        .then((response) => {if (response.status === 200) return response.json()})
        .then(data => this.setState({genres: data.genres}))
        .catch(e => console.log(e));
    }

    getAuthorName() {
        // TODO: get author id from localStorage
        AuthorService.getAuthorName(7)
        .then((response) => {if (response.status === 200) return response.text()})
        .then(data => this.setState({author: data}))
        .catch(e => console.log(e));
    }

    doSubmit() {
        this.setState({
            isbn: this.state.isbn.trim(),
            title: this.state.title.trim(),
            description: this.state.description.trim()
        }, () => {
            if (this.validateForm()) {
                AuthorService.submitBook(
                    this.state.isbn,
                    this.state.title,
                    this.state.description,
                    this.state.genre,
                    this.state.language,
                    this.state.price,
                    this.state.dateOfRelease,
                    this.state.bookFile,
                    this.state.thumbnailFile
                ).then((response) =>  {
                    if (response.status === 200) {
                        AlertService.showAlert(this, 1, "Book uploaded!");
                    }
                    else if (response.status === 500) {
                        AlertService.showAlert(this, 4, "Internal server error x_x");
                    }
                    else if (response.status === 400) {
                        AlertService.showAlert(this, 4, "Duplicate book found with same ISBN");
                    }
                })
                .catch(e => console.log(e));
            }
        });
    }

    validateForm() {
        let valid = true;
        // empty filed validation
        if ((!this.state.isbn || this.state.isbn.length === 0) || 
            (!this.state.title || this.state.title.length === 0) ||
            (!this.state.description || this.state.description.length === 0)) {
                
            AlertService.showAlert(this, 3, "Enter all fields");
            valid = false;
        } 
        else if (this.state.price < 1) {
            AlertService.showAlert(this, 3, "Price cannot be less than Rs 1");
            valid = false;
        } 
        else if (!ValidationService.dateIsValid(this.state.dateOfRelease)) { // date validation
            AlertService.showAlert(this, 3, "Enter a valid date");
            valid = false;
        }
        else if (!(this.state.thumbnailFile) || 
            !(this.state.bookFile)) { // double checking password
            AlertService.showAlert(this, 3, "Upload the required files");
            valid = false;
        }
        else if (!(this.state.thumbnailFile.name.slice(-3) === "jpg") ||
            !(this.state.bookFile.name.slice(-4) === "epub")) { // double checking password
            AlertService.showAlert(this, 3, "Upload the required files in specified format");
            console.log(this.state.bookFile.name.slice(-3),(this.state.thumbnailFile.name.slice(-2)));
            valid = false;
        }
        return valid;
    }
}

export default SellBooks;