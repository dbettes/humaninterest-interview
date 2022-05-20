
async function getTopTenCharacters() {
    import('node-fetch').then(fetch => {
        fetch.default('http://api.open-notify.org/astros.json').then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            response.json().then(json => {
                const topCount = 10;
                const result: any = json;

                let map = new Map<string, number>();
        
                result.people.forEach(person => {
                    let characters = person.name.replace(' ', '').replace('-', '').toLowerCase().split('');
        
                    characters.forEach(character => {
                        map.has(character) ? map.set(character, map.get(character)+1) : map.set(character, 1);
                    });
                });
        
                console.log(`Top ${topCount} characters used in astronauts' names:`)
        
                let topTen = Object.keys(map).sort((a,b) => map[b] - map[a]).splice(0, topCount);
        
                //let topTen = new Array(...map).sort((a, b) => b[1] - a[1]).splice(0, topCount);
                        
                topTen.forEach(element => {
                    console.log('%s %d', element[0], element[1]);
                }, reason => console.log(`Response json error: ${reason}`));
            }, reason => console.log(`Fetch error: ${reason}`));
        });
    });
}

getTopTenCharacters();