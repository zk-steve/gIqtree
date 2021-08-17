import MenuBar from "component/MenuBar/MenuBar";
import HomePage from "pages/HomePage/HomePage";
import ProjectPage from "pages/ProjectPage/ProjectPage";
import { Route, Switch, HashRouter } from "react-router-dom";
import "./App.css";
const ipcRenderer = window.require("electron").ipcRenderer;
ipcRenderer.send("executeProject", "D:/demo/example.phy")
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
            {/* <ProjectPage /> */}
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
