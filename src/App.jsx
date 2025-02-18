import React from 'react'
import '../src/index.css'
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import Body from './Body';
import Feed from './Feed';
import Footer from './Footer';


function App() {

  return (
    <>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/" element={<Feed/>}/>
        </Route>
      </Routes>
    </BrowserRouter>   
    <Footer/>    
    </>
  )
}

export default App;
