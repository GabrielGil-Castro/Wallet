import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    totalValue: 0,
  };

  allExpenses = () => {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      return expenses.reduce((sum, { value, currency, exchangeRates }) => {
        const { ask } = exchangeRates[currency];
        return sum + Number(value) * Number(ask);
      }, 0);
    }
  };

  render() {
    const { totalValue } = this.state;
    const { email } = this.props;
    console.log(email);
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <p data-testid="header-currency-field">BRL</p>
        <h3 data-testid="total-field">
          {
            this.allExpenses() ? this.allExpenses().toFixed(2) : totalValue.toFixed(2)
          }
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default connect(mapStateToProps)(Header);
