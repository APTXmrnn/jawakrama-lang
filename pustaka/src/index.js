const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { transpile, generateSourceMap } = require('../transpiler');
const { Wicalan, Serat, Wekdal } = require('./stdlib');

// Install source map support
require('source-map-support').install();

function run(command, arg) {
    if (command === 'init') {
        initProject(arg);
        return;
    }

    // If no command provided, start REPL
    if (!command) {
        startRepl();
        return;
    }

    // Default behavior: execute file
    const filePath = command;
    const absolutePath = path.resolve(filePath);

    if (!fs.existsSync(absolutePath)) {
        console.error(`File boten kepanggih (File not found): ${filePath}`);
        process.exit(1);
    }

    const content = fs.readFileSync(absolutePath, 'utf-8');
    try {
        const jsCode = transpile(content);

        // Generate Source Map
        const sourceMap = generateSourceMap(content, absolutePath);
        const mapPath = absolutePath + '.map';
        fs.writeFileSync(mapPath, sourceMap);

        const mapFileName = path.basename(mapPath);
        // Add sourceURL so source-map-support can find the file and map
        const codeWithMap = `${jsCode}\n//# sourceMappingURL=${mapFileName}\n//# sourceURL=${absolutePath}`;

        // Execute the transpiled code with stdlib
        const context = {
            console,
            require,
            process,
            Wicalan,
            Serat,
            Wekdal
        };

        // Create a function with the context variables
        const runInContext = new Function(...Object.keys(context), codeWithMap);
        runInContext(...Object.values(context));
    } catch (error) {
        handleError(error);
    }
}

function startRepl() {
    console.log("Sugeng Rawuh ing Jawakrama REPL (v1.0.0)");
    console.log("Ketik 'kendel' utawi Ctrl+C kangge medal.\n");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'jawa> '
    });

    rl.prompt();

    rl.on('line', (line) => {
        const input = line.trim();
        if (input === 'kendel' || input === 'exit') {
            rl.close();
            return;
        }

        if (input) {
            try {
                const jsCode = transpile(input);
                // Simple eval for REPL with stdlib
                // Note: In a real REPL we might want to maintain context between lines
                // For now, we just expose the stdlib

                // We use a wrapper to allow return values to be printed
                const wrappedCode = `
                    (function() {
                        try {
                            return eval(\`${jsCode.replace(/`/g, '\\`')}\`);
                        } catch(e) {
                            throw e;
                        }
                    })()
                `;

                // Expose stdlib to global scope for REPL (simplified approach)
                global.Wicalan = Wicalan;
                global.Serat = Serat;
                global.Wekdal = Wekdal;

                const result = eval(jsCode);
                if (result !== undefined) {
                    console.log(result);
                }
            } catch (error) {
                handleError(error);
            }
        }
        rl.prompt();
    }).on('close', () => {
        console.log('\nMatur nuwun!');
        process.exit(0);
    });
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
        .replace(/after argument list/g, 'sasampunipun daptar argumen')
        .replace(/is not a function/g, 'sanes fungsi')
        .replace(/Cannot read property/g, 'Boten saged maos properti')
        .replace(/of undefined/g, 'saking ingkang dereng dipun definisikaken')
        .replace(/of null/g, 'saking kosong (null)');

    console.error(`\n🛑 ${errorName}: ${errorMessage}`);
    if (error.stack) {
        // Optional: Filter stack trace to show only relevant lines if needed
        console.error(error.stack.split('\n')[1]);
    }
}
// Check if running directly
if (require.main === module) {
    const args = process.argv.slice(2);
    run(args[0], args[1]);
}

module.exports = { run };
