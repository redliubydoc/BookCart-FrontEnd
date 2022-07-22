import React, {
    Component, useState
} from "react";

import { Button, Container, Form, Row, Col } from "react-bootstrap";
import "../Admin/SellBooks"
import withNavigate from "../../hocs/withNavigate"
import ValidationService from "../../services/ValidationService"
import AuthService from "../../services/AuthService"
import AlertService from "../../services/AlertService"

class AccountSettings extends Component {

    constructor(props) {
        super(props);
        console.log(this.state);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNo: "",
            currentPassword: "",
            newPassword: "",
            dob: "",
            cityOfBirth: "",
            grandFatherName: "",
            schoolName: "",

            alert: AlertService.getAlertInstance()

        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.doUpdate = this.doUpdate.bind(this);
        /* this.doCancel = this.doCancel.bind(this);
         this.doDelete = this.doDelete.bind(this);*/
        //this.validateForm = this.validateForm.bind(this);
    }

    render() {
        return (<>
            {/*<div class="container my-5 text-center">
        <i className="bi bi-person-circle" style="font-size: 80px;"></i>
        </div>*/}
            <div>
                <nav class="navbar sticky-top navbar-dark bg-dark navbar-expand-lg">
                    <div class="container-fluid">
                        <span class="navbar-brand text-primary"><b>Book Cart</b></span>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class="nav-link" aria-current="page" href="#"> Sell Books </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" aria-current="page" href="#"> My Books </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#"> Settings </a>
                                </li>
                            </ul>
                        </div>
                        <div class="d-flex">
                            <button class="btn btn-danger form-control" type="submit"> Logout </button>
                        </div>
                    </div>
                </nav>
                <h1 className="text-center my-5"><i class="bi bi-person-circle"></i></h1>
                <div class="container">
                    <Container id="settings">

                        {/*<div class="container-fluid my-5">
            <div class="container">
                <div class="container p-4 pb-2" style="border: 1px grey solid; border-radius: 5px;">
                    <table class="table table-borderless">    */ }

                        <Form.Group as={Row} className='m-3'>

                            <Form>
                                <Row>
                                    <Col sm="1" />
                                    <Col sm='3'>
                                        <Form.Label htmlFor='name'>Name</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control placeholder="First name" />
                                    </Col>
                                    <Col>
                                        <Form.Control placeholder="Last name" />
                                    </Col>
                                </Row>
                            </Form>
                        </Form.Group>
                        <Form.Group as={Row} className='m-3'>
                            <Col sm="1" />
                            <Col sm='3'>
                                <Form.Label htmlFor='email' placeholder="email">Email</Form.Label>

                            </Col>
                            <Col sm='7'>
                                <Form.Control
                                    type="email"
                                    name='email'
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                />
                            </Col>
                            <Col sm="1" />
                        </Form.Group>
                        <Form.Group as={Row} className='m-3'>
                            <Col sm="1" />
                            <Col sm='3'>
                                <Form.Label htmlFor='phone'>Phone No.</Form.Label>
                            </Col>
                            <Col sm='7'>
                                <Form.Control
                                    type="text"
                                    name='phone'
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                />
                            </Col>
                            <Col sm="1" />
                        </Form.Group>
                        <Form.Group as={Row} className='m-3'>

                            <Form>
                                <Row>
                                    <Col sm="1" />
                                    <Col sm='3'>
                                        <Form.Label htmlFor='password'>Password</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control placeholder="Current Password" />
                                    </Col>
                                    <Col>
                                        <Form.Control placeholder="New Password" />
                                    </Col>
                                </Row>
                            </Form>
                        </Form.Group>
                        <Form.Group as={Row} className='m-3'>
                            <Col sm="1" />
                            <Col sm='3'>
                                <Form.Label htmlFor='date'>Date of Birth</Form.Label>
                            </Col>
                            <Col sm='7'>
                                <Form.Control
                                    type="date"
                                    name='dob'
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                />
                            </Col>
                            <Col sm="1" />
                        </Form.Group>
                        <Form.Group as={Row} className='m-3'>
                            <Col sm="1" />
                            <Col sm='3'>
                                <Form.Label htmlFor='securityQ1'>City of Birth?</Form.Label>
                            </Col>
                            <Col sm='7'>
                                <Form.Control
                                    type="text"
                                    name='securityQ1'
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                />
                            </Col>
                            <Col sm="1" />
                        </Form.Group>
                        <Form.Group as={Row} className='m-3'>
                            <Col sm="1" />
                            <Col sm='3'>
                                <Form.Label htmlFor='securityQ2'>Grandfather's Name</Form.Label>
                            </Col>
                            <Col sm='7'>
                                <Form.Control
                                    type="text"
                                    name='securityQ2'
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                />
                            </Col>
                            <Col sm="1" />
                        </Form.Group>
                        <Form.Group as={Row} className='m-3'>
                            <Col sm="1" />
                            <Col sm='3'>
                                <Form.Label htmlFor='securityQ3'>Name of First School?</Form.Label>
                            </Col>
                            <Col sm='7'>
                                <Form.Control
                                    type="text"
                                    name='securityQ3'
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                />
                            </Col>
                            <Col sm="1" />
                        </Form.Group>
                        <Form.Group as={Row} className='m-3'>
                            <Col sm="1" />
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
                                        onClick={this.doUpdate}>Update</Button>
                                </Form.Group>
                            </Col>
                            <Col sm="1" />
                        </Form.Group>
                        <Form.Group as={Row} className='m-3'>

                            <Form.Group className='d-grid gap-2'>
                                <Button
                                    long
                                    variant="danger"
                                    onClick={this.doDelete}>Delete</Button>
                            </Form.Group>

                        </Form.Group>

                    </Container>
                </div>
            </div>
        </>);
    }

    handleOnChange(e) {
        this.setState({ [e.target.name]: e.target.value });

    }

    doCancel = () => {
        this.props.navigate("/home");
    };

    doUpdate = () => {
        //onChange={(e)=>}
    }


}

export default withNavigate(AccountSettings);