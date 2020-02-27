Formidable
=

Formbidable is a javascript library working with [React.js](https://reactjs.org/) that handles the pain of forms by letting you create form configurations in order to turn them into components.

We have wrappers for :
- [x] Formik
- [ ] Redux Form
- [ ] useForm

*if you use any of theses libraries, feel free to contribute !*


**For configuration reference and tutorials go to [the wiki page](https://github.com/MartianGreed/formidable/wiki)**

Installation
-

To install the library :
```
npm install --save martian/formidable
```
or if you are using yarn
```
yarn add --save martian/formidable
```


How it works
-
Basically, to make the library work, you will have to provide two things :

- A components map (to define the type of input you use)
- Some form configurations (to define how the field should be)

And that's it ! Then you can get rid of any repetitive or painful forms...

#### Components Map
A typical components map looks like this :
```javascript
const TEXT_TYPE = 'text';
const EMAIL_TYPE = 'email';
const PASSWORD_TYPE = 'password';

export const componentsMap = {
    [TEXT_TYPE]: YourTextInputImplementation,
    [EMAIL_TYPE]: YourEmailInputImplementation,
    [PASSWORD_TYPE]: YourPasswordInputImplementation,
};
```

#### Form configurations
A form configuration is structured this way :
```javascript
export function loginType({ add, builder }) {
    add('login', EMAIL_TYPE, {
        label: 'Email',
    });

    add('password', PASSWORD_TYPE, {
        label: 'Password',
    });

    return buildForm('loginType');
}
```


Documentation
-
1. [First steps](https://github.com/MartianGreed/formidable/wiki/First-steps)
1. [Use Formidable with Formik](https://github.com/MartianGreed/formidable/wiki/Use-Formidable-with-Formik)