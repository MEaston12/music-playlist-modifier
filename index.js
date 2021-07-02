const fs = require('fs').promises;
const mm = require('music-metadata');

const musicFolder = 'C:/Users/Vita/Music';
const outputFileName = '5 Star Playlist2.txt';
const minStars = 5;
const result = [];

async function processFolder(path) {
    for(let file of (await fs.readdir(path,{withFileTypes: true}))) {
        let fullPath = `${path}/${file.name}`;
        if(file.isDirectory()) await processFolder(fullPath);
        else if(file.name.endsWith(".mp3")) {
            let {common: {rating, title, artist}} = await mm.parseFile(fullPath);
            if(rating && rating[0].rating >= (minStars-1)/4) result.push(`${title || file.name.slice(0,-4)} - ${artist}`);
        }
    }
}

processFolder(musicFolder).then(() => fs.writeFile(`${musicFolder}/${outputFileName}`, result.join("\n")));