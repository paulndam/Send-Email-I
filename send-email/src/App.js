
import React from 'react'
import Header from './components/Header'
import ContactForm from './components/ContactForm'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
function App() {
  return (
    <div className="conatiner">
      <div className='col-md-6 offset-md-3' >
        <Header/>
        <ContactForm/>
      </div>
      
    </div>
  );
}

export default App;
