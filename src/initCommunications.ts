import { ICommunication } from './namespace';

export const initialCommunicationField: ICommunication = { isRequesting: false, error: '' };

export function initCommunications<S>(
  fieldNames: Array<keyof S>,
): { [P in keyof S]: ICommunication } {
  return fieldNames.reduce(
    (communicationFields, fieldName) => ({
      ...communicationFields,
      [fieldName]: initialCommunicationField,
    }),
    {} as any,
  );
}
