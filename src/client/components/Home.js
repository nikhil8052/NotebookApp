import React, { Fragment } from "react";
import Navbarhome from './Navbarhome'
import ContentContainer from './ContentContainer'
import UserLogin from './UserLogin'
import AddNotes from './/AddNotes'
import {BrowserRouter as Router,Link,Route,Routes} from 'react-router-dom';
function Home(){
    return(
        <>
           
         <Router>
             <Routes>
                 <Route path="/"   element={<UserLogin/>} > </Route>
                 <Route path="/home" exact  element={<><Navbarhome/><ContentContainer/> </>} > </Route>
                 <Route path="/addnotes"   element={<><Navbarhome/><AddNotes/> </>} > </Route>
             </Routes>
         </Router>
        </>
    )
}
export default Home;





