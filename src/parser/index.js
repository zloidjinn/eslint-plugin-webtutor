const fs = require('node:fs').promises;

const libRootPath = './node_modules/@umbrik/webtutor-types/lib/';

async function prepareData(resultJson) {
    const dirs = await fs.readdir(libRootPath, { withFileTypes: true });

    for (const dir of dirs) {
        if (dir.isDirectory()) {
            const files = await fs.readdir(libRootPath + dir.name, {
                withFileTypes: true,
            });

            for (const file of files) {
                if (dir.name !== 'xml') {
                    const fileData = await fs.readFile(
                        libRootPath + '/' + dir.name + '/' + file.name
                    );

                    const fileDataString = fileData.toString();

                    const lines = fileDataString.split('\n');

                    for (const line of lines) {
                        if (line.includes('declare ')) {
                            if (line.includes('function')) {
                                const funcName = line.match(
                                    /function (.*?)(?:<.*?>)?\(/
                                );
                                resultJson[funcName[1]] = false;
                            }
                            if (line.includes('const')) {
                                const constData = line.split(' ');
                                const constDataCleared = constData[2].replace(
                                    ':',
                                    ''
                                );
                                resultJson[constDataCleared] = false;
                            }
                            if (line.includes('let')) {
                                const letData = line.split(' ');
                                const letDataCleared = letData[2].replace(
                                    ':',
                                    ''
                                );
                                resultJson[letDataCleared] = false;
                            }
                            if (line.includes('namespace')) {
                                const nameSpace = line.split(' ');
                                resultJson[nameSpace[2]] = false;
                            }
                        }
                    }
                }
            }
        }
    }

    return resultJson;
}

async function writeData() {
    const data = await prepareData({});
    fs.writeFile('./src/data_globals.json', JSON.stringify(data));
}

writeData();
