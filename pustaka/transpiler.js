/**
 * Maps Javanese Krama keywords to JavaScript
 */
const KEYWORDS = {
    // Variable Declaration
    'damel': 'let',
    'tetep': 'const',
    'wonten': 'var',

    // Control Flow
    'menawi': 'if',
    'sanesipun': 'else',
    'kagem': 'for',
    'salami': 'while',
    'tindak': 'do',
    'pilihan': 'switch',
    'perkawis': 'case',
    'baku': 'default',
    'kendel': 'break',
    'lajeng': 'continue',
    'wangsul': 'return',

    // Error Handling
    'cobi': 'try',
    'cepeng': 'catch',
    'pungkasanipun': 'finally',
    'bucal': 'throw',

    // Functions & Classes
    'karya': 'function',
    'golongan': 'class',
    'ngewarisi': 'extends',
    'enggal': 'new',
    'punika': 'this',
    'inggil': 'super',

    // Async/Await
    'asinkron': 'async',
    'ngantos': 'await',

    // Modules
    'impor': 'import',
    'ekspor': 'export',
    'saking': 'from', // Used in import/export and for..of

    // Values & Types
    'leres': 'true',
    'lepat': 'false',
    'kosong': 'null',
    'dereng': 'undefined',
    'suwung': 'void',
    'jinis': 'typeof',
    'wujud': 'instanceof',
    'asil': 'yield',

    // Operators/Other
    'ing': 'in',
    'kaliyan': 'with',
    'panaliti': 'debugger',

    // Built-ins (Aliases)
    'serat': 'console.log',

    // Shorthand Aliases (Singkatan)
    'sanes': 'else',       // Alias for sanesipun
    'pungkasan': 'finally',// Alias for pungkasanipun
    'waris': 'extends',    // Alias for ngewarisi
    'bab': 'case',         // Alias for perkawis
    'kgm': 'for',          // Alias for kagem
    'mnw': 'if',           // Alias for menawi
};

function transpile(sourceCode) {
    // Sort keys by length to replace longer keywords first
    const sortedKeys = Object.keys(KEYWORDS).sort((a, b) => b.length - a.length);

    // Create a regex pattern for all keywords with word boundaries
    const keywordPattern = '\\b(' + sortedKeys.join('|') + ')\\b';

    // Regex for string literals (double quotes, single quotes, backticks)
    // We use [\s\S] for backticks to match across newlines
    const stringPattern = '(".*?"|\'.*?\'|`[\\s\\S]*?`)';

    // Combined regex: Match strings OR keywords
    const combinedRegex = new RegExp(`${stringPattern}|${keywordPattern}`, 'g');

    return sourceCode.replace(combinedRegex, (match, stringLiteral, keyword) => {
        // If it matched a string literal, return it unchanged
        if (stringLiteral) {
            return stringLiteral;
        }

        // If it matched a keyword, return the JavaScript equivalent
        if (keyword) {
            return KEYWORDS[keyword];
        }

        return match;
    });
}

module.exports = { transpile };
