import MenuBar from "component/MenuBar/MenuBar";
import HomePage from "pages/HomePage/HomePage";
import ProjectPage from "pages/ProjectPage/ProjectPage";
import { Router } from "react-router";
import { Route, Switch } from "react-router-dom";
import history from "shared/constant/history";
import "./App.css";
function App() {
  return (
    <Router history={history}>
      <div className="App">
        <MenuBar />
        <Switch>
          <Route path="/project/:id">
            <ProjectPage />
          </Route>
          <Route path="/" exact>
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
