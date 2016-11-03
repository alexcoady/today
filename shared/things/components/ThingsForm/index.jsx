// NPM dependencies
import React from 'react';
import classnames from 'classnames/bind';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, getFormValues } from 'redux-form';

// App dependencies
import * as actions from 'shared/things/actions';

// Component dependencies
import style from './add-thing-form.css';

const cx = classnames.bind(style);

const TextField = ({ input, label, type, meta: { error, warning } }) => (
  <div className={cx('field', { isError: error, isWarning: warning })}>
    <label className={style.label} htmlFor={input.name}>{label}</label>
    {error && <span className={style.error}>{error}</span>}
    {warning && <span className={style.warning}>{warning}</span>}
    <input id={input.name} {...input} type={type} className={style.text} />
  </div>
);

TextField.propTypes = {
  input: React.PropTypes.object.isRequired,
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  meta: React.PropTypes.object.isRequired
};

class AddThingForm extends React.Component {

  render () {

    const {
      pristine,
      submitting,
      formValues,
      handleSubmit,
      postThing
    } = this.props;

    const submit = () => postThing(formValues);

    return (
      <div className={style.root}>

        <form onSubmit={handleSubmit(submit)}>
          <Field component={TextField} name="name" type="text" label="Add a new thing" />
          <button className={style.save} type="submit" disabled={pristine || submitting}>
            Add
          </button>
        </form>

      </div>
    );
  }
}

const mapState = () => {
  return createStructuredSelector({
    formValues: getFormValues('add-thing-form')
  });
};

const mapDispatch = dispatch => {

  return {
    postThing: thing => {
      return dispatch(actions.postThing(thing));
    }
  };
};

AddThingForm.propTypes = {
  formValues: React.PropTypes.object,
  handleSubmit: React.PropTypes.func.isRequired,
  postThing: React.PropTypes.func.isRequired,
  pristine: React.PropTypes.bool.isRequired,
  submitting: React.PropTypes.bool.isRequired
};

export default connect(mapState, mapDispatch)(reduxForm({
  form: 'add-thing-form'
})(AddThingForm));
