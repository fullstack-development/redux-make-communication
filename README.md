# redux-make-communication
Make communication actions and reducers for redux

## Installation
```sh
npm install @fsd/redux-make-communication --save
```
```sh
yarn add @fsd/redux-make-communication
```
## API
`makeCommunicationActionCreators(string, string, string)` - a function that takes action(`communication`, `comlete`, `failed`) types and returns an action creators (`communicationAction`, `completedAction`, `FailedAction`).

`makeCommunicationReducer('' | { string, boolean })` - a function that takes action(`communication`, `comlete`, `failed`) types and initial state of reducer and returns a redux state.
## Usage
### Create actions creators with `makeCommunicationActionCreators`
```typescript
import { makeCommunicationActionCreators } from '@fsd/redux-make-communication';
import * as NS from './namespace';

export const { execute: chooseDeposit, completed: chooseDepositCompleted, failed: chooseDepositFail } =
  makeCommunicationActionCreators<NS.IChooseDeposit, NS.IChooseDepositCompleted, NS.IChooseDepositFail>(
    'CHOOSE_DEPOSIT', 'CHOOSE_DEPOSIT_COMPLETED', 'CHOOSE_DEPOSIT_FAIL',
  );
```
### Create redux state with `makeCommunicationReducer`
```typescript
import { makeCommunicationReducer } from '@fsd/redux-make-communication';
import initial from './initial';
import * as NS from './namespace';

export const depositReducer = {
  depositFetching: makeCommunicationReducer<NS.IChooseDeposit, NS.IChooseDepositCompleted, NS.IChooseDepositFail>(
    'CHOOSE_DEPOSIT',
    'CHOOSE_DEPOSIT_COMPLETED',
    'CHOOSE_DEPOSIT_FAIL',
    initial.depositFetching,
  ),
}
```