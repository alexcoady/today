// NPM dependencies
import React, { PropTypes as T } from 'react';
import { Field, reduxForm } from 'redux-form';

// App dependencies
import TextField from 'shared/form/TextField';

// Component dependencies
import style from './thing-item.css';

const ThingItem = ({
  initialValues,
  handleDelete,
  handleSubmit,
  handleUpdate,
  pristine,
  submitting,
  invalid
}) => (
  <div className={style.root}>
    <form onSubmit={handleSubmit(handleUpdate)}>
      <Field component={TextField} type="text" name="name" label="Thing" />
      <button type="submit" disabled={pristine || submitting || invalid}>Save</button>
      <button type="button" onClick={() => {
        handleDelete(initialValues)
      }}>Delete</button>
    </form>
  </div>
);

ThingItem.propTypes = {
  form: T.string.isRequired,
  handleSubmit: T.func.isRequired,
  initialValues: T.shape({
    _id: T.string.isRequired,
    name: T.string.isRequired
  }).isRequired,
  handleDelete: T.func.isRequired,
  handleUpdate: T.func.isRequired,
  pristine: T.bool.isRequired,
  submitting: T.bool.isRequired,
  invalid: T.bool.isRequired
};

const validate = values => {

  const errors = {};

  if (!values.name) errors.name = 'Give this thing a name';

  return errors;
};

export default reduxForm({
  validate
})(ThingItem);
