import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigation from "./navigation";
import store, {persistor} from "./redux/store";
import authService from "./services/auth.service";

function App() {
  return (
    <Provider store={store}>
      <PersistGate
        onBeforeLift={async () => await authService.reAuthenticate()}
        loading={<></>}
        persistor={persistor}>
        <RootNavigation/>
      </PersistGate>
    </Provider>
  );
}

export default App;
