// Acá basicamente intento importar dinámicamente todas las rutas
// para (a futuro) no usar un app.use por cada route en el app.js
import { readdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Router } from "express";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFileName = (fileName) => fileName.split(".").shift();

// Obtengo todos los archivos de rutas menos el index.
const routeFiles = readdirSync(__dirname).filter(
  (fileName) => getFileName(fileName) !== "index"
);

// Por cada archivo, importo dinamicamente su router y uso la ruta.
routeFiles.forEach(async (fileName) => {
  const prefixRoute = getFileName(fileName);
  const { default: fileRouter } = await import(`./${prefixRoute}.router.js`);
  router.use(`/${prefixRoute}`, fileRouter);
});

export default router;
