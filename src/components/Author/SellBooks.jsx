import React from 'react';
import { Form, Container, Col, Row, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./sellbooks.css"
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
        console.log(this.state);
    }

    handleSubmit(e) {
        console.log(this.state);
    }
    
    render() {
        return (
            <Container id='sellBooks'>
                <Form>
                    <Form.Group as={Row} className='m-3'>
                        <Col sm="1"/>
                        <Col sm='3'>
                            <Form.Label htmlFor='isbn'>ISBN</Form.Label>
                        </Col>
                        <Col sm='7'>
                            <Form.Control 
                                type="text"
                                name="isbn"
                                value={this.state.isbn}
                                onChange={this.handleChange}/>
                        </Col>
                        <Col sm="1"/>
                    </Form.Group>
                    <Form.Group as={Row} className='m-3'>
                        <Col sm="1"/>
                        <Col sm='3'>
                            <Form.Label htmlFor='title'>Title</Form.Label>
                        </Col>
                        <Col sm='7'>
                            <Form.Control 
                                type="text" 
                                name='title'
                                value={this.state.title}
                                onChange={this.handleChange}
                            />
                        </Col>
                        <Col sm="1"/>
                    </Form.Group>
                    <Form.Group as={Row} className='m-3'>
                        <Col sm="1"/>
                        <Col sm='3'>
                            <Form.Label htmlFor='description'>Description</Form.Label>
                        </Col>
                        <Col sm='7'>
                            <Form.Control as="textarea" rows={2} 
                                name='description' 
                                value={this.state.description} 
                                onChange={this.handleChange}
                            />
                        </Col>
                        <Col sm="1"/>
                    </Form.Group>
                    <Form.Group as={Row} className='m-3'>
                        <Col sm="1"/>
                        <Col sm='3'>
                            <Form.Label htmlFor='genre'>Genre</Form.Label>
                        </Col>
                        <Col sm='7'>
                            <Form.Select name='genre' className='bg-warning' onChange={this.handleChange}>
                                <option>Select ...</option>
                                <option>Suspense</option>
                                <option>Pyshcological Thriller</option>
                                {/* {this.state.genres.map(genre => {
                                    return (
                                        <option>{genre}</option>
                                    )
                                })} */}
                            </Form.Select>
                        </Col>
                        <Col sm="1"/>
                    </Form.Group>
                    <Form.Group as={Row} className='m-3'>
                        <Col sm="1"/>
                        <Col sm='3'>
                            <Form.Label htmlFor='language'>Language</Form.Label>
                        </Col>
                        <Col sm='7'>
                            <Form.Select name='language' className='bg-warning' onChange={this.handleChange}>
                                <option>Select ...</option>
                                <option>Hindi</option>
                                <option>English</option>
                                {/* {this.state.languages.map(lang => {
                                    return (
                                        <option>{lang}</option>
                                    )
                                })} */}
                            </Form.Select>
                        </Col>
                        <Col sm="1"/>
                    </Form.Group>
                    <Form.Group as={Row} className='m-3'>
                        <Col sm="1"/>
                        <Col sm='3'>
                            <Form.Label htmlFor='author'>Author</Form.Label>
                        </Col>
                        <Col sm='7'>
                            <Form.Control type="text" name='author' value={this.state.author} onChange={this.handleChange}/>
                        </Col>
                        <Col sm="1"/>
                    </Form.Group>
                    <Form.Group as={Row} className='m-3'>
                        <Col sm="1"/>
                        <Col sm='3'>
                            <Form.Label htmlFor='price'>Price (INR)</Form.Label>
                        </Col>
                        <Col sm='7'>
                            <Form.Control type="number" name='price' value={this.state.price} onChange={this.handleChange}/>
                        </Col>
                        <Col sm="1"/>
                    </Form.Group>
                    <Form.Group as={Row} className='m-3'>
                        <Col sm="1"/>
                        <Col sm='3'>
                            <Form.Label htmlFor='dateOfRelease'>Date Of Release</Form.Label>
                        </Col>
                        <Col sm='7'>
                            <Form.Control type="date" name='dateOfRelease' value={this.state.dateOfRelease} onChange={this.handleChange}/>
                        </Col>
                        <Col sm="1"/>
                    </Form.Group>
                    <Form.Group as={Row} className='m-3'>
                        <Col sm="1"/>
                        <Col sm='3'>
                            <Form.Label htmlFor='book'>Book (.epub)</Form.Label>
                        </Col>
                        <Col sm='7'>
                            <Form.Control type="file" name='book' value={this.state.books} onChange={this.handleChange}/>
                        </Col>
                        <Col sm="1"/>
                    </Form.Group>
                    <Form.Group as={Row} className='m-3'>
                        <Col sm="1"/>
                        <Col sm='3'>
                            <Form.Label htmlFor='cover-page'>Cover Page (.png)</Form.Label>
                        </Col>
                        <Col sm='7'>
                            <Form.Control type="file" name='cover-page' value={this.state.coverPage} onChange={this.handleChange}/>
                        </Col>
                        <Col sm="1"/>
                    </Form.Group>
                    <Form.Group as={Row} className='m-3'>
                        <Col sm="1"/>
                        <Col sm='3'>
                            <Form.Group className='d-grid'>
                                <Button 
                                    variant="secondary"
                                    onClick={this.handleCancel}>Cancel</Button>
                            </Form.Group>
                        </Col>
                        <Col sm='7'>
                            <Form.Group className='d-grid gap-2'>
                                <Button 
                                    variant="primary"
                                    onClick={this.handleSubmit}>Submit For Review</Button>
                            </Form.Group>
                        </Col>
                        <Col sm="1"/>
                    </Form.Group>
                </Form>
            </Container>
        );
    }
}