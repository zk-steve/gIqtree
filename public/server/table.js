module.exports.CREATE_TABLE_PROJECT = `CREATE TABLE IF NOT EXISTS project (
    project_id text PRIMARY KEY,
    name TEXT,
    time TEXT,
    process INTEGER,
    path TEXT
)`;

module.exports.CREATE_TABLE_INPUT = `CREATE TABLE IF NOT EXISTS input (
    input_id TEXT,
    name TEXT,
    path TEXT,
    project_id TEXT,
    process INTEGER,
    PRIMARY KEY(input_id, project_id),
    FOREIGN KEY(project_id)
        REFERENCES project(project_id)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
)`;

module.exports.CREATE_TABLE_OUTPUT = `CREATE TABLE IF NOT EXISTS output (
    output_id TEXT,
    name TEXT,
    path TEXT,
    project_id TEXT,
    PRIMARY KEY(output_id, project_id),
    FOREIGN KEY(project_id)
      REFERENCES project(project_id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION
)`;