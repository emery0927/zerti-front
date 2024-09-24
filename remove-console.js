const fs = require('fs');
const path = require('path');

// Función para eliminar console.log de un archivo
function removeConsoleLogsFromFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error leyendo el archivo ${filePath}:`, err);
      return;
    }

    // Expresión regular para encontrar console.log
    const result = data.replace(/console\.log\(.*?\);?\n?/g, '');

    // Escribir el archivo sin los console.log
    fs.writeFile(filePath, result, 'utf8', (err) => {
      if (err) {
        console.error(`Error escribiendo el archivo ${filePath}:`, err);
      } else {
        console.log(`console.log eliminados en: ${filePath}`);
      }
    });
  });
}

// Función para recorrer los archivos en un directorio
function removeConsoleLogsFromDir(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(`Error leyendo el directorio ${dir}:`, err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      fs.stat(filePath, (err, stat) => {
        if (err) {
          console.error(`Error obteniendo stats del archivo ${filePath}:`, err);
          return;
        }

        if (stat.isDirectory()) {
          // Recursivamente eliminar los console.log en subdirectorios
          removeConsoleLogsFromDir(filePath);
        } else if (filePath.endsWith('.js') || filePath.endsWith('.ts')) {
          // Si es un archivo .js o .ts, eliminar console.log
          removeConsoleLogsFromFile(filePath);
        }
      });
    });
  });
}

// Directorio raíz del proyecto
const projectDir = path.join(__dirname, 'src');

// Iniciar el proceso
removeConsoleLogsFromDir(projectDir);
