import logo from './logo.svg';
import './App.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import {  withAuthenticator} from '@aws-amplify/ui-react';
import Navigation from './Navigation'

import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home'
import Nft from './components/nft'


Amplify.configure(awsconfig)

function App() {
  return (
    <div className="App">
     
      
      <Navigation/>
      <Routes>
        
          <Route exact path='/home' element={< Home />}></Route>
          <Route exact path='/nft' element={< Nft />}></Route>

      </Routes>
    
     {/* <AmplifySignOut/> */}
  
      
        
       
        
     
      
    </div>
  );
}

export default withAuthenticator(App);
