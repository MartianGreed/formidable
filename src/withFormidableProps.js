import { createElement } from 'react';
import { setDisplayName, wrapDisplayName } from 'recompose';

export function withFormidableProps(Wrapped, inputOptions = {}) {
  const factory = createElement(Wrapped);
  const DefaultProps = ownerProps => factory(ownerProps);

  DefaultProps.defaultProps = {
    inputOptions,
  };

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(Wrapped, 'withFormidableProps'))(DefaultProps);
  }

  return DefaultProps
}