import { 
    React,
    Component, useState
} from "react";

import withNavigate from "../hocs/withNavigate";
import AlertService from "../services/AlertService"
import NavBarBeforeLogin from "./Misc/NavBarBeforeLogin";

class AccountSettings extends Component{

    constructor(props){
        super(props);
        console.log(this.state);

        this.state= {
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

        <NavBarBeforeLogin/>
        <div>
        <h1 className="text-center my-5"><i class="bi bi-person-circle"></i></h1>
        <div class="container">
        {/*<div class="container-fluid my-5">
            <div class="container">
                <div class="container p-4 pb-2" style="border: 1px grey solid; border-radius: 5px;">
                    <table class="table table-borderless">    */ }
                    <center>
                        <tbody>
                            <tr>
                                <td >  Name </td>
                                <td className="pe-1">  
                                    <input name="firstName" 
                                    className="width-100 m-1" 
                                    type="text" 
                                    placeholder="first name"
                                    value={this.state.firstName}
                                    onChange={this.handleOnChange}
                                    />
                                </td>
                                <td>
                                    <input name="lastName" 
                                        className="width-100 m-1" 
                                        type="text" 
                                        placeholder="last name"
                                        value={this.state.lastName}
                                        onChange={this.handleOnChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>  Email </td>
                                <td colspan={2}>  
                                <input name="email" 
                                    className="width-100 m-1" 
                                    type="email" 
                                    placeholder="email id"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>  Phone number </td>
                                <td colspan={2}>  
                                <input name="phoneNo" 
                                    className="width-100 m-1" 
                                    type="tel" 
                                    placeholder="phone no."
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td> Password </td>
                                <td className="pe-1">  
                                    <input name="password" 
                                        className="width-100 m-1" 
                                        type="password" 
                                        placeholder="Current password"
                                        value={this.state.password}
                                        onChange={this.confirm}/>
                                </td>
                                <td>  
                                    <input name="confirm" 
                                        className="width-100 m-1"
                                        type="password" 
                                        placeholder="New password"
                                        value={this.state.password}
                                        onChange={this.handleOnChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td> Date of Birth </td>
                                <td colSpan={2}>  
                                    <input name="dob" 
                                        className="width-100 m-1" 
                                        type="text"
                                        placeholder="date of birth"
                                        onFocus={(e) => e.target.type = "date"}
                                        onBlur={(e) => e.target.type = "text"}
                                        value={this.state.dob}
                                        onChange={this.handleOnChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td> City of birth ? </td>
                                    <td colSpan={2}>
                                        <input name="securityQuestion1" 
                                            type="text"
                                            className="width-100 m-1" 
                                            placeholder="city of birth "
                                            value={this.state.securityQuestion1}
                                            onChange={this.handleOnChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>  Grandfathers name ? </td>
                                    <td colSpan={2}>
                                        <input name="securityQuestion2" 
                                            type="text"
                                            className="width-100 m-1" 
                                            placeholder="name "
                                            value={this.state.securityQuestion2}
                                            onChange={this.handleOnChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>  Name of first school? </td>
                                    <td colSpan={2}>
                                        <input name="securityQuestion3" 
                                            type="text"
                                            className="width-100 m-1" 
                                            placeholder="school name"
                                            value={this.state.securityQuestion3}
                                            onChange={this.handleOnChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td className="pe-1">
                                    <button class="btn btn-secondary  width-100 m-1"
                                    onClick={this.doCancel}> Cancel </button>
                                        
                                </td>
                                <td colspan="2">
                                    <button class="btn btn-primary  width-100 m-1" 
                                    onClick={this.doUpdate}> Update </button>
                                        
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3">
                                    <div className="text-center">
                                        <button class="btn btn-danger width-100 m-1"
                                        onClick={this.doDelete}> Delete My Account </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody></center>
                </div>
      </div>
      </>);
      }

    handleOnChange(e) {
        this.setState({[e.target.name]: e.target.value});
       
    }

    doCancel= () => {
        this.props.navigate("/shop");
      };

    doUpdate= () =>{
        console.log(this.state);
    }
    

}

export default withNavigate(AccountSettings);