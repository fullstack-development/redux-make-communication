# redux-make-communication
Make communication actions and reducers for redux

## Motivation
This library provides tools for creating and managing actions and reducers to manage your state when accessing a third-party server or a backend server. The created state provides a flag for processing the status of the request, showing its error if there is one. Based on this state, you can display the process of client communication with the server.
### How it looks like without a library
Action creators
```javascript
const fetchDeposit = (data) => {
  type: 'FETCH_DEPOSIT',
  payload: { data },
}
const fetchDepositSuccess = (data) => {
  type: 'FETCH_DEPOSIT_SUCCESS',
  payload: { data },
}
const fetchDepositFail = (error) => {
  type: 'FETCH_DEPOSIT_FAIL',
  payload: { error },
}
```
```javascript
...
// We use redux-thunk for example
export const getDeposit = id => {
  store.dispatch(fetchDeposit());
  return function(dispatch, getState) {
    return fetch(`https://deposits.com/${id}`)
      .then(data => data.json())
      .then(data => {
        if (data.message === 'Not Found') {
          throw new Error('No such deposit found!');
        }
        dispatch(fetchDepositSuccess(data));
      })
      .catch(error => dispatch(fetchDepositFail(error)));
  };
};
```
Reducers
```javascript
const depositReducer = (state, action) => {
  return (state = initial, action) => {
    switch (action.type) {
      case 'FETCH_DEPOSIT_SUCCESS':
        return { state: actions.payload };
      case 'FETCH_DEPOSIT_FAIL':
        return { state: actions.error };
      default: return state;
    }
  };
}
```
Go to [usage](#usage) to see an example of our solution
## Installation
```sh
npm install redux-make-communication --save
```
```sh
yarn add redux-make-communication
```
## API
The library allows you to formalize and typify the management of your actions, encapsulating the logic of creating actions and reducers.
`makeCommunicationActionCreators(string, string, string)` - a function that takes action(`execute`, `success`, `fail`) types and returns communication action creators (`executeAction`, `successAction`, `failAction`).

`makeCommunicationReducer('' | { string, boolean })` - a function that takes action types(`execute`, `success`, `fail`) and an initial state for the reducer
## Usage
### Create action creators with `makeCommunicationActionCreators`
```typescript
import { makeCommunicationActionCreators } from 'redux-make-communication';
import * as NS from './namespace';

export const { execute: fetchDeposit, success: fetchDepositSuccess, fail: fetchDepositFail } =
  makeCommunicationActionCreators<NS.IFetchDeposit, NS.IFetchDepositSuccess, NS.IFetchDepositFail>(
    'FETCH_DEPOSIT', 'FETCH_DEPOSIT_SUCCESS', 'FETCH_DEPOSIT_FAIL',
  );
```
each action creator accepts an optional argument payload that can be typed using the types in the library
```typescript
IPlainAction<T>     // T - action type
IAction<T, P>       // T - action type, P - payload
IPlainFailAction<T, E = string>   // T - action type, E - error
IFailAction<T, P, E = string>     // T - action type, E - error, P - payload

type IFetchDeposit = IPlainAction<'FETCH_DEPOSIT'>;
type IFetchDepositSuccess = IAction<'FETCH_DEPOSIT_SUCCESS', IDeposit>;
type IFetchDepositFail = IPlainFailAction<'FETCH_DEPOSIT_FAIL'>;
```
### Create redux state with `makeCommunicationReducer`
```typescript
import { makeCommunicationReducer } from 'redux-make-communication';
import initial from './initial';
import * as NS from './namespace';

export const depositReducer = {
  depositFetching: makeCommunicationReducer<NS.IFetchDeposit, NS.IFetchDepositSuccess, NS.IFetchDepositFail>(
    'FETCH_DEPOSIT',
    'FETCH_DEPOSIT_SUCCESS',
    'FETCH_DEPOSIT_FAIL',
    initial.depositFetching,
  ),
}
```
the created state branch looks like
```typescript
ICommunication {
  isRequesting: boolean;
  error: string;
}
```
