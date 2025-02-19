import React from 'react'
import '../src/index.css'
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import Body from './Body';
import Feed from './Feed';
import Footer from './Footer';
import Login from './Login';

function App() {

  return (
    <>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/" element={<Feed/>}/>
          <Route path="/login" element={<Login isSignup={false}/>}/>
          <Route path="/signup" element={<Login isSignup={true}/>}/>
          <Route path="/logout" element={<Feed/>}/>
          <Route path="/feed" element={<Feed/>}/>
        </Route>
      </Routes>
    </BrowserRouter>   
    <Footer/>    
    </>
  )
}

export default App;
