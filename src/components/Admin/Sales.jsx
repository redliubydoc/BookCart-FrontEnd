import React, { Component } from "react";
import AdminService from "../../services/AdminService";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';

class Sales extends Component {
    constructor(props) {
        super(props);

        this.state = {
            booksSold: 0,
            totalRevenue: 0,
            totalReaders: 0,
            totalAuthors: 0,
            sales: [
                { name: 'Books Sold', details: 0 },
                { name: 'Revenue', details: 0 },
                { name: 'Readers', details: 0 },
                { name: 'Authors', details: 0 }
            ],
        }
    }

    render() {
        return (
            <>
                <div className="container p-5">
                    <center>
                        <h1 className="mt-0 mb-5">Sales</h1>
                    </center>
                    

                    <div className="row row-cols-auto justify-content-center ">
                        <div className="col" >
                            <div className="card text-center shadow-lg p-3 mb-5 bg-body rounded" style={{ width: "12rem" }}>
                                <div className="card-body">
                                    <h5 className="card-title">Books Sold</h5>
                                    <h4 className="text-danger"> {this.state.booksSold} </h4>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card text-center shadow-lg p-3 mb-5 bg-body rounded" style={{ width: "12rem" }}>
                                <div className="card-body">
                                    <h5 className="card-title">Revenue</h5>
                                    <h4 className="text-danger"><i className="fa fa-inr"></i> {this.state.totalRevenue} </h4>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card text-center shadow-lg p-3 mb-5 bg-body rounded" style={{ width: "12rem" }}>
                                <div className="card-body">
                                    <h5 className="card-title">Readers</h5>
                                    <h4 className="text-danger"> {this.state.totalReaders} </h4>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card text-center shadow-lg p-3 mb-5 bg-body rounded" style={{ width: "12rem" }}>
                                <div className="card-body">
                                    <h5 className="card-title">Authors</h5>
                                    <h4 className="text-danger"> {this.state.totalAuthors} </h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* graph placeholder */}
                    <div className="container-fluid py-5"> 
                        <div className="row">
                            <div className="col">
                                <div className="d-flex justify-content-center">
                                    <BarChart width={800} height={300} data={this.state.sales}>
                                        <Bar dataKey="details" fill="green" />
                                        <CartesianGrid stroke="#ccc" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                    </BarChart>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    componentDidMount() {
        AdminService.getSalesDetails()
            .then((response) => {
                if (response.status === 200) {
                    response.json().then(data => this.setState({
                        booksSold: data.booksSold,
                        totalRevenue: data.totalRevenue,
                        totalReaders: data.totalReaders,
                        totalAuthors: data.totalAuthors,
                        sales: [
                            { name: 'Books Sold', details: data.booksSold },
                            { name: 'Revenue', details: data.totalRevenue },
                            { name: 'Readers', details: data.totalReaders },
                            { name: 'Authors', details: data.totalAuthors }
                        ]
                        
                    }))
                }
            })
    }
}

export default Sales;