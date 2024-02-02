const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');

function processFilesInDirectory(directory, userData) {
    fs.readdirSync(directory).forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);

        const ext = path.extname(filePath);

        const excludedFolders = ['node_modules', 'dist', 'build', 'coverage', '.git'];
        const excludedFiles = ['package-lock.json', path.basename(__filename)];

        if (excludedFolders.some(folder => file.includes(folder))) return;
        if (excludedFiles.some(excludedFile => file.includes(excludedFile))) return;

        if (['.ts', '.js', '.mjs', '.cjs', '.tsx', '.jsx', '.json', '.md', '.yaml', '.yml'].includes(ext)) {
            if (stat.isDirectory()) {
                processFilesInDirectory(filePath, userData); // Recursively process subdirectories
            } else {
                console.log(`Processing ${filePath.replace(__dirname, '.')}...`);

                const placeholders = Object.keys(userData).map(v => `{${v}}`);

                let content = fs.readFileSync(filePath, 'utf-8');
                for (const placeholder of placeholders) {
                    if (!content.includes(placeholder)) continue;

                    const regex = new RegExp(placeholder, 'g');
                    content = content.replaceAll(regex, userData[placeholder.replace('{{', '').replace('}}', '')]);
                }
                fs.writeFileSync(filePath, content, 'utf-8');
            }
        }
    });
}


async function promptUserForData(prompts) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const result = new Promise(resolve => {
        const userData = {};
        const promptUser = async index => {
            if (index === Object.keys(prompts).length) {
                rl.close();
                resolve(userData);
                return;
            }
            await rl.question(Object.values(prompts)[index], async answer => {
                userData[Object.keys(prompts)[index]] = answer;
                await promptUser(index + 1);
            });
        };
        promptUser(0);
    });

    return result;
}

function main() {
    promptUserForData({
        'author.name': 'Enter your name: ',
        'user.email': 'Enter your email address: ',
        'user.github': 'Enter your GitHub username: ',
        'vendor.name': 'Enter your company/vendor name: ',
        'package.name': 'Enter the package name: ',
        'package.description': 'Enter the package description: ',
    }).then(userData => {
        processFilesInDirectory(__dirname, userData);
    });
}

main();
