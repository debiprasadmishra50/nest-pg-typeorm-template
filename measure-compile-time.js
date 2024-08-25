const { exec } = require("child_process");

const start = Date.now();

exec(
  "npx swc src -d dist --config-file infrastructure/.swcrc",
  // "npm run build",
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.log(`stderr: ${stderr}`); // Change this to `console.log` to handle non-error stderr output
      // return;
    }

    console.log(stdout);
    const end = Date.now();
    console.log(`Compilation time: ${(end - start) / 1000} seconds\n`);
  }
);
