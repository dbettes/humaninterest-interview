import fetch from 'node-fetch';

async function getJson() {
    try {
        const response = await fetch('http://api.open-notify.org/astros.json');

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const json = await response.json();
        const topCount = 10;

        var map = new Map();

        json.people.forEach(person => {
            let characters = person.name.replace(' ', '').replace('-', '').toLowerCase().split('');

            characters.forEach(character => {
                map.has(character) ? map.set(character, map.get(character)+1) : map.set(character, 1);
            });
        });

        console.log(`Top ${topCount} characters used in astronauts' names:`)

        let topTen = new Array(...map).sort((a, b) => b[1] - a[1]).splice(0, topCount);
                
        topTen.forEach(element => {
            console.log('%s %d', element[0], element[1]);
        });
    } catch (err) {
        console.error(err);
    }
}

const json = await getJson();
