import React from 'react';
import { Carousel, Container, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class MyOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            list :[],
            pages: 1,
            currentPage: 3
        }
    }
    componentDidMount() {
        let arr = [
            {
                "id": "123456",
                "date": "24-01-2021",
                "total": "1000",
                "orders": [
                    "images/book-2.jpg",
                    "images/book-3.jpg"
                    
                ]
            },
            {
                "id": "3456123",
                "date": "28-02-2022",
                "total": "4000",
                "orders": [
                    "images/book-3.jpg",
                    "images/book-2.jpg",
                    "images/book-4.jpg"
                    
                ]
            },
            {
                "id": "123456",
                "date": "27-11-2021",
                "total": "400",
                "orders": [
                    "images/book-2.jpg",
                    "images/book-3.jpg"
                    
                ]
            }
        ];
        this.setState({list: arr, pages: 5});

        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.doPagination = this.doPagination.bind(this);
    }

    // handleChange(e) {
    //     this.setState({[e.target.name]: e.target.value})
    //     console.log(this.state);
    // }

    // handleSubmit(e) {
    //     console.log(this.state);
    // }

    doPagination(e) {
        if (e.target.getAttribute("name") === "moveFirst") this.setState({currentPage: 1});
        if (e.target.getAttribute("name") === "moveLast") this.setState({currentPage: this.state.pages}); 
        if (e.target.getAttribute("name") === "movePrev") this.setState({currentPage: this.state.currentPage-1});
        if (e.target.getAttribute("name") === "moveNext") this.setState({currentPage: this.state.currentPage+1});
    }
    
    render() {
        return (
            <div>
                {/* Navbar Component */}
                <nav class="navbar sticky-top navbar-dark bg-dark navbar-expand-lg">
                    <div class="container-fluid">
                        <span class="navbar-brand text-primary"> <b> Book Cart </b> </span>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class="nav-link" aria-current="page" href="#"> Home </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#"> Cart </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" href="#"> My Orders </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#"> About Us </a>
                                </li>

                                <li class="nav-item">
                                    <a class="nav-link" href="#"> Contact Us </a>
                                </li>
                            </ul>
                            <div class="d-flex">
                                <button class="btn btn-danger form-control" type="submit"> Logout </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Orders History Page */}
                <Container fuild>
                    <h2 className='my-5 text-muted text-center'>Order History</h2><hr/>
                    <Table responsive className='text-center'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Books</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.list.map((value) => {
                                    return (
                                        <tr>
                                            <td><div className='my-5'>{value.id}</div></td>
                                            <td><div className='my-5'>{value.date}</div></td>
                                            <td><div className='my-5'>{value.total}</div></td>
                                            <td>
                                                <center>
                                                    <Carousel variant='dark' indicators={false} fade style={{width: '200px', height: "130px"}}>
                                                        {
                                                            value.orders.map((order) => {
                                                                return (
                                                                    <Carousel.Item id={value.id}>
                                                                        <div style={{border:'2px gray solid', borderRadius:'2px', width:'86px', height:'130px'}}>
                                                                            <a href='#'><img src={process.env.PUBLIC_URL + '/' + order} style={{width: '82px', height: '126px'}}/></a>
                                                                        </div>
                                                                    </Carousel.Item>
                                                                )
                                                            })
                                                        }
                                                    </Carousel>
                                                </center>
                                            </td>
                                        </tr>
                                    )
                                })
                            }         
                        </tbody>
                    </Table>
                </Container>

                {/* pagination control placeholder */}
                <nav>
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${(this.state.currentPage === 1) ? "disabled" : ""}`}>
                            <i className="page-link bi-chevron-bar-left"
                                name="moveFirst"
                                onClick={this.doPagination}></i>
                        </li>
                        <li className={`page-item ${(this.state.currentPage === 1) ? "disabled" : ""}`}>
                            <i className="page-link bi bi-caret-left-fill"
                                name="movePrev"
                                onClick={this.doPagination}></i>
                        </li>
                        <li className="page-item active">
                            <span className="page-link"> {this.state.currentPage} </span>
                        </li>
                        <li className={`page-item ${(this.state.currentPage === this.state.pages) ? "disabled" : ""} p-0`}>
                            <i className="page-link bi bi-caret-right-fill"
                                name="moveNext"
                                onClick={this.doPagination}></i>
                        </li>
                        <li className={`page-item ${(this.state.currentPage === this.state.pages) ? "disabled" : ""}`}>
                            <i className="page-link bi-chevron-bar-right"
                                name="moveLast"
                                onClick={this.doPagination}></i>
                        </li>
                    </ul>
                </nav>
            </div>
            
        );
    }
}