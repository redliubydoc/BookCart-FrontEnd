import React from 'react';

import ReaderService from '../../services/ReaderService';
import withParams from '../../hocs/withParams';
import ReaderNavbar from '../Misc/ReaderNavbar';
import withAuthFilter from '../../hocs/withAuthFilter';

class MyOrders extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            orders: [],
        }
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <ReaderNavbar/>
                
                {/* Orders history page */}
                <div className='container-fluid'>
                    <h1 className='my-5 text-center muted'>Orders History</h1><hr/>
                    <table className='table text-center'>
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
                                this.state.orders.map((order) => {
                                    return (
                                        <tr>
                                            <td scope="row"><div className='my-5'>{order.orderId}</div></td>
                                            <td><div className='my-5'>{order.date}</div></td>
                                            <td><div className='my-5'><b>₹</b> {order.total}</div></td>
                                            <td>
                                                <center>
                                                    <div className='carousel slide' id={`carousel-${order.id}`} style={{width: '200px', height: "130px"}}>
                                                        <div className='carousel-inner justify-content-center'>
                                                        {
                                                            order.books.map((bookCatalog, index) => {
                                                                console.log(bookCatalog)
                                                                return (
                                                                    <div className={`carousel-item ${index === 0? 'active': ''}`} style={{border:'2px gray solid', borderRadius:'2px', width:'86px', height:'130px'}}>
                                                                        <a href="#">
                                                                            <img src={bookCatalog.thumbnail} alt={bookCatalog.isbn} style={{width: '82px', height: '126px'}}/>
                                                                        </a>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                        </div>
                                                        <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${order.id}`} data-bs-slide="prev">
                                                            <h1><i className="bi bi-arrow-left-circle-fill text-info"></i></h1>
                                                            <span className="visually-hidden">Previous</span>
                                                        </button>
                                                        <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${order.id}`} data-bs-slide="next">
                                                            <h1><i className="bi bi-arrow-right-circle-fill text-info"></i> </h1>
                                                            <span className="visually-hidden">Next</span>
                                                        </button>
                                                    </div>
                                                </center>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>    
                    </table>
                </div>
            </div>
        )
    }

    componentDidMount() {
        ReaderService.getOrderHistories(this.props.params.uid)
            .then((response) => {
                if (response.status === 200) {
                    response.json().then(data => this.setState({orders: data}));
                }
            }).catch(e => console.log(e));
    }
}

export default 
    withAuthFilter(
    withParams(
        MyOrders));