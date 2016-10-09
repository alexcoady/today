// NPM
import React from 'react';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

// Feature
import * as selectors from 'shared/user/selectors';

// Component
import style from './account-form.css';

class AccountForm extends React.Component {

  render () {

    const { reset, pristine, submitting } = this.props;

    const onSubmit = ev => {
      ev.preventDefault();
      console.log('hiya bab');
    }

    return (
      <div className={style.root}>
        Account form!
        <form onSubmit={onSubmit}>
          <Field id="name" name="name" component="input" type="text" />
          <Field id="_id" name="_id" component="input" type="text" />
          <Field id="password" name="password" component="input" type="password" />
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
  submitting: React.PropTypes.bool.isRequired
};

const mapState = () => {

  return createStructuredSelector({
    initialValues: selectors.getAccount
  });
};

export default connect(mapState)(reduxForm({
  form: 'account'
})(AccountForm));
