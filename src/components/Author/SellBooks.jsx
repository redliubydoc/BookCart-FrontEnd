import React from 'react';
import { Link } from 'react-router-dom';
import AuthorNavbar from '../Misc/AuthorNavbar';
import "./SellBooks.css"
export class SellBooks extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isbn: "", 
            title: "",
            description: "",
            genres: "",
            languages: "",
            author: "",
            price: "",
            dateOfRelease: "",
            books: "",
            coverPage: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e) {
        console.log(this.state);
    }
    
    render() {
        return (
            <div>
                <AuthorNavbar/>
                <div className='container' id='sellBooks'>
                    <form>
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
                                <select name='genre' className='form-select bg-warning' onChange={this.handleChange}>
                                    <option>Select ...</option>
                                    <option>Suspense</option>
                                    <option>Pyshcological Thriller</option>
                                </select>
                            </div>
                            <div className='col-sm-1'/>
                        </div>
                        <div className='row m-3'>
                            <div className='col-sm-1'/>
                            <div className='col-sm-3'>
                                <label htmlFor='language'>Language</label>
                            </div>
                            <div className='col-sm-7'>
                                <select name='language' className='form-select bg-warning' onChange={this.handleChange}>
                                    <option>Select ...</option>
                                    <option>Hindi</option>
                                    <option>English</option>
                                    
                                </select>
                            </div>
                            <div className='col-sm-1'/>
                        </div>
                        <div className='row m-3'>
                            <div className='col-sm-1'/>
                            <div className='col-sm-3'>
                                <label htmlFor='author'>Author</label>
                            </div>
                            <div className='col-sm-7'>
                                <input type="text" className='form-control' name='author' value={this.state.author} onChange={this.handleChange}/>
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
                                <input className='form-control' type="file" name='book' value={this.state.books} onChange={this.handleChange}/>
                            </div>
                            <div className='col-sm-1'/>
                        </div>
                        <div className='row m-3'>
                            <div className='col-sm-1'/>
                            <div className='col-sm-3'>
                                <label htmlFor='cover-page'>Cover Page (.png)</label>
                            </div>
                            <div className='col-sm-7'>
                                <input className='form-control' type="file" name='cover-page' value={this.state.coverPage} onChange={this.handleChange}/>
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
                                        onClick={this.handleSubmit}>Submit For Review</button>
                                </div>
                            </div>
                            <div className='col-sm-1'/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

{/* {this.state.genres.map(genre => {
                                        return (
                                            <option>{genre}</option>
                                        )
                                    })} */}
{/* {this.state.languages.map(lang => {
                                        return (
                                            <option>{lang}</option>
                                        )
                                    })} */}