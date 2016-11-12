// NPM dependencies
import React, { PropTypes as T } from 'react';
import dateformat from 'dateformat';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, getFormValues } from 'redux-form';

// App dependencies
import * as actions from './../../actions';
import Loader from 'shared/ui/components/Loader'

// Component dependencies
import style from './day-form.css';

class DayForm extends React.Component {

  render () {

    const {
      formValues,
      initialValues,
      handleSubmit,
      postDay,
      reset,
      pristine,
      submitting
    } = this.props;

    console.log(initialValues);

    const submit = () => postDay(formValues);

    if (!formValues) return <Loader />;

    return (
      <div>
        <form onSubmit={handleSubmit(submit)}>

          <pre>{JSON.stringify(formValues)}</pre>

          <Field className={style.date} component="input" type="hidden" name="date" />

          <div className={style.field}>
            <Field component="input" type="radio" name="isGood" value={'1'} />
            <Field component="input" type="radio" name="isGood" value={'0'} />
          </div>

          {typeof formValues.isGood === 'undefined' && <div>UNDEFINED</div>}
          {formValues.isGood === '1' && <div>Good day!</div>}
          {formValues.isGood === '0' && <div>bad day :(</div>}

          <button className={style.save} type="submit" disabled={pristine || submitting}>Save</button>
          <button className={style.save} type="button" onClick={reset} disabled={pristine || submitting}>Reset</button>
        </form>
      </div>
    );
  }
}

const getInitialValues = (state, { today = {} }) => {

  if (today) {

    return {
      date: dateformat(today.date, 'yyyy-mm-dd'),
      isGood: today.isGood === true ? '1' : '0'
    }
  }

  return {};
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
  formValues: T.object,
  today: T.object,
  handleSubmit: T.func.isRequired,
  postDay: T.func.isRequired,
  reset: T.func.isRequired,
  pristine: T.bool.isRequired,
  submitting: T.bool.isRequired
};

export default connect(mapState, mapDispatch)(reduxForm({
  form: 'day-form',
  enableReinitialize: true
})(DayForm));
