const path = require("path");
const db = require("./db");
const model = path.join(__dirname, "/table.js");
const homepage = require("./controller/homepage");

const {
  CREATE_TABLE_PROJECT,
  CREATE_TABLE_INPUT,
  CREATE_TABLE_OUTPUT,
} = require(model);

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS project`);
  db.run(`DROP TABLE IF EXISTS input`);
  db.run(`DROP TABLE IF EXISTS output`);
  db.run(CREATE_TABLE_PROJECT);
  db.run(CREATE_TABLE_INPUT);
  db.run(CREATE_TABLE_OUTPUT);
});

homepage.setProject("Nam123", "C:prrogramfile/nodejs/hihi");
homepage.setInput(
  "Input 2",
  "C:prrogramfile/nodejs/hihi",
  "93e2ed56-cad1-46bb-b0a8-378cd88ab450"
);
homepage.setOutput(
  "Output 2",
  "C:prrogramfile/nodejs/hihi",
  "93e2ed56-cad1-46bb-b0a8-378cd88ab450"
);

// homepage.getHistory().then((response) => {
//   console.log(response);
// });

// homepage.getProjects().then((response) => {
//   console.log(response);
// });

// homepage.getInput().then((response) => {
//   console.log(response);
// });

homepage.getOutput().then((response) => {
  console.log(response);
});

// homepage.search("Nam").then((response) => {
//   console.log(response);
// });

db.close();
