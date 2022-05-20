import { createReadStream } from 'fs'; 'fs';
import { createInterface } from 'readline'
//const fs = require('fs');
//const readline = require('readline');

async function removeComments(input: string) {
    const fileStream = createReadStream(input);
    const rl = createInterface({ input: fileStream, crlfDelay: Infinity });

    let result = "";
    let multilineFound = false;

    for await (const line of rl) {
        try {
            let insideString = false;
            let commentFound = false;
            let newLine = "";
            
            for (var i = 0; i < line.length; i++) {
                let character = line.charAt(i);

                // check for double quotes or escaped double quotes
                if (character == '"' && line.charAt(i-1) != '\\') {
                    insideString = !insideString;
                }

                // check for comment
                if (!insideString && character == '/' &&  i + 1 < line.length && line.charAt(i + 1) == '/') {
                    commentFound = true;
                }

                // check for multi-line start
                if (!insideString && character == '/' && i + 1 < line.length && line.charAt(i + 1) == '*') {
                    multilineFound = true;
                }

                // check for multi-line end
                if (multilineFound && character == '*' && i + 1 < line.length && line.charAt(i + 1) == '/') {
                    multilineFound = false;
                    break;
                }

                // output anything that's not a comment
                if (!commentFound && !multilineFound) {
                    newLine = newLine + character;
                }
            }

            // skip blank lines
            if (newLine != "") {
                result = result + newLine + "\n";
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    console.log(`Output for ${input}:`);
    console.log(result);
}

removeComments('exampleInput/sample.json');
removeComments('exampleInput/sample2.json');
removeComments('exampleInput/sample3.json');
