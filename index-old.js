const fs = require('fs').promises;
const mm = require('music-metadata');

const musicFolder = 'C:/Users/Vita/Music/';
const outputFileName = '5 Star Playlist';
const minNumberOfStars = 5;

async function main(){
    let stack = [];
    let outputString = "";
    stack = await fs.readdir(musicFolder);

    stack = stack.map((currentArraySlot) => musicFolder + currentArraySlot);

    let targetPath;
    while(stack.length > 0){
        let targetItem = stack.pop();
        if((await fs.stat(targetItem)).isDirectory() == true){
            let folderContents = await fs.readdir(targetItem);
            //folderContents = folderContents.map((currentArraySlot) => targetItem + "/"  + currentArraySlot);
            stack = stack.concat(folderContents);
            //stack.push(await fs.readdir())
        }
        else if(targetItem.slice(-4) == ".mp3"){
            let metadata = await mm.parseFile(targetItem);
            if(metadata.common.rating != undefined  && metadata.common.rating[0].rating >= (minNumberOfStars - 1)/4){
                outputString += metadata.common.title + " - " + metadata.common.artist + `\n`;
            }
        }
    }
    await fs.writeFile(musicFolder + outputFileName, outputString);
}

main();