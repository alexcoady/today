// NPM
import React from 'react';
import cookie from 'react-cookie';
import classnames from 'classnames/bind';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';

// Feature
import * as selectors from 'shared/user/selectors';
import * as actions from 'shared/user/actions';

// Component
import style from './account-form.css';
import RadioLabel from './components/RadioLabel';

const cx = classnames.bind(style);

const nameField = ({ input, label, type, meta: { error, warning } }) => (
  <div className={cx('field', { isError: error, isWarning: warning })}>
    <label className={style.label} htmlFor={input.name}>{label}</label>
    {error && <span className={style.error}>{error}</span>}
    <input id={input.name} {...input} type={type} className={cx('text')} />
  </div>
);
nameField.propTypes = {
  input: React.PropTypes.object.isRequired,
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  meta: React.PropTypes.object.isRequired
};

class AccountForm extends React.Component {

  render () {

    const {
      handleSubmit,
      pristine,
      submitting,
      formValues,
      putAccount,
      invalid
    } = this.props;

    const submit = () => putAccount(formValues);

    return (
      <div className={style.root}>

        <form onSubmit={handleSubmit(submit)}>

          <div className={style.field}>
            {/*}<Field
              id="name"
              name="name"
              component="input"
              type="text"
              className={style.text} />*/}

            <Field name="name" component={nameField} label="Your name" type="text" />
          </div>

          <div className={style.field}>
            <span className={style.label}>How many good days make a good week?</span>
            <div className={style.radioGroup}>
              {[1,2,3,4,5,6,7].map(val => <Field key={val} component={RadioLabel} name="settings.daysPerWeek" val={val} />)}
            </div>
          </div>

          <div className={style.field}>
            <span className={style.label}>How many good weeks make a good month?</span>
            <div className={style.radioGroup}>
              {[1,2,3,4].map(val => <Field key={val} component={RadioLabel} name="settings.weeksPerMonth" val={val} />)}
            </div>
          </div>

          <div className={style.field}>
            <span className={style.label}>How many good months make a good year?</span>
            <div className={style.radioGroup}>
              {[1,2,3,4,5,6,7,8,9,10,11,12].map(val => <Field key={val} component={RadioLabel} name="settings.monthsPerYear" val={val} />)}
            </div>
          </div>

          <button className={style.save} type="submit" disabled={pristine || submitting || invalid}>
            Save
          </button>

        </form>
      </div>
    );
  }
}

AccountForm.propTypes = {
  reset: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  pristine: React.PropTypes.bool.isRequired,
  invalid: React.PropTypes.bool.isRequired,
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

const validate = values => {

  const errors = {};

  if (!values.name) errors.name = 'Your name is required';

  return errors;
};

const warn = values => {

  const warnings = {};

  console.log(values);

  return warnings;
};

export default connect(mapState, mapDispatch)(reduxForm({
  form: 'account',
  validate,
  warn
})(AccountForm));
