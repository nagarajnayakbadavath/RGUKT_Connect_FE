import React from 'react'
import '../src/index.css'
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import Body from './Body';
import Feed from './Feed';
import Login from './Login';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Profile from './Profile';

function App() {

  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/" element={<Feed/>}/>
          <Route path="/login" element={<Login isSignup={false}/>}/>
          <Route path="/signup" element={<Login isSignup={true}/>}/>
          <Route path="/logout" element={<Feed/>}/>
          <Route path="/feed" element={<Feed/>}/>
          <Route path="/profile/view" element={<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App;
