import React from 'react'
import '../src/index.css'
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import Body from './Body';
import Feed from './Feed';
import Login from './Login';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Profile from './Profile';
import RequestsReceived from './RequestsReceived';
import UserCards from './UserCards';
import Logo from './Logo';
import Friends from './Friends';
import Sent from './Sent';


function App() {

  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route index element={<Logo/>}/>
          <Route path="/login" element={<Login isSignup={false}/>}/>
          <Route path="/signup" element={<Login isSignup={true}/>}/>
          <Route path="/logout" element={<Login/>}/>
          <Route path="/feed" element={<Feed/>}/>
          <Route path="/profile/view" element={<Profile/>}/>
          <Route path="/friends" element={<Friends/>}/>
          <Route path="/requests/sent" element={<Sent/>}/>
          <Route path="/requests/recieved" element={<RequestsReceived/>}/>
          <Route path="/userCards" element={<UserCards/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App;
