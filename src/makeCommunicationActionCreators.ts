import {
  ICommunicationActionCreators, IGenericAction, NullaryAC, IGenericFailAction, UnaryAC, UnaryFailedAC,
  IGenericPlainFailAction, NullaryFailedAC, IGenericPlainAction,
} from './types';

function makeCommunicationActionCreators<
  E extends IGenericAction, C extends IGenericAction, F extends IGenericFailAction
  >(
    executeType: E['type'], completeType: C['type'], failType: F['type'],
): ICommunicationActionCreators<UnaryAC<E>, UnaryAC<C>, UnaryFailedAC<F>>;

function makeCommunicationActionCreators<
  E extends IGenericAction, C extends IGenericAction, F extends IGenericPlainFailAction
  >(
    executeType: E['type'], completeType: C['type'], failType: F['type'],
): ICommunicationActionCreators<UnaryAC<E>, UnaryAC<C>, NullaryFailedAC<F>>;

function makeCommunicationActionCreators<
  E extends IGenericAction, C extends IGenericPlainAction, F extends IGenericFailAction
  >(
    executeType: E['type'], completeType: C['type'], failType: F['type'],
): ICommunicationActionCreators<UnaryAC<E>, NullaryAC<C>, UnaryFailedAC<F>>;

function makeCommunicationActionCreators<
  E extends IGenericAction, C extends IGenericPlainAction, F extends IGenericPlainFailAction
  >(
    executeType: E['type'], completeType: C['type'], failType: F['type'],
): ICommunicationActionCreators<UnaryAC<E>, NullaryAC<C>, NullaryFailedAC<F>>;

function makeCommunicationActionCreators<
  E extends IGenericPlainAction, C extends IGenericAction, F extends IGenericFailAction
  >(
    executeType: E['type'], completeType: C['type'], failType: F['type'],
): ICommunicationActionCreators<NullaryAC<E>, UnaryAC<C>, UnaryFailedAC<F>>;

function makeCommunicationActionCreators<
  E extends IGenericPlainAction, C extends IGenericAction, F extends IGenericPlainFailAction
  >(
    executeType: E['type'], completeType: C['type'], failType: F['type'],
): ICommunicationActionCreators<NullaryAC<E>, UnaryAC<C>, NullaryFailedAC<F>>;

function makeCommunicationActionCreators<
  E extends IGenericPlainAction, C extends IGenericPlainAction, F extends IGenericFailAction
  >(
    executeType: E['type'], completeType: C['type'], failType: F['type'],
): ICommunicationActionCreators<NullaryAC<E>, NullaryAC<C>, UnaryFailedAC<F>>;

function makeCommunicationActionCreators<
  E extends IGenericPlainAction, C extends IGenericPlainAction, F extends IGenericPlainFailAction
  >(
    executeType: E['type'], completeType: C['type'], failType: F['type'],
): ICommunicationActionCreators<NullaryAC<E>, NullaryAC<C>, NullaryFailedAC<F>>;

function makeCommunicationActionCreators(executeType: string, completeType: string, failType: string) {
  return {
    execute: (payload: any) => {
      return { type: executeType, payload };
    },
    completed: (payload: any) => {
      return { type: completeType, payload };
    },
    failed: (error: any, payload: any) => {
      return { type: failType, error, payload };
    },
  };
}

export default makeCommunicationActionCreators;
