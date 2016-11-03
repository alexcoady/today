// NPM dependencies
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, FieldArray, reduxForm, getFormValues } from 'redux-form';

// App dependencies
import * as actions from './../../actions';
import * as selectors from './../../selectors';

// Component dependencies
import style from './add-thing-form.css';


class AddThingForm extends React.Component {

  render () {

    return (
      <div className={style.root}>
        add thing
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
  postThing: React.PropTypes.func.isRequired
};

export default connect(mapState, mapDispatch)(reduxForm({
  form: 'add-thing-form'
})(AddThingForm));
