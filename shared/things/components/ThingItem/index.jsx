// NPM dependencies
import React, { PropTypes as T } from 'react';
import { Field, reduxForm } from 'redux-form';

// Component dependencies
import style from './thing-item.css';

const ThingItem = ({ initialValues, handleDelete, handleSubmit, handleUpdate }) => (
  <div className={style.root}>
    <form onSubmit={handleSubmit(handleUpdate)}>
      <Field type="text" component="input" name="name" />
      <button type="submit">Save</button>
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
  handleUpdate: T.func.isRequired
};

export default reduxForm()(ThingItem);
