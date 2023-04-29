#!/usr/bin/node
const yargs = require('yargs');
const axios = require('axios');
const https = require('https');
const fs = require('fs');
const catAPI = require('../API/cat');

const options = yargs
    .usage(`Usage: $0 -l <limit> -b <breed>`)
    .option("l", {
        alias:"limit",
        describe: "Amount of cat pictures. Must be between 1 and 100.", 
        type: "string", 
        demandOption: false })
    .option("b", {
        alias: "breed",
        describe: "Specific breed to download", 
        type: "string", 
        demandOption: false })
    .help(true)
    .argv;

const argv = require('yargs/yargs')(process.argv.slice(2)).argv;

let limit;
let breed;
let count = countFiles('./images').length + 1;

if (argv.l != null || argv.limit != null) {
    limit = argv.l || argv.limit;
    if (isNaN(limit) || limit < 1 || limit > 100) { return yargs.showHelp() }
}
if (argv.b != null || argv.breed != null) {
    breed = argv.b || argv.breed;
    if (!checkBreed(breed)) return console.log("ERROR: Invalid breed ID.");
}

downloadImages();

async function downloadImages() {
    try {
        let url = catAPI.getImages(limit, breed);
        let response;
        let imageURLs = [];
        
        let res = await axios.get(url);
        response = res.data;

        for (let i = 0; i < response.length; i++) {
            if (!imageURLs.includes(response[i].url)) { imageURLs.push(response[i].url) };
        }

        for (let i = 0; i < imageURLs.length; i++) {
            let extension = imageURLs[i].slice(-3) || 'jpg';
            let fileName = `cat-${count}.${extension}`;
            let file = fs.createWriteStream('./images/' + fileName);
            let url = imageURLs[i];

            https.get(url, response => {
                response.pipe(file);

                file.on('finish', () => {
                    file.close();
                    process.stdout.clearLine(0);
                    process.stdout.cursorTo(0);
                    process.stdout.write(`Downloading ${url} as ${fileName}`);
                });
            }).on('error', err => {
                fs.unlink(fileName);
                console.error(`ERROR: Failed to download ${url}`);
            });

            count++;
        }
        console.log(`Downloading ${imageURLs.length} images.`);
    } catch (error) {
        console.log(error);
    }
}

function checkBreed(id) {
    let breeds = JSON.parse(fs.readFileSync('./resources/breeds.json'));
    let validBreed = false;
    
    for(let i = 0; i < breeds.length; i++) {
        if (breeds[i]["id"] === id) return validBreed = true;
    }

    return validBreed;
}

function countFiles(dirPath, filesArray) {
    let files = fs.readdirSync(dirPath);
    filesArray = filesArray || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + '/' + file).isDirectory()) {
            filesArray = countFiles(dirPath + '/' + file, filesArray)
        } else {
            filesArray.push(file);
        }
    });

    return filesArray;
}