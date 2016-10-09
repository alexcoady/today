// NPM
import React from 'react';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';

// Feature
import * as selectors from 'shared/user/selectors';

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

const IDField = ({input}) => (
  <div className={style.field}>
    <p><label htmlFor="_id">_id</label></p>
    <input {...input} id={input.name} type="text" />
  </div>
);
IDField.propTypes = {
  input: React.PropTypes.object.isRequired
};

const PasswordField = ({input}) => (
  <div className={style.field}>
    <p><label htmlFor="password">Password</label></p>
    <input {...input} id={input.name} type="password" />
  </div>
);
PasswordField.propTypes = {
  input: React.PropTypes.object.isRequired
};

const LogValues = ({formValues}) => {

  return (
    <div>
      <h2>Values:</h2>
      <pre>
        {JSON.stringify(formValues)}
      </pre>
    </div>
  );
}
LogValues.propTypes = {
  formValues: React.PropTypes.object
}

class AccountForm extends React.Component {

  render () {

    const { reset, pristine, submitting, formValues } = this.props;

    const handleSubmit = ev => {
      ev.preventDefault();
      console.log(formValues);
    }

    return (
      <div className={style.root}>
        <h1>Update your account</h1>
        <LogValues formValues={formValues} />
        <form onSubmit={handleSubmit}>
          <Field name="name" component={NameField} />
          <Field name="_id" component={IDField} />
          <Field name="password" component={PasswordField} />
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
  formValues: React.PropTypes.object
};

const mapState = () => {

  return createStructuredSelector({
    initialValues: selectors.getAccount,
    formValues: getFormValues('account')
  });
};

export default connect(mapState)(reduxForm({
  form: 'account'
})(AccountForm));
