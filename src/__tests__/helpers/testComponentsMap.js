import React from 'react';
import { withFormidableProps } from '../../withFormidableProps';

function TextInput({ value }) {
  return <input type="text" value={value} />;
}

export function OutOfComponentsMapInput() {
  return <input type="text" />;
}

export function TestTitle() {
  return <h1>This is a test title</h1>;
}

export function TestActionButton() {
  return (
    <div>
      <button>cancel</button>
      <button>continue</button>
    </div>
  )
}

export default {
  'text': withFormidableProps(TextInput),
};
