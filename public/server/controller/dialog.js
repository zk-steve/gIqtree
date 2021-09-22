const fs = require("fs");
const path = require("path");
const { dialog } = require("electron");
const os = require("os");

const homepage = require("./homepage");
const { filterName, copyFile, copyFolder } = require("./project");

module.exports.chooseFile = (project_path) => {
  return new Promise((resolve, reject) => {
    try {
      let sourcePath = dialog.showOpenDialogSync({
        properties: ["openFile"],
        filters: [{ name: "msa file", extensions: ["msa", "phy"] }],
      });
      if (Array.isArray(sourcePath) && sourcePath.length === 1) {
        sourcePath = sourcePath[0]
      }
      else {
        reject({message: "You need choose 1 file", status: 0})
      }
      console.log({sourcePath})
      filterName(sourcePath)
        .then(data => {
          console.log({data})
          const destPath = path.join(project_path, "input", data)
          copyFile(sourcePath, destPath)
            .then(data => {
              console.log("Copied")
              sourcePath ? resolve(sourcePath) : resolve("");
            })
            .catch(err => {
              reject({ message: "Something was wrong", status: 0 })
            })
        })
        .catch(err => {
          console.log("error")
          reject({message: "You need choose 1 file", status: 0})
        })
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
        filters: [{ name: "msa file", extensions: ["msa", "phy"] }],
      });
      if (!Array.isArray(sourcePath)) {
        reject({message: "You need choose files", status: 0})
      }
      console.log({sourcePath})
      sourcePath.forEach(file => {
        filterName(file)
        .then(data => {
          console.log({ data })
          console.log("Beginn")
          const destPath = path.join(project_path, "input", data)
          console.log({file, destPath})
          copyFile(file, destPath)
          .then(data => {
            console.log("Copied")
          })
          .catch(err => {
            reject({ message: "Something was wrong", status: 0 })
          })
        })
        .catch(err => {
          console.log("error")
          reject({message: "You need choose 1 file", status: 0})
        })
      sourcePath ? resolve(sourcePath) : resolve("");
      })
        
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
      filterName(folderPath)
        .then(folderName => {
          const destPath = path.join(project_path, "input", folderName)
          const sourcePath = folderPath
          copyFolder(sourcePath, destPath)
          .then(data => {
            console.log("Copied")
            sourcePath ? resolve(sourcePath) : resolve("");
          })
          .catch(err => {
            reject({ message: "Something was wrong", status: 0 })
          })
        })
      .catch(err => {
        console.log("error")
        reject({message: "You need choose 1 file", status: 0})
      })
      console.log({ folderPath });
      resolve(folderPath);
    } catch (err) {
      reject({ message: "Something was wrong", status: 0 });
    }
  });
}