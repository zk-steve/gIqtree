import MenuBar from "component/MenuBar/MenuBar";
import HomePage from "pages/HomePage/HomePage";
import ProjectPage from "pages/ProjectPage/ProjectPage";
import { Route, Switch, HashRouter } from "react-router-dom";
import "./App.css";
const ipcRenderer = window.require("electron").ipcRenderer;
ipcRenderer.send("getInputByProject", "76f4dd45-15e8-48da-8bae-4f757c59d0ff")
function App() {
  return (
    <HashRouter>
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
    </HashRouter>
  );
}

export default App;
