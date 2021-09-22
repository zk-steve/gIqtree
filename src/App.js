import MenuBar from "component/MenuBar/MenuBar";
import HomePage from "pages/HomePage/HomePage";
import ProjectPage from "pages/ProjectPage/ProjectPage";
import { Route, Switch, HashRouter } from "react-router-dom";
import "./App.css";
const { ipcRenderer } = window.require("electron");
ipcRenderer.send("getProjectById", "7d89b7da-71dc-4fd2-ba4e-72ba014ce0b8")
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
