# redux-make-communication
Make communication actions and reducers for redux

## Motivation
This library provides tools for creating and managing actions and reducers to manage your state when accessing a third-party server or backend server. The created state provides a flag for processing the status of the request, showing its error if there is one. Based on this state, you can display the process of client communication with the server.
### How it looks like without a library
Action creators
```javascript
const fetchDeposit = (data) => {
  type: 'FETCH_DEPOSIT',
  payload: { data },
}
const fetchDepositComplete = (data) => {
  type: 'FETCH_DEPOSIT_COMPLETE',
  payload: { data },
}
const fetchDepositFailed = (error) => {
  type: 'FETCH_DEPOSIT_FAILED',
  payload: { error },
}
```
```javascript
...
const boundFetchDeposit = data => dispatch(fetchDeposit(data));
const boundFetchDepositCompleted = data => dispatch(fetchDepositComplete(data));
const boundFetchDepositFailed = error => dispatch(fetchDepositFailed(error));
```
Reducers
```javascript
const depositReducer = (state, action) => {
  return (state = initial, action) => {
    switch (action.type) {
      case 'FETCH_DEPOSIT_COMPLETE':
        return { state: actions.payload };
      case 'FETCH_DEPOSIT_FAILED':
        return { state: actions.error };
      default: return state;
    }
  };
}
```
## Installation
```sh
npm install @fsd/redux-make-communication --save
```
```sh
yarn add @fsd/redux-make-communication
```
## API
Library allow you to [formalize and typify](#usage) the management of your actions, encapsulating the logic of creating actions and reducers.
`makeCommunicationActionCreators(string, string, string)` - a function that takes action(`execute`, `complete`, `failed`) types and returns an action creators (`executeAction`, `completedAction`, `FailedAction`).

`makeCommunicationReducer('' | { string, boolean })` - a function that takes action(`execute`, `complete`, `failed`) types and initial state of reducer and returns a redux state.
## <a name="usage"></a>Usage
### Create action creators with `makeCommunicationActionCreators`
```typescript
import { makeCommunicationActionCreators } from '@fsd/redux-make-communication';
import * as NS from './namespace';

export const { execute: chooseDeposit, completed: chooseDepositCompleted, failed: chooseDepositFail } =
  makeCommunicationActionCreators<NS.IChooseDeposit, NS.IChooseDepositCompleted, NS.IChooseDepositFail>(
    'CHOOSE_DEPOSIT', 'CHOOSE_DEPOSIT_COMPLETED', 'CHOOSE_DEPOSIT_FAILED',
  );
```
each action creator accepts an optional argument payload that can be typed using the types in the library
```typescript
IPlainAction<T>     // T - action type
IAction<T, P>       // T - action type, P - payload
IPlainFailAction<T, E = string>   // T - action type, E - error
IFailAction<T, P, E = string>     // T - action type, E - error, P - payload

type IFetchDeposit = IPlainAction<'FETCH_DEPOSIT'>;
type IFetchDepositSuccess = IAction<'FETCH_DEPOSIT_COMPLETED', IDeposit>;
type IFetchDepositFail = IPlainFailAction<'FETCH_DEPOSIT_FAILED'>;
```
### Create redux state with `makeCommunicationReducer`
```typescript
import { makeCommunicationReducer } from '@fsd/redux-make-communication';
import initial from './initial';
import * as NS from './namespace';

export const depositReducer = {
  depositFetching: makeCommunicationReducer<NS.IChooseDeposit, NS.IChooseDepositCompleted, NS.IChooseDepositFail>(
    'FETCH_DEPOSIT',
    'FETCH_DEPOSIT_COMPLETED',
    'FETCH_DEPOSIT_FAILED',
    initial.depositFetching,
  ),
}
```
the state branch created looks like
```typescript
ICommunication {
  isRequesting: boolean,
  error: string,
}
```
