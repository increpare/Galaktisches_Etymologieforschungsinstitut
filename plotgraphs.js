const fs = require('fs');
const { exec } = require('child_process');

let wordsList = [
	["post", "pots", "spot", "stop", "tops","opts"],
	["east","eats","sate","seat","teas"],
	["alerting", "altering", "integral", "relating", "triangle"],
	["skate","stake","steak","takes","teaks"],
	["reins","resin","rinse","risen","siren"],
	["pares","parse","pears","reaps","spare","spear"],
	["tesla", "teals", "tales", "steal", "stale", "least", "slate"],
	["iridescent", "indiscrete", "indiscreet"],
	["parsley","parleys","players","replays","sparely"],
	["dearths","hardest","hatreds","threads","trashed"],
	["strainer", "trainers", "retrains", "restrain", "terrains"],
	["teardrop", "prorated", "predator", "parroted"],
	["tsar", "tars", "star", "arts", "rats"],
	["lair", "lira", "rail", "liar"],
	["petals", "plates", "pleats", "staple", "palest", "pastel"],
	["carets","caters","caster","crates","reacts","recast","traces"],
	["altering", "tanglier", "triangle", "integral", "alerting", "relating"],
	["nips", "pins", "spin", "snip"],
	["laps", "alps", "pals", "slap"],
	["trees", "terse", "steer", "ester", "reset"],
	["now", "own", "won"],
	["lap", "pal", "alp"],
	["trap", "part", "tarp", "prat", "rapt"],

	["eilst","leist","liest","liste","seilt","sielt","steil","stiel","stile","teils"],
	["genre","neger","regen","gerne","enger"],
	["balgen","belang","gabeln"],
	["feiern", "ferien", "freien", "riefen", "reifen","eifern"],
	["roten", "orten", "toren", "tenor"],
	["heer", "eher", "ehre","rehe"],
	["rote", "tore", "orte"],
	["ort", "rot", "tor"],
	["derlei", "leider", "lieder"],
	["schlafen", "falschen", "flaschen"],
	["seien", "seine", "eines", "eisen"],
	["streichen","enterichs","scheitern","schreiten","sicherten","reichsten"],
	["galerien","rangelei","generali","genialer","anlieger","algerien"],
	["seibert", "siebert", "siebter", "breites", "biester", "bereits", "bereist"],
	["sirene", "serien", "reines", "seiner", "reisen", "einser", "riesen", "eisern"],


	["scheinen", "schienen", "chinesen", "schneien"],
	["genetischer", "gesicherten", "gestenreich", "gestrichene", "energetisch"],

	["tischchen", "schichten", "technisch", "tschechin"],

	["scheint", "schneit", "sichten", "stichen", "nitsche", "tischen"],
	["breite", "bereit", "beriet", "bertie", "triebe", "treibe", "bieter"],
	["sterne", "tresen", "resten", "nester", "ersten", "ernste", "ernest"],
	["nagel", "galen", "angel", "lange", "lagen", "algen"],
	["reaktion", "kantorei", "kroatien", "kreation"],
	["niere", "eiern", "einer", "reine"],
	["vorsprechen", "vorpreschen", "versprochen"],
	["verbreite", "verbriete", "verreibet", "verriebet", "vertreibe", "vertriebe", "brevetier"],
	["agileren", "anlieger", "einlager", "einlagre", "galerien", "genialer", "inegaler", "rangelei", "regalien"],
	["triebes", "siebter", "seibert", "riebest", "reibest", "breites", "bieters", "biester", "bereits", "bereist", "beierst"],
];

//https://de.wiktionary.org/wiki/Verzeichnis:Deutsch/Anagramme

function allPerms(string) {
    if (string.length < 2) return string; // This is our break condition

    let permutations = []; // This array will hold our permutations

    for (let i=0; i<string.length; i++) {
        let char = string[i];

        // Cause we don't want any duplicates:
        if (string.indexOf(char) != i) // if char was used already
            continue;           // skip it this time

        let remainingString = string.slice(0,i) + string.slice(i+1,string.length); //Note: you can concat Strings via '+' in JS

        for (let subPermutation of allPerms(remainingString))
            permutations.push(char + subPermutation)

    }
    return permutations;
}

function genGraph(words){
	result = {};
	for (let i=0;i<words.length;i++){
		let w = words[i];
		let targets = [];
		for (let j=0;j<w.length-1;j++){
			let wn = w.substr(0,j)+w[j+1]+w[j]+w.substr(j+2);
			targets.push(wn);
		}
		result[w]=targets;
	}
	return result;
}

let gdist_cache={};
function gdist(w1,w2,g){
	if (w1==w2){
		return 0;
	}

	let key = w1+w2;
	if (gdist_cache.hasOwnProperty(key)){
		return gdist_cache[key];
	}

	let visited = {};
	let tovisit = g[w1];
	let dist=0;
	let nexttovisit = [];

	while(true){
		dist++;
		for (let i=0;i<tovisit.length;i++){			
			let w = tovisit[i];
			if (w==w2){
				gdist_cache[key]=dist;
				return dist;
			}
			if (visited[w]===true){

			} else {
				visited[w]=true;
				nexttovisit = nexttovisit.concat(g[w]);
			}
		}

		tovisit=nexttovisit;
		nexttovisit=[];
	}
}

function makeUnique(arr) {
	for (let i=arr.length-1;i>=0;i--){
		let w = arr[i];
		if (arr.indexOf(w)<i){
			arr.splice(i,1);
		}
	}
}



function allWordsReachableWithJumps(startw,r,words,g){

	let tovisit=[startw]
	let visited=[]
	while(tovisit.length>0){
		let w = tovisit.pop();
		if (visited.indexOf(w)>=0){
			continue;
		}
		visited.push(w);
		let targets = getWordsRadiusRFrom(w,r,words,g);
		for (let i=0;i<targets.length;i++){
			let t=targets[i];
			if (visited.indexOf(t)>=0){
				continue;
			}
			let d = gdist(w,t,g);
			if (d<=r){
				tovisit.push(t);
			}
		}
	}
	return visited;
}

function printRadiusPointedDists(w,words,g){
	let key = w;

	let word_dists = [];
	for (let i=0;i<words.length;i++){
		let w2 = words[i];
		let d = gdist(w,w2,g);
		word_dists.push([d,w2]);
	}

	function comparePairs(a, b) {
		if (a[0]!==b[0]){
	  		return a[0] - b[0];
	  	}

		if (a[1].value > b[1].value) {
			return 1;
		}
		if (a[1].value < b[1].value) {
			return -1;
					}
		return 0;
	}
		word_dists.sort(comparePairs);

	let dists = word_dists.map( ([d,w]) => d );
	makeUnique(dists);
	dists.sort();

	function foldFn(acc,cur){

		if (acc.length==0){
			return [cur];
			}
		let last = acc[acc.length-1];
		if (last[0]==cur[0]){
			last.push(cur[1]);
		} else {
			acc.push(cur);
				}
		return acc;
	}

	let distLists = word_dists.reduce ( foldFn, [] )

	return distLists;
}

function getWordsRadiusRFrom(startword,r,words,g){

	let distLists = printRadiusPointedDists(startword,words,g);
	let l = distLists
				.filter( (e) => (e[0]<=r) )
				.map( (a) => a.slice(1) );
	let result = [].concat.apply([], l)
	return result;
}

function printPointedDists(startword,words,g){
	let lastgraph=[];
	for (let i=0;;i++){
		let curradius_words=allWordsReachableWithJumps(startword,i,words,g);
		let newwords = curradius_words.filter( (w) => lastgraph.indexOf(w)===-1 );

		
		if (newwords.length>0){
			console.log(""+newwords);
		}

		if (curradius_words.length===words.length){
			break;
		}
		if (newwords.length===0){
			console.log(".");
		}

		lastgraph=curradius_words;
	}
}

function printDistList(distLists){
	// console.log("\n\n\n"+JSON.stringify(distLists)+"\n")
	let s="";
	let lastDist=0;
	for (let i=0;i<distLists.length;i++){
		let line=distLists[i];
		
		for(let j=0;j<line[0]-lastDist;j++){
			s+=".\n";
		}
		for(let j=1;j<line.length;j++){
			if (j>1){
				s+=", "
			}
			s+=line[j];
		}
		s+="\n";
		lastDist=line[0];
	}
	console.log(s);
}





function printGraph(_words,graph,sprache){
	console.log("PG");
	let fn = _words[0];

	let s = ""
	s += `graph {\n`
	// s += `\t graph [ rankdir=LR ]\n`

	for (let i=0;i<_words.length;i++){
		let w1=_words[i];
		for (let j=i+1;j<_words.length;j++){
			let w2=_words[j];
			console.log(w1+"\t"+w2)
		
			let d = gdist(w1,w2,graph);
			console.log("d = "+d)
			s += `\t${w1} -- ${w2} [ label="${d}" ];\n`
		}
	}
	s += "}"
	console.log("EXEC")
	fs.writeFileSync(`output/dot/${sprache}_${fn}.dot`, s);
	exec(`dot -Tpng output/dot/${sprache}_${fn}.dot > output/png/${sprache}_${fn}.png`);
	console.log("BEXEC")
}


function printPoints(_words,graph){
	for (let i=0;i<_words.length;i++){
		let w=_words[i];
		console.log("WAERA "+w)
		printPointedDists(w,_words,graph);
		console.log("\n");
		console.log("UBA "	)
	}
}

for (let i=37;i<wordsList.length;i++){
	gdist_cache={}

	sprache = i<=22 ? "EN":"DE";

	let _words = wordsList[i];

	console.log("ASDFASDFASDFASDF "+_words[0]);
	let perms = allPerms(_words[0]);
	console.log("asdfasdf 123");
	let graph = genGraph(perms);
	console.log("asdfasdf 465");
	_words.sort();
	console.log("\n\n\n\n=========\n"+_words[0]+"\n=======\n\n")
	printPoints(_words,graph);
	printGraph(_words,graph,sprache);
}

