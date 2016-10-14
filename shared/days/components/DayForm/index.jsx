// NPM dependencies
import React from 'react';
import cookie from 'react-cookie';
import dateformat from 'dateformat';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, getFormValues } from 'redux-form';

// App dependencies
import * as actions from './../../actions';

class DayForm extends React.Component {

  render () {

    const {
      formValues,
      handleSubmit,
      postDay
    } = this.props;

    const submit = () => postDay(formValues);

    return (
      <div>
        <form onSubmit={handleSubmit(submit)}>
          <pre>
            {JSON.stringify(formValues)}
          </pre>

          <Field component="input" type="date" name="date" />

          <label>
            <Field component="input" type="checkbox" name="isGood" />
            Was today a good day?
          </label>

          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

const getInitialValues = () => {

  return {
    date: dateformat(Date.now(), 'yyyy-mm-dd')
  };
};

const mapState = () => {
  return createStructuredSelector({
    formValues: getFormValues('day-form'),
    initialValues: getInitialValues
  });
};

const mapDispatch = dispatch => {

  return {
    postDay: data => {
      const token = cookie.load('token');
      return dispatch(actions.postDay(data, token));
    }
  };
}

DayForm.propTypes = {
  formValues: React.PropTypes.object,
  handleSubmit: React.PropTypes.func.isRequired,
  postDay: React.PropTypes.func.isRequired
};

export default connect(mapState, mapDispatch)(reduxForm({
  form: 'day-form'
})(DayForm));
