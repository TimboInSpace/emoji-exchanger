const fs = require('fs/promises');

const jsonPath = 'emojis.json';

if (process.argv.length < 4) {
	console.log('Usage: node exchanger.js INPUT OUTPUT\n\n - FILE: path to the file containing shortcodes to exchange\n');
	process.exit()
}

const inputFile  = process.argv[2];
const outputFile = process.argv[3]; 

function reindexArr(arr, indexfield, valuefield) {
	console.log(`Keys available: ${Object.keys(arr[0]).join(', ')}. (Mapping ${indexfield} --> ${valuefield})`);
	indexed = {};
	arr.forEach (e => {
		indexed[e[indexfield]] = e[valuefield];
	});
	return indexed;
}

function escapeRegExp(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

async function swapEmoji(map) {
	try {
		const inText = await fs.readFile(inputFile, {encoding:'utf8'});
		let outText = inText;
		Object.keys(map).forEach( shortname => {
			try {
				//console.log('Swapping: '+shortname);
				const validityCheck = /:.+:/;
				if (validityCheck.test(shortname)) {
					const regex = new RegExp(escapeRegExp(shortname), 'gi');
					if (regex.test(outText)) {
						console.log(`Exchanging ${shortname} --> ${map[shortname]}`);
					}
					outText = outText.replace(regex, map[shortname]);
				}
				
			} catch (err1) {
				console.log(err1);
			}
		});
		await fs.writeFile(outputFile, outText);
	} catch (err2) {
		console.log(err2);
	}
}

async function main() {
    try {
        const data = await fs.readFile(jsonPath, {encoding:'utf8'});
        jsonData = JSON.parse(data);
        // console.log(JSON.stringify(jsonData, null, '  '))
        emojiArr = jsonData['emojis'];
        
        const byShortcode = reindexArr(emojiArr, 'shortname', 'emoji')
        
        //console.log(byShortcode[':handshake:']);
        
        await swapEmoji(byShortcode);
        
    } catch (err) {
        console.log(err);
    }
}

main();


