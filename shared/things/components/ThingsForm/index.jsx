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
          <Field name={`${thing}.name`} component="input" type="text" />
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
      putThings,
      hasFetchedAll
    } = this.props;

    if (!hasFetchedAll) return null;

    const submit = () => {
      putThings(formValues);
    };

    return (
      <div>
        <h1>Manage your good day things</h1>
        <form onSubmit={handleSubmit(submit)}>
          <FieldArray component={ThingFieldArray} name="things" />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }

  componentWillMount () {

    const {
      fetchAll,
      hasFetchedAll,
      isFetchingAll
    } = this.props;

    if (hasFetchedAll || isFetchingAll) return;

    fetchAll();
  }
}

const getInitialValues = state => {

  return {
    things: selectors.getAll(state)
  }
};

const mapState = () => {
  return createStructuredSelector({
    formValues: getFormValues('things-form'),
    hasFetchedAll: selectors.getHasFetchedAll,
    initialValues: getInitialValues,
    isFetchingAll: selectors.getIsFetchingAll
  });
};

const mapDispatch = dispatch => {

  const token = cookie.load('token');

  return {
    putThings: data => {
      return dispatch(actions.putThings(data, token));
    },
    fetchAll: () => {
      return dispatch(actions.fetchAll(token));
    }
  };
};

ThingsForm.propTypes = {
  fetchAll: React.PropTypes.func.isRequired,
  formValues: React.PropTypes.object,
  hasFetchedAll: React.PropTypes.bool.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  isFetchingAll: React.PropTypes.bool.isRequired,
  putThings: React.PropTypes.func.isRequired
};

export default connect(mapState, mapDispatch)(reduxForm({
  form: 'things-form',
  enableReinitialize: true
})(ThingsForm));
