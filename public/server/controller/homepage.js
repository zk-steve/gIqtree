const db = require("../db");
const { v4: uuidv4 } = require("uuid");

module.exports.getProjects = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all("SELECT * FROM project", (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  });
};

module.exports.getInput = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all("SELECT * FROM input", (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  });
};

module.exports.getOutput = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all("SELECT * FROM output", (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  });
};

module.exports.setProject = (name, path) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      let stmp = db.prepare(
        `INSERT INTO project 
        VALUES(?,?, DATETIME("now"), ?, ?)`
      );
      stmp.run(uuidv4(), name, 0, path);
  
      stmp.finalize();
    });
  });
};

module.exports.setInput = async (name, path, project_id) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      let stmp = db.prepare(`INSERT INTO input VALUES(?, ?, ?, ?, ?)`);
      stmp.run(uuidv4(), name, path, project_id, 0);
      stmp.finalize();
    });
  });
};

module.exports.setOutput = async (name, path, project_id) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      let smtp = db.prepare(`INSERT INTO output VALUES(?, ?, ?, ?)`);
      smtp.run(uuidv4(), name, path, project_id);
      smtp.finalize();
    });
  });
};

module.exports.getHistory = async () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(
        "SELECT * FROM project ORDER BY project.time DESC",
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  });
};

module.exports.search = async (name) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(
        `SELECT * FROM project WHERE project.name LIKE "%${name}%" ORDER BY project.time DESC`,
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  });
};
