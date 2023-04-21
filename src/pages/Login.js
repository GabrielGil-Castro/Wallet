import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { emailSubmit } from '../redux/actions/index';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disable: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateForm);
  };

  validateForm = () => {
    const { email, password } = this.state;
    const regexEmail = /[\w_.-]+@\w+(\.\w{2,3}){1,2}/g;
    const PASSWORD_LENGTH = 6;
    const checkEmail = regexEmail.test(email);
    const checkPassword = password.length >= PASSWORD_LENGTH;
    if (checkPassword && checkEmail) {
      this.setState({ disable: false });
    } else {
      this.setState({ disable: true });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(emailSubmit(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, disable } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            name="email"
            value={ email }
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            name="password"
            value={ password }
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ disable }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
