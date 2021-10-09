import AlertDialogContext from "component/AlertDialog/AlertDialog";
import MenuBar from "component/MenuBar/MenuBar";
import HomePage from "pages/HomePage/HomePage";
import ProjectPage from "pages/ProjectPage/ProjectPage";
import { Route, Switch, HashRouter } from "react-router-dom";
import "./App.css";
const { ipcRenderer } = window.require("electron");
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
