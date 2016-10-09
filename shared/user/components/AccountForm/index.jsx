// NPM
import React from 'react';
import cookie from 'react-cookie';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';

// Feature
import * as selectors from 'shared/user/selectors';
import * as actions from 'shared/user/actions';

// Component
import style from './account-form.css';

const NameField = ({input}) => (
  <div className={style.field}>
    <p><label htmlFor="name">Name</label></p>
    <input {...input} id={input.name} type="text" />
  </div>
);
NameField.propTypes = {
  input: React.PropTypes.object.isRequired
};

class AccountForm extends React.Component {

  render () {

    const {
      reset,
      pristine,
      submitting,
      formValues,
      putAccount
    } = this.props;

    const handleSubmit = ev => {
      ev.preventDefault();
      putAccount(formValues)
    }

    return (
      <div className={style.root}>
        <h1>Update your account</h1>
        <form onSubmit={handleSubmit}>
          <Field name="name" component={NameField} />
          <button type="submit" disabled={pristine || submitting}>Save</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>Cancel changes</button>
        </form>
      </div>
    );
  }
}

AccountForm.propTypes = {
  reset: React.PropTypes.func.isRequired,
  pristine: React.PropTypes.bool.isRequired,
  submitting: React.PropTypes.bool.isRequired,
  formValues: React.PropTypes.object,
  putAccount: React.PropTypes.func.isRequired
};

const mapState = () => {

  return createStructuredSelector({
    initialValues: selectors.getAccount,
    formValues: getFormValues('account')
  });
};

const mapDispatch = dispatch => {

  return {
    putAccount: (data) => {
      const token = cookie.load('token');
      return dispatch(actions.putAccount(data, token)).catch(e => e);
    }
  };
};

export default connect(mapState, mapDispatch)(reduxForm({
  form: 'account'
})(AccountForm));
