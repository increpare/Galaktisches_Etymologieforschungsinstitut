const fs = require('fs');

let content=String(fs.readFileSync("deutsch3.txt"));
let words = content.split("\n");
console.log(words.length + " words")

words.sort( (a,b) => a.length-b.length)

console.log("calculating divisions");

var anagram_index_offset=0;


let wi=0;
let cur=[words[0]]
let divided=[cur]
for (let i=1;i<words.length;i++){
	let w = words[i];
	if (cur[0].length===w.length){
		cur.push(w);
	} else {
		console.log("on stufe "+w.length);
		cur=[w];
		divided.push(cur)		
	}
}


let anagrams_divided=[];
//print top 20 from each group
for (let i=0;i<divided.length;i++){
	console.log("processing division "+i);

	let division=divided[i];
	let dict={} 
	for (let j=0;j<division.length;j++){
		let w = division[j];
		let k = w.split('').sort().join('');
		if (dict.hasOwnProperty(k)){
			dict[k].push(w);
		} else {
			dict[k]=[w];
			anagram_index_offset=k.length-anagrams_divided.length;
		}
	}
	anagrams_divided.push(dict);

	let vals = Object.values(dict);
	vals.sort( (a,b) => b.length-a.length)
	for (k=0;k<10 && k<vals.length && vals[k].length>1;k++){
		console.log(vals[k].join("\", \""))
	}
	console.log("\n\n");
}

function variants(w){
	let result = []
	for (let i=0;i<w.length;i++){
		let wn = w.slice(0, i) + w.slice(i+1);
		result.push(wn);
	}
	return result
}

wordScores={};
wordLinks={};
novelWord={};

//build from bottom up
for (let i=0;i<anagrams_divided.length;i++){

	console.log("building word scores"+i)

	let anagram_dict = anagrams_divided[i];

	let keys = Object.keys(anagram_dict);


	if (i===0){
		for (let k=0;k<keys.length;k++){
			let v = keys[k];
			wordScores[v]=0;

			let wsi = Object.keys(wordScores)[0];

			wordLinks[v]="";
			novelWord[v]=false;
		}
	} else {
		for (let k=0;k<keys.length;k++){
			let v = keys[k];
			let wordscore=0;
			let wordlink="";
			for (let j=0;j<v.length;j++){
				let v2 = v.slice(0, j) + v.slice(j+1);
				if (wordScores.hasOwnProperty(v2)){
					let candscore = wordScores[v2]+1;
					if (candscore>wordscore){
						wordscore=candscore;
						wordlink=v2;
					}
				}
			}

			wordScores[v]=wordscore;
			novelWord[v]=wordscore>0;

			wordLinks[v]=wordlink;
			if (wordlink.length>0){
				novelWord[wordlink]=false;
			}			
		}		
	}
}


function printChain(w){
	let s = "";

	do {
		let d = anagrams_divided[w.length-anagram_index_offset][w];	
		s+="->"+d;

		w = wordLinks[w];
	} while (w.length>0);

	return s.substr(2);
}

let chainwords = Object.keys(wordLinks);


var chainlist = [];
for (let i=0;i<chainwords.length;i++){
	let cw = chainwords[i];
	if (novelWord[cw]&&wordScores[cw]>0){
		chainlist.push([printChain(cw),wordScores[cw]]);
	} 
}

chainlist.sort( (wd1,wd2) => wd1[1]-wd2[1] )

for (let i=0;i<chainlist.length;i++){
	console.log(chainlist[i][1]+"\t"+chainlist[i][0])
}