import {
    React,
    Component
} from 'react';

import {
    Link 
} from 'react-router-dom';

import withNavigate from '../hocs/withNavigate';
import AlertService from '../services/AlertService';
import AuthService from '../services/AuthService';
import ValidationService from '../services/ValidationService';
import Alert from './Misc/Alert';
  
class Login extends Component {
  
    constructor(props) {
        super(props);

        this.state = {
            accountType: 1,

            username : "", 
            password : "",

            alert: AlertService.initializeAlert()
        };

        this.handleOnChange = this.handleOnChange.bind(this);
        this.doLogin = this.doLogin.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    render() {
        return(<>
            {/* form placeholder */}
            <div className="container">
                <table className="table table-borderless">  
                    <tbody>
                        {/* alert placeholder */}
                        <tr>
                            <td> 
                                { this.state.alert.show && <Alert level={this.state.alert.level} msg={this.state.alert.msg}/> } 
                            </td>
                        </tr>
                        <tr>
                            <td>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi recusandae beatae debitis voluptatem reiciendis accusantium repellat minus at, officiis, adipisci deleniti deserunt? Nobis at dicta deleniti fugiat? Possimus, omnis maiores!
                            Dolorum facere eligendi fugit, minus voluptatibus odio nemo deserunt assumenda blanditiis. Saepe molestias cum error unde asperiores aut perferendis, ab vel facere in, impedit atque veritatis rem illum neque dolorum.
                            Aspernatur velit veniam officiis totam. Magni necessitatibus eius officiis enim ipsum officia ratione porro. Assumenda, ex. Ab debitis deleniti a voluptatum dolor! Voluptate rem nesciunt laborum ipsam vero perspiciatis architecto.
                            Facere quidem totam tempore odio dignissimos dolore accusantium iusto quod blanditiis veritatis. Quidem deleniti sunt perferendis blanditiis minus eius, repellat ipsum mollitia recusandae totam obcaecati nesciunt nemo quisquam temporibus officiis.
                            Nemo nesciunt iure ab doloremque reprehenderit accusamus laudantium delectus? Corrupti id ex, iste at adipisci facilis natus distinctio aliquid architecto impedit cumque voluptas facere aperiam, rem, maiores laboriosam ducimus. Amet.
                            Cupiditate, numquam nemo. Doloribus harum perferendis inventore voluptate possimus, ipsa adipisci dolor blanditiis repellat, nulla, ullam eos iure quasi maiores enim? Voluptatem, temporibus in ex reiciendis quae laboriosam ducimus pariatur!
                            Cumque perspiciatis fugit quisquam consequuntur aliquid, facilis suscipit aperiam et, itaque quibusdam unde distinctio. Temporibus totam voluptatibus vel ex, quod eius pariatur nobis fuga quasi consectetur mollitia ipsum quibusdam officiis.
                            Consectetur perspiciatis tempore dolorum eligendi ab repellendus eveniet sunt odit perferendis maxime! Officia, illo. Nulla, aut ex, quos non, maiores fugiat sequi cupiditate tenetur eum molestias debitis est sint error?
                            Facere, dolor quisquam, fuga vitae maxime unde consequatur odit provident numquam, soluta qui alias placeat. Ea, maiores! Eaque, excepturi mollitia consectetur dicta necessitatibus quod at sit quaerat commodi reprehenderit dolores.
                            Sed, commodi! Cupiditate ut modi et eaque officia necessitatibus quisquam vel excepturi aspernatur obcaecati architecto quo facere debitis velit, sit ducimus nihil magni repellat! Nesciunt in ipsa neque consectetur veritatis.
                            </td>
                        </tr>
                        <tr>
                            <td> 
                                <input name="username" 
                                    className="form-control" 
                                    type="text"  
                                    placeholder="Email ID"
                                    value={this.state.username} 
                                    onChange={this.handleOnChange}/> 
                            </td>
                        </tr>
                        <tr> 
                            <td> 
                                <input name="password"
                                    className="form-control" 
                                    type="password"  
                                    placeholder="Password"
                                    value={this.state.password} 
                                    onChange={this.handleOnChange}/> 
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <select name="accountType" 
                                    className="btn btn-warning width-100"
                                    value={this.state.accountType} 
                                    onChange={this.handleOnChange}>                       
                                    <option value={1}> Reader </option>  
                                    <option value={2}> Author </option>  
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-primary width-100 mt-2" 
                                    onClick={this.doLogin}> Login </button> <br/>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center">
                                <Link to="/reset-password"> Forget password ? </Link>
                            </td>
                        </tr>
                    </tbody>             
                </table>
            </div>
        </>);
	}

    handleOnChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    doLogin() {
        this.setState({
                username: this.state.username.trim()
            }, () => {
                if (this.validateForm()) {
                    
                    let username = this.state.username;
                    let password = this.state.password;
                    let accountType = parseInt(this.state.accountType);

                    // on login successful
                    if (AuthService.login(username, password, accountType)) { 
                        // redirect to shop page
                        this.props.navigate("/shop");
                    }
                    else {
                        this.setState(
                            {alert: AlertService.showAlert(4, "Invalid credentials")},
                            () => AlertService.scrollTop()
                        );
                    }
                }
            }
        );
    }

    validateForm() {
        let valid = true;

        // empty filed validation
        if ((!this.state.username || this.state.username.length === 0) || 
            (!this.state.password || this.state.password.length === 0)) {
            
            this.setState({alert: AlertService.showAlert(3, "Enter all fields")});
            valid = false;
        }
        else if (!ValidationService.emailIsValid(this.state.username)) { // email validation
            this.setState({alert: AlertService.showAlert(3, "Enter a valid email")});
            valid = false;
        } 
        return valid;
    }
}

export default withNavigate(Login);

