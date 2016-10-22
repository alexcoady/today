// NPM
import React from 'react';
import cookie from 'react-cookie';
import classnames from 'classnames/bind';
import { createStructuredSelector } from 'reselect';
import { Field, Fields, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';

// Feature
import * as selectors from 'shared/user/selectors';
import * as actions from 'shared/user/actions';

// Component
import style from './account-form.css';
const cx = classnames.bind(style);

const SettingFields = ({ settings: { daysPerWeek, weeksPerMonth, monthsPerYear } }) => (
  <div>
    <div className={cx('field')}>
      <label htmlFor={daysPerWeek.input.name}>How many days make a good week?</label>
      <input id={daysPerWeek.input.name} {...daysPerWeek.input} type="range" min={1} max={7} />
      <span>{ daysPerWeek.input.value }</span>
    </div>

    <div className={cx('field')}>
      <label htmlFor={weeksPerMonth.input.name}>How many weeks make a good month?</label>
      <input id={weeksPerMonth.input.name} {...weeksPerMonth.input} type="range" min={1} max={4} />
      <span>{ weeksPerMonth.input.value }</span>
    </div>

    <div className={cx('field')}>
      <label htmlFor={monthsPerYear.input.name}>How many months make a good year?</label>
      <input id={monthsPerYear.input.name} {...monthsPerYear.input} type="range" min={1} max={12} />
      <span>{ monthsPerYear.input.value }</span>
    </div>
  </div>
);
SettingFields.propTypes = {
  settings: React.PropTypes.object.isRequired
};

class AccountForm extends React.Component {

  render () {

    const {
      handleSubmit,
      pristine,
      submitting,
      formValues,
      putAccount
    } = this.props;

    const submit = () => putAccount(formValues);

    return (
      <div className={style.root}>

        <form onSubmit={handleSubmit(submit)}>

          <Field
            name="name"
            component="input"
            type="text" />

          <Fields
            names={['settings.daysPerWeek', 'settings.weeksPerMonth', 'settings.monthsPerYear']}
            component={SettingFields} />

          <button
            type="submit"
            disabled={pristine || submitting}>
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
