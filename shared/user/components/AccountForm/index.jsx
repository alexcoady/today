// NPM dependencies
import React from 'react';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';

// App dependencies
import TextField from 'shared/form/TextField';

// Feature dependencies
import * as selectors from 'shared/user/selectors';
import * as actions from 'shared/user/actions';

// Component dependencies
import style from './account-form.css';
import RadioLabel from './components/RadioLabel';

const RadioGroup = ({ input, label, values, meta: { warning } }) => (
  <div className={style.field}>
    <span className={style.label}>{label}</span>
    {warning && <span className={style.warning}>{warning}</span>}
    <div className={style.radioGroup}>
      {values.map(val => <Field key={val} component={RadioLabel} val={val} name={input.name} />)}
    </div>
  </div>
);

RadioGroup.propTypes = {
  input: React.PropTypes.object.isRequired,
  label: React.PropTypes.string.isRequired,
  meta: React.PropTypes.object.isRequired,
  values: React.PropTypes.array.isRequired
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

          <Field component={TextField} name="name" label="Your name" type="text" />
          <Field component={RadioGroup} name="settings.daysPerWeek" label="How many good days make a good week?" values={[1,2,3,4,5,6,7]} />
          <Field component={RadioGroup} name="settings.weeksPerMonth" label="How many good weeks make a good month?" values={[1,2,3,4]} />
          <Field component={RadioGroup} name="settings.monthsPerYear" label="How many good months make a good year?" values={[1,2,3,4,5,6,7,8,9,10,11,12]} />

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
      return dispatch(actions.putAccount(data)).catch(e => e);
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

  if (+values.settings.daysPerWeek <= 3) {
    warnings.settings = warnings.settings || {};
    warnings.settings.daysPerWeek = `You can do better than that!`;
  }

  if (+values.settings.weeksPerMonth <= 2) {
    warnings.settings = warnings.settings || {};
    warnings.settings.weeksPerMonth = `You're sure?`;
  }

  if (+values.settings.monthsPerYear <= 6) {
    warnings.settings = warnings.settings || {};
    warnings.settings.monthsPerYear = `That's kind of pessimistic!`;
  }

  return warnings;
};

export default connect(mapState, mapDispatch)(reduxForm({
  form: 'account',
  validate,
  warn
})(AccountForm));
