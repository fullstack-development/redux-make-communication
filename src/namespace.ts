export interface IPlainAction<T> {
  type: T;
}

export interface IAction<T, P> extends IPlainAction<T> {
  payload: P;
}

export interface IPlainFailAction<T, E = string> extends IPlainAction<T> {
  error: E;
}

export interface ICommunication<E = string> {
  isRequesting: boolean;
  error: E;
}

export interface IFailAction<T, P, E = string> extends IPlainFailAction<T, E> {
  payload: P;
}

export interface IProtectAction {
  type: '';
  error: any;
}

export interface ICommunicationActionCreators<E, C, F> {
  execute: E;
  completed: C;
  failed: F;
}

export type IGenericPlainAction = IPlainAction<string>;
export type IGenericAction = IAction<string, any>;
export type IGenericPlainFailAction = IPlainFailAction<string>;
export type IGenericFailAction = IFailAction<string, any>;

export type NullaryAC<A extends IGenericPlainAction> = () => A;
export type UnaryAC<A extends IGenericAction> = (payload: A['payload']) => A;

export type NullaryFailedAC<A extends IGenericPlainFailAction> = (error: A['error']) => A;
export type UnaryFailedAC<A extends IGenericFailAction> = (error: A['error'], payload: A['payload']) => A;
