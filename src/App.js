import MenuBar from "component/MenuBar/MenuBar";
import HomePage from "pages/HomePage/HomePage";
import ProjectPage from "pages/ProjectPage/ProjectPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
const { remote } = window.require("electron");
const fs = remote.require("fs");
// const ipcRenderer = window.require("electron").ipcRenderer;
// ipcRenderer.send("hihi");
// ipcRenderer.send("setProject", "NamND", "D:/IQTREE/public/iqtree")
// ipcRenderer.send("hihi");
function App() {
  // const { dialog } = remote;
  // const getFolder = async () => {
  //   const path = await dialog.showOpenDialog({ properties: ["openDirectory"] });
  //   console.log(fs.readdirSync(path.filePaths[0]));
  // };

  return (
    <Router>
      <div className="App">
        <MenuBar />
        <Switch>
          <Route path="/">
            <HomePage />
          </Route>
          <Route path="/project">
            <ProjectPage />
          </Route>
        </Switch>

        {/* <button onClick={getFolder}>Choose your folder.</button> */}
      </div>
    </Router>
  );
}

export default App;
