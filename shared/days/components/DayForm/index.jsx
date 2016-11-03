// NPM dependencies
import React from 'react';
import cookie from 'react-cookie';
import dateformat from 'dateformat';
import _findLast from 'lodash/findLast';
import _isDate from 'lodash/isDate';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, getFormValues } from 'redux-form';

// App dependencies
import * as actions from './../../actions';
import Loader from 'shared/ui/components/Loader'

// Component dependencies
import style from './day-form.css';
import MainCTA from './components/MainCTA';

class DayForm extends React.Component {

  render () {

    const {
      formValues,
      handleSubmit,
      postDay,
      submitting,
    } = this.props;

    const submit = () => postDay(formValues);

    if (!formValues) return <Loader />;

    return (
      <div>
        <form onSubmit={handleSubmit(submit)}>

          <Field className={style.date} component="input" type="hidden" name="date" />

          <div className={style.field}>
            <Field component={MainCTA} name="isGood" />
          </div>

          <button className={style.save} type="submit" disabled={submitting}>Save</button>
        </form>
      </div>
    );
  }
}

const datesSame = (date1, date2) => {

  console.log(date1, date2)

  let d1 = _isDate(date1) ? date1 : new Date(date1);
  let d2 = _isDate(date2) ? date2 : new Date(date2);

  if (!_isDate(d1) || !_isDate(d2)) return false;

  return d1.getDate() === d2.getDate()
    && d1.getMonth() === d2.getMonth()
    && d1.getFullYear() === d2.getFullYear() ? true : false;
};

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
  days: React.PropTypes.array.isRequired,
  formValues: React.PropTypes.object,
  handleSubmit: React.PropTypes.func.isRequired,
  postDay: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired
};

export default connect(mapState, mapDispatch)(reduxForm({
  form: 'day-form'
})(DayForm));
