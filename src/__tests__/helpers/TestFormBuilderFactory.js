import { formBuilder } from '../../FormBuilder';
import formComponentsMap from './testComponentsMap';

export function createFormBuilder() {
  return formBuilder(formComponentsMap);
}