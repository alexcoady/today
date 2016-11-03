// NPM dependencies
import React from 'react';
import dateformat from 'dateformat';
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
      return dispatch(actions.postDay(data));
    }
  };
}

DayForm.propTypes = {
  formValues: React.PropTypes.object,
  handleSubmit: React.PropTypes.func.isRequired,
  postDay: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired
};

export default connect(mapState, mapDispatch)(reduxForm({
  form: 'day-form'
})(DayForm));
