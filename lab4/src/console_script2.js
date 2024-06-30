import fs from 'fs';
import { exec } from 'child_process';
import readline from 'readline';
import { argv } from 'process';

const fileName = 'counter.txt';

function readCounterSync() {
    try {
        return parseInt(fs.readFileSync(fileName, 'utf8'));
    } catch (error) {
        return 0;
    }
}

function writeCounterSync(counter) {
    fs.writeFileSync(fileName, counter.toString());
}

function readCounterAsync(callback) {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            callback(0);
        } else {
            callback(parseInt(data));
        }
    });
}

function writeCounterAsync(counter, callback) {
    fs.writeFile(fileName, counter.toString(), callback);
}

function executeCommand(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(stdout);
    });
}

function main() {
    if (argv.length === 3 && (argv[2] === '--async' || argv[2] === '--sync')) {
        const option = argv[2];
        if (option === '--async') {
            readCounterAsync(counter => {
                console.log(`Liczba uruchomień: ${counter + 1}`);
                writeCounterAsync(counter + 1, err => {
                    if (err) throw err;
                });
            });
        } else if (option === '--sync') {
            const counter = readCounterSync();
            console.log(`Liczba uruchomień: ${counter + 1}`);
            writeCounterSync(counter + 1);
        }
    } else {
        console.log('Wprowadź komendy — naciśnięcie Ctrl+D kończy wprowadzanie danych');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.on('line', (line) => {
            executeCommand(line.trim());
        });

        rl.on('close', () => {
            console.log('Program zakończony.');
            process.exit(0);
        });
    }
}

main();
