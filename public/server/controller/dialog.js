const { dialog } = require("electron");

module.exports.chooseFile = (project_path) => {
  return new Promise((resolve, reject) => {
    try {
      let sourcePath = dialog.showOpenDialogSync({
        properties: ["openFile"],
        filters: [{
          name: "msa file",
          // extensions: ["msa", "phy"]
        }],
      });
      if (Array.isArray(sourcePath) && sourcePath.length === 1) {
        sourcePath = sourcePath[0]
      }
      else {
        reject({message: "You need choose 1 file", status: 0})
      }
      console.log({sourcePath})
      sourcePath ? resolve(sourcePath) : resolve("");
    } catch (err) {
      reject({ message: "Something was wrong", status: 0 });
    }
  });
};

module.exports.chooseMultiFile = (project_path) => {
  return new Promise((resolve, reject) => {
    try {
      let sourcePath = dialog.showOpenDialogSync({
        properties: ["openFile", "multiSelections"],
        filters: [{
          name: "msa file",
          // extensions: ["msa", "phy"]
        }],
      });
      if (!Array.isArray(sourcePath)) {
        reject({message: "You need choose files", status: 0})
      }
      console.log({sourcePath})
      sourcePath ? resolve(sourcePath) : resolve("");
        
    } catch (err) {
      reject({ message: "Something was wrong", status: 0 });
    }
  });
};

module.exports.chooseFolder = (project_path) => {
  return new Promise((resolve, reject) => {
    try {
      let folderPath = dialog.showOpenDialogSync({
        properties: ["openDirectory"]
      });
      if (Array.isArray(folderPath) && folderPath.length === 1) {
        folderPath = folderPath[0]
      }
      else {
        reject({message: "You need choose 1 folder", status: 0})
      }
      console.log({ folderPath });
      resolve(folderPath);
    } catch (err) {
      reject({ message: "Something was wrong", status: 0 });
    }
  });
}