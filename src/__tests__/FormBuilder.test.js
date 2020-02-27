import { formBuilder } from '../FormBuilder';
import { createFormBuilder } from './helpers/TestFormBuilderFactory';
import { OutOfComponentsMapInput, TestActionButton, TestTitle } from './helpers/testComponentsMap';
import { withFormidableProps } from '../withFormidableProps';

test('it can instantiate a FormBuilder', () => {
  const builder = formBuilder();

  expect(builder).toHaveProperty('buildForm');
  expect(builder).toHaveProperty('add');
  expect(builder).toHaveProperty('configureTitle');
  expect(builder).toHaveProperty('createValidationRules');
  expect(builder).toHaveProperty('handleSubmitCallback');
  expect(builder).toHaveProperty('setInitialState');
  expect(builder).toHaveProperty('addActionButtons');
});

test("it throws error when you don't give it a name", () => {
  const builder = formBuilder();
  expect(builder.buildForm).toThrowError(new Error('You must give the form a name.'));
});

test('it throws error when without fields', () => {
  function buildForm() {
    builder.buildForm('thisIsAFormName');
  }
  const builder = formBuilder();
  expect(buildForm).toThrowError(new Error('You must add fields before building form.'));
});

test('it create a form object', () => {
  const builder = createFormBuilder();

  builder.add('field', 'text', {
    label: 'Test field',
  });

  const formConfig = builder.buildForm('testForm');

  expect(formConfig).toHaveProperty('fields');
  expect(formConfig).toHaveProperty('formName');

  expect(Object.keys(formConfig.fields).length).toBe(1);
  expect(formConfig.values).toHaveProperty('field');
  expect(formConfig.formName).toBe('testForm');
});

test('it can use external components', () => {
  const builder = createFormBuilder();

  builder.add('field', withFormidableProps(OutOfComponentsMapInput), {
    label: 'Test field',
  });

  const formConfig = builder.buildForm('testForm');

  expect(formConfig.fields.field.type).toHaveProperty('displayName');
  expect(formConfig.fields.field.type.displayName).toBe('withFormidableProps(OutOfComponentsMapInput)');
  expect(formConfig.fields.field.type.defaultProps).toHaveProperty('inputOptions');
});

test('it cannot redeclare a field', () => {
  function addComponent() {
    builder.add('field', withFormidableProps(OutOfComponentsMapInput), {
      label: 'Test field',
    });
  }
  const builder = createFormBuilder();

  // Execute one time to add the first field
  addComponent();
  // do it again and fail
  expect(addComponent).toThrow(new Error(`Field 'field' has already been declared.`));
});

test('it can add a react title component', () => {
  const builder = createFormBuilder();
  builder.add('field', withFormidableProps(OutOfComponentsMapInput), {
    label: 'Test field',
  });

  builder.configureTitle(TestTitle);

  const formConfig = builder.buildForm('testForm');

  expect(formConfig.title).toBe(TestTitle);
});

test('it cannot be a simple title', () => {
  function addTitle() {
    builder.configureTitle('This is a test title');
  }
  const builder = createFormBuilder();

  expect(addTitle).toThrow(new Error('You must pass a React component as first argument of the "configureTitle" function.'));
});

test('it can add a react title children', () => {
  const builder = createFormBuilder();
  builder.add('field', withFormidableProps(OutOfComponentsMapInput), {
    label: 'Test field',
  });

  builder.addActionButtons(TestActionButton);

  const formConfig = builder.buildForm('testForm');

  expect(formConfig.actionButtons).toBe(TestActionButton);
});

test('it cannot be a simple children', () => {
  function addActionButtonsWrapper() {
    builder.addActionButtons('This is a test title');
  }
  const builder = createFormBuilder();

  expect(addActionButtonsWrapper).toThrow(new Error('You must pass a React component as first argument of the "addActionButtons" function.'));
});