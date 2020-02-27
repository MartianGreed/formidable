/**
 * Builds a form field object interpreted by React.js components
 *
 * @return {{add: *, handleSubmitCallback: *, configureTitle: *, configureBottomBar: *, buildForm: *, createValidationRules: *, setInitialState: *, addActionButtons: *}}
 */
export function formBuilder(formComponentsMap) {
  let initialState = null;
  let title = null;
  let form = {};
  let submit = null;
  let rules = null;
  let actionButtons = null;

  function reset() {
    initialState = null;
    title = null;
    form = {};
    submit = null;
    rules = null;
    actionButtons = null;
  }

  function buildForm(formName) {
    if (undefined === formName) {
      throw new Error('You must give the form a name.')
    }
    if (0 === Object.keys(form).length) {
      throw new Error('You must add fields before building form.')
    }

    let formObject = {
      fields: {
        ...form
      },
      formName,
      submit: submit ?? null,
      rules: rules ?? null,
      actionButtons,
      title,
      initialState: initialState,
    };

    let keys = Object.keys(formObject.fields);
    if (keys.length) {
      let formInitialValues = {};
      keys.forEach((field) => {
        let component = formComponentsMap[formObject.fields[field].type];
        if (undefined === component) {
          component = formObject.fields[field].type;
        }
        formInitialValues[field] = component.defaultValue ?? '';

        formObject.fields[field].options.inputOptions = {
          ...component.defaultProps.inputOptions,
          ...formObject.fields[field].options.inputOptions,
        };
      });
      formObject = {
        ...formObject,
        values: formInitialValues,
      };
    }

    if (null !== title) {
      formObject = {
        ...formObject,
        title
      };
    }

    if (null !== actionButtons) {
      formObject = {
        ...formObject,
        actionButtons,
      }
    }

    reset();
    return formObject;
  }

  /**
   * @param options
   * @param isRoot
   * @return {boolean}
   */
  function validateOptions(options, isRoot = true) {
    Object.keys(options).forEach(option => {
      if (options[option] instanceof Object) {
        return validateOptions(options[option], false);
      }

      if ('type' === option && undefined !== formComponentsMap[option]) {
        throw Error(`Input type ${options[option]} is not valid.`);
      }
    });

    return true;
  }

  function add(name, type, options = {}) {
    if (!Object.prototype.hasOwnProperty.call(form, name)) {
      validateOptions(options);

      form[name] = {
        type,
        options,
      };

      return true;
    }

    throw Error(`Field '${name}' has already been declared.`);
  }

  /**
   * A Yup rules object
   * https://github.com/jquense/yup
   * @param rulesObject
   * @return {boolean}
   */
  function createValidationRules(rulesObject) {
    rules = rulesObject;
    return true;
  }

  /**
   * Use a callback that takes the form as first parameter,
   * the dispatch as second. submitCallback((form, dispatch) => {})
   * @param cb
   * @return {boolean}
   */
  function handleSubmitCallback(cb) {
    submit = cb;
    return true;
  }

  /**
   * @param titleConfig
   */
  function configureTitle(titleConfig) {
    if ('function' !== typeof titleConfig) {
      throw new Error('You must pass a React component as first argument of the "configureTitle" function.');
    }
    title = titleConfig;
  }

  /**
   * @param stateCb
   */
  function setInitialState(stateCb) {
    if ('function' !== typeof stateCb) {
      throw new Error('setInitialState argument must be a function that returns an object containing the initialState');
    }

    initialState = stateCb;
  }

  function addActionButtons(children) {
    if ('function' !== typeof children) {
      throw new Error('You must pass a React component as first argument of the "addActionButtons" function.');
    }
    actionButtons = children;
  }

  return {
    buildForm,
    add,
    configureTitle,
    createValidationRules,
    handleSubmitCallback,
    setInitialState,
    addActionButtons,
  }
}
