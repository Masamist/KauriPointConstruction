import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext'

// styles
import './App.css';

// pages and components
import ProjectList from './pages/projectList/ProjectList'
import Create from './pages/create/Create'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Project from './pages/project/Project'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

function App() {
  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <div className='container'>
            <Navbar />
            {user && <Sidebar />}
            <Switch>
              <Route exact path='/'>
                {!user && <Redirect to="/login" />}
                {user && <ProjectList />}
              </Route>
              <Route path='/create'>
                {!user && <Redirect to="/login" />}
                {user && <Create />}
              </Route>
              <Route path='/project/:id'>
                {!user && <Redirect to="/login" />}
                {user && <Project />}
              </Route>
              <Route path='/login'>
                {user && <Redirect to="/" />}
                {!user && <Login />}
              </Route>
              <Route path='/signup'>
                {user && <Redirect to="/" />}
                {!user && <Signup />}               
              </Route>       
            </Switch>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
