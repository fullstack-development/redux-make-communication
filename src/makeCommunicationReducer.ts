import { ICommunication, IPlainAction, IPlainFailAction, IProtectAction } from './namespace';

export function makeCommunicationReducer<
  E extends IPlainAction<string> = IProtectAction,
  C extends IPlainAction<string> = IProtectAction,
  F extends IPlainFailAction<string> = IProtectAction
>(
  executeType: E['type'],
  successType: C['type'],
  failType: F['type'],
  initial: ICommunication<F['error']>,
): (
  state: ICommunication<F['error']> | undefined,
  action: IPlainAction<string>,
) => ICommunication<F['error']> {
  return (state: ICommunication<F['error']> = initial, action: IPlainAction<string>) => {
    switch (action.type) {
      case executeType:
        return { error: '', isRequesting: true };
      case successType:
        return { error: '', isRequesting: false };
      case failType:
        return { error: (action as F).error, isRequesting: false };
      default:
        return state;
    }
  };
}
