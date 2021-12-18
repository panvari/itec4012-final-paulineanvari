import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Navbar } from './components/navbar';
import { HomePage } from './components/pages/home-page';
import { ProfilePage } from './components/pages/profile-page';
import { LoginPage } from './components/pages/login-page';

function App() {
  return (
    <Router>
      {/*include nav bar component on all pages*/}
    <Switch>
      {/*set route for homepage and use homepage component*/}
      <Route exact path="/">
        <HomePage />
      </Route>
      {/*set route for details page, using the plant's id, and use plant details component*/}
      <Route path="/me"> 
        <ProfilePage/>
      </Route>
      <Route path="/login"> 
        <LoginPage/>
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
