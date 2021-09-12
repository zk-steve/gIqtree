const { db } = require("../db");
const {
  CREATE_TABLE_PROJECT,
  CREATE_TABLE_INPUT,
  CREATE_TABLE_OUTPUT,
} = require("../table");

db.serialize(() => {
  // db.run(`DROP TABLE IF EXISTS project`);
  // db.run(`DROP TABLE IF EXISTS input`);
  // db.run(`DROP TABLE IF EXISTS output`);
  db.run(CREATE_TABLE_PROJECT);
  db.run(CREATE_TABLE_INPUT);
  db.run(CREATE_TABLE_OUTPUT);
});

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

module.exports.getProjectById = (id) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(
        `SELECT * FROM project WHERE project_id = "${id}"`,
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
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

module.exports.setProject = (name, path, project_id, projectType) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      let stmp = db.prepare(
        `INSERT INTO project 
        VALUES(?,?, DATETIME("now"), ?, ?, ?)`
      );
      stmp.run(project_id, name, 0, path, projectType);

      stmp.finalize();
      resolve({ name, path, project_id, projectType });
    });
  });
};

module.exports.getInputByPath = async (storePath) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(`SELECT * FROM input WHERE path = "${storePath}"`, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  });
};

module.exports.getProjectByPath = (path) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(
        `SELECT * FROM project WHERE path = "${path}"`,
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  });
};

module.exports.getInputById = async (input_id) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(
        `SELECT * FROM input WHERE input_id = "${input_id}"`,
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  });
};

module.exports.setInput = async (input_id, name, path, project_id) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      let stmp = db.prepare(`INSERT INTO input VALUES(?, ?, ?, ?, ?)`);
      stmp.run(input_id, name, path, project_id, 0);
      stmp.finalize();
    });
  });
};

module.exports.deleteInput = async (input_id, project_id) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(
        `DELETE FROM input WHERE input_id = "${input_id}"`,
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
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

module.exports.getOldest = async () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all("SELECT * FROM project ORDER BY project.time", (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
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
