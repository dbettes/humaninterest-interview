const fs = require('fs');
const readline = require('readline');

async function processLineByLine(input) {
    const fileStream = fs.createReadStream(input);
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });



    let result = "";

    for await (const line of rl) {
        try {
            let insideString = false;
            let commentFound = false;

            for (var i = 0; i < line.length; i++) {
                let character = line.charAt(i);

                if (character == '"' && line.charAt(i-1) != '\\') {
                    insideString = !insideString;
                }

                if (!insideString && character == '/' &&  i + 1 < line.length && line.charAt(i + 1) == '/') {
                    commentFound = true;
                }

                if (!commentFound) {
                    result = result + character
                }
            }
            result = result + "\n";
        }
        catch (error) {
            console.error(error);
        }
    }

    console.log(`Output for ${input}:`);
    console.log(result);
}

processLineByLine('exampleInput/sample.json');
processLineByLine('exampleInput/sample2.json');
