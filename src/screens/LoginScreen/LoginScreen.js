import React, { Component } from 'react';
import './LoginScreen.css';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import LoginController from './CustomerLoginController';

// component
import { Form, Button } from 'react-bootstrap';
// import FailedModal from '../../components/SuccessModal/SuccessModal';
import LoginInput from '../../components/LoginInput/LoginInput';

// images
import { Images } from '../../assets/Assets';

// icons
import { FaWindows } from 'react-icons/fa';
// import { BsEyeSlashFill, BsEyeFill } from 'react-icons/bs';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showLoader: false,
      showPassword: false,
      modalShow: false,
      errorMessage: '',
      emailError: false,
      passwordError: false,
    };
  }

  componentDidMount() {}

  componentWillMount() {}

  inputChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (this.state.emailError) {
      this.setState({ emailError: false });
    }
    if (this.state.passwordError) {
      this.setState({ passwordError: false });
    }
  };

  submitHandler = (e) => {
    e.preventDefault();
    if (!this.state.email && !this.state.password) {
      return this.setState({ emailError: true, passwordError: true });
      // alert('Email && Password write');
    }

    if (!this.state.email) {
      return this.setState({ emailError: true });
    }

    if (!this.state.password) {
      return this.setState({ passwordError: true });
    }

    this.setState({ showLoader: true });
    LoginController.login(
      this.state.email,
      this.state.password,
      (callbackResponse) => {
        if (callbackResponse.success === true) {
          console.log('login page res ====> ', callbackResponse);
          this.props.history.push('/home');
          this.setState({ showLoader: false });
        } else {
          this.setState({
            showLoader: false,
            modalShow: true,
            errorMessage: callbackResponse.message,
          });
        }
      }
    );
  };

  render() {
    const {
      email,
      password,
      showLoader,
      emailError,
      passwordError,
      errorMessage,
      modalShow,
    } = this.state;

    return (
      <React.Fragment>
        <div className='login'>
          <div className='login__form'>
            <div className='mb-5 text-center'>
              <img src={Images.logo} alt='logo' className='img-fluid w-50' />
            </div>
            <h4 className='login__form__text'>Sign in</h4>
            <form onSubmit={this.submitHandler} autoComplete='off'>
              <Form.Group className='spacer bor-bottom' controlId='email'>
                <LoginInput
                  name='email'
                  type={'text'}
                  placeholder='username'
                  value={email}
                  onChange={this.inputChangeHandler}
                />
              </Form.Group>
              {emailError && (
                <p className='text-danger'>Please provide username</p>
              )}
              <Form.Group
                className='spacer d-flex align-items-center bor-bottom'
                controlId='password'
              >
                <LoginInput
                  name='password'
                  type={this.state.showPassword ? 'text' : 'password'}
                  placeholder='password'
                  value={password}
                  onChange={this.inputChangeHandler}
                />
              </Form.Group>
              {passwordError && (
                <p className='text-danger mt-2'>Please provide password</p>
              )}
              <div className=''>
                <Link to='#'>Forget Password?</Link>
              </div>
              <div className='d-flex justify-content-end align-items-center mt-2'>
                {modalShow && (
                  <span className='d-inline-block text-danger text-center font-13'>
                    {errorMessage}
                  </span>
                )}
                <Button type='submit' className='form__btn'>
                  {showLoader === true ? (
                    <Spinner animation='border' size='sm' color='#fff' />
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </div>
            </form>
            <h5 className='mt-4 font-weight-bold text-center'>OR</h5>
            <hr />
            <div className='text-center mt-3'>
              <Button type='button' className='login__btn mb-2'>
                <FaWindows size={28} color='#fff' className='mr-1' />
                <span className='d-inline-block w-10'>Login with Windows</span>
              </Button>
              <Button type='button' className='login__btn'>
                <img
                  src={Images.samlLogo}
                  alt='saml logo'
                  className='img-fluid saml-logo'
                />
                <span className='d-inline-block w-10 pl-2 text-left'>
                  Login with SAML
                </span>
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}



export default LoginScreen;
