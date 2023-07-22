import * as fs from 'fs';

interface Country {
    name: string,
    population: number,
    area: number,
    density: number
}

try{
    const data = fs.readFileSync( "./countries.txt", "utf8" );
    const lines = data.split("\n");
    const countriesArr: Country[] = [];

    for (const line of lines) {
        const match = line.match(/^(\D+)\s([\d,]+)\s([\d,]+)/);
        if (match) {
            let pais: Country = {
                name: match[1],
                population: Number(match[2].replace(/,/g, '')),
                area: Number(match[3].replace(/,/g, '')),
                density: 0,
            }

            countriesArr.push(pais);
        }
    }

    countriesArr.forEach((pais) => {
        if(pais.population > 0 && pais.area > 0 ) {
            pais.density = (pais.population / pais.area);
        }
    })

    countriesArr.sort((a, b) => {
        if(a.density > b.density){
            return -1;
        }
        if(a.density < b.density){
            return 1;
        }
        return 0;
    })

    let csvContent = "Country,Population,Area,Density\n";
    countriesArr.forEach(pais => {
        csvContent += `${pais.name},${pais.population.toFixed(1)},${pais.area.toFixed(1)},${pais.density.toFixed(1)}\n`
    })

    fs.writeFileSync("./countries.csv", csvContent);
}
catch (err) {
    console.log(err);
}


