import AlertDialogContext from "component/AlertDialog/AlertDialog";
import MenuBar from "component/MenuBar/MenuBar";
import HomePage from "pages/HomePage/HomePage";
import ProjectPage from "pages/ProjectPage/ProjectPage";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <HashRouter>
      <div className="App">
        <AlertDialogContext>
          <MenuBar />
          <Switch>
            <Route path="/project/:id">
              <ProjectPage />
            </Route>
            <Route path="/" exact>
              <HomePage />
            </Route>
          </Switch>
        </AlertDialogContext>
      </div>
    </HashRouter>
  );
}

export default App;
