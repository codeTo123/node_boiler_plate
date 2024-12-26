import { Sequelize, ModelDefined } from "sequelize";
import path from "path";
import fs from "fs";

type ModelType = ModelDefined<any, any>;
const modules = process.env.MODULES || "";
let db = new Sequelize(
  process.env.DB_NAME || "",
  process.env.DB_USER || "",
  process.env.DB_PWD || "",
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);
const modulesArray = modules.split(",");

if (Array.isArray(modulesArray)) {
  modulesArray.forEach(async (modelName) => {
    const tsPath = path.join(__dirname, `../modules/${modelName}/model.ts`);
    const jsPath = path.join(__dirname, `../modules/${modelName}/model.js`);
    if (fs.existsSync(tsPath) || fs.existsSync(jsPath)) {
      const model = require(path.join(
        __dirname,
        `../modules/${modelName}/model`
      ))(db, Sequelize);
      // Use type assertion here
      Object.assign(db, model as { [key: string]: ModelType });
    } else {
      console.log(`File does not exist for module: ${modelName}`);
    }
  });
} else {
  console.log("No modules provided.");
}

// db.sync();
Object.keys(db).forEach((modelName) => {
  if ("associate" in (db as any)[modelName]) {
    (db as any)[modelName].associate(db);
  }
});

(db as any).Sequelize = Sequelize;

export { db };
