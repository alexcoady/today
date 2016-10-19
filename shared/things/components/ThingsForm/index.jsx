// NPM dependencies
import React from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, FieldArray, reduxForm, getFormValues } from 'redux-form';

// App dependencies
import * as actions from './../../actions';
import * as selectors from './../../selectors';

const ThingFieldArray = ({ fields }) => (
  <div>
    {fields.map((thing, index) => {
      return (
        <div key={index}>
          <Field name={`${thing}.name`} component="input" type="text" placeholder="Thing name" />
          <Field name={`${thing}._id`} component="input" type="text" />
        </div>
      );
    })}
    <button type="button" onClick={() => {fields.push()}}>Add thing</button>
  </div>
);
ThingFieldArray.propTypes = {
  fields: React.PropTypes.object,
  formValues: React.PropTypes.object
};

class ThingsForm extends React.Component {

  render () {

    const {
      formValues,
      handleSubmit,
      putThings
    } = this.props;

    const submit = () => {
      putThings(formValues);
    };

    return (
      <div>
        <h1>Manage your good day things</h1>
        <form onSubmit={handleSubmit(submit)}>
          <pre>
            {JSON.stringify(formValues)}
          </pre>
          <FieldArray component={ThingFieldArray} name="things" />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

const getInitialValues = state => {
  return {
    things: selectors.getAll(state)
  };
};

const mapState = () => {
  return createStructuredSelector({
    formValues: getFormValues('things-form'),
    initialValues: getInitialValues
  });
};

const mapDispatch = dispatch => {

  return {
    putThings: data => {
      const token = cookie.load('token');
      return dispatch(actions.putThings(data, token));
    }
  };
};

ThingsForm.propTypes = {
  formValues: React.PropTypes.object,
  handleSubmit: React.PropTypes.func.isRequired,
  putThings: React.PropTypes.func.isRequired
};

export default connect(mapState, mapDispatch)(reduxForm({
  form: 'things-form'
})(ThingsForm));
