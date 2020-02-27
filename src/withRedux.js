import { formBuilder } from './FormBuilder';

export function ReduxFormBuilder({ getState, dispatch }) {
  const {
    buildForm,
    add,
    configureTitle,
    createValidationRules,
    handleSubmitCallback,
    setInitialState,
    addActionButtons,
  } = formBuilder();

  return {
    buildForm,
    add,
    configureTitle,
    createValidationRules,
    handleSubmitCallback,
    setInitialState,
    addActionButtons,
    getState,
    dispatch,
  };
}