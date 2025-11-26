const fs = require('fs');
const path = require('path');
const { transpile } = require('../transpiler');

function run(command, arg) {
    if (command === 'init') {
        initProject(arg);
        return;
    }

    // Default behavior: execute file
    const filePath = command;
    if (!filePath) {
        console.error("Ampun kesupen nyukani nami file (Please provide a file name).");
        console.error("Conto: jawa conto.jwa (utawi: mlyu conto.jwa)");
        console.error("Utawi: jawa init <nami_proyek>");
        process.exit(1);
    }

    const absolutePath = path.resolve(filePath);

    if (!fs.existsSync(absolutePath)) {
        console.error(`File boten kepanggih (File not found): ${filePath}`);
        process.exit(1);
    }

    const content = fs.readFileSync(absolutePath, 'utf-8');
    try {
        const jsCode = transpile(content);
        // Execute the transpiled code
        eval(jsCode);
    } catch (error) {
        handleError(error);
    }
}

function initProject(projectName) {
    if (!projectName) {
        console.error("Ampun kesupen nyukani nami proyek (Please provide a project name).");
        console.error("Conto: jawa init proyek_anyar");
        return;
    }

    const projectPath = path.resolve(process.cwd(), projectName);
    if (fs.existsSync(projectPath)) {
        console.error(`Folder ${projectName} sampun wonten (already exists).`);
        return;
    }

    fs.mkdirSync(projectPath);

    // Create main file
    const mainContent = `serat("Sugeng Rawuh ing ${projectName}!");\n\n// Tulis kode Jawakrama panjenengan ing mriki\n`;
    fs.writeFileSync(path.join(projectPath, 'main.jwa'), mainContent);

    console.log(`✅ Proyek ${projectName} sampun dipun damel!`);
    console.log(`📂 Mlebet: cd ${projectName}`);
    console.log(`▶️ Jalanaken: jawa main.jwa (utawi: mlyu main.jwa)`);
}

function handleError(error) {
    const errorMap = {
        'ReferenceError': 'Kalepatan Referensi',
        'SyntaxError': 'Kalepatan Sintaksis',
        'TypeError': 'Kalepatan Tipe',
        'RangeError': 'Kalepatan Rentang',
        'Error': 'Kalepatan Umum'
    };

    const errorName = errorMap[error.name] || error.name;
    let errorMessage = error.message;

    // Translate common error messages
    errorMessage = errorMessage
        .replace(/is not defined/g, 'boten dipun tepang')
        .replace(/Unexpected token/g, 'Tanda boten dipun mangertosi')
        .replace(/Assignment to constant variable/g, 'Ngangge variabel tetep (const) malih')
        .replace(/Invalid or unexpected token/g, 'Tanda boten sah utawi boten dipun mangertosi')
        .replace(/missing/g, 'ical/kirang')
        .replace(/after argument list/g, 'sasampunipun daptar argumen');

    console.error(`\n🛑 ${errorName}: ${errorMessage}`);
    if (error.stack) {
        // Optional: Filter stack trace to show only relevant lines if needed
        // console.error(error.stack.split('\n')[1]); 
    }
}
// Check if running directly
if (require.main === module) {
    const args = process.argv.slice(2);
    run(args[0], args[1]);
}

module.exports = { run };
