//wichtiges regex \n\n([^\n^\.^,^=]+\n)+\n

const fs = require('fs');
const { exec } = require('child_process');

let wordsList = [
	["laps", "alps", "pals", "slap"],
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
	["psalter", "stapler", "platers", "plaster", "palters"],
	["carets","caters","caster","crates","reacts","recast","traces"],
	["nips", "pins", "spin", "snip"],
	["trees", "terse", "steer", "ester", "reset"],
	["now", "own", "won"],
	["lap", "pal", "alp"],
	["trap", "part", "tarp", "prat", "rapt"],

	["eilst","leist","liest","liste","seilt","steil","stiel","stile","teils"],
	["genre","neger","regen","gerne","enger"],
	["balgen","belang","gabeln"],
	["feiern", "ferien", "freien", "riefen", "reifen","eifern"],
	["roten", "orten",  "tenor"],
	["heer", "eher", "ehre","rehe"],
	["rote", "tore", "orte"],
	["ort", "rot", "tor"],
	["derlei", "leider", "lieder"],
	["schlafen", "falschen", "flaschen"],
	["seien", "seine", "eines", "eisen"],
	["streichen","scheitern","schreiten","sicherten","reichsten"],
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
	["agileren", "anlieger", "einlager", "einlagre", "galerien", "algerien", "genialer", "inegaler", "rangelei", "regalien"],
	["triebes", "siebter", "seibert", "riebest", "biester", "reibest", "breites", "bieters", "bereits", "bereist", "beierst"],
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


var gdist_cache = {};
function gdist(w1,w2){
	if (w1==w2){
		return 0;
	}
	var key = w1+w2;
	if (gdist_cache.hasOwnProperty(key)){
		return gdist_cache[key];
	}

	//1 generate abstract permutation
	var already_assigned = [];
	for (var i=0;i<w1.length;i++){
		already_assigned.push(false)
	}

	var wl = w1.length;
	var perm = [];
	for (var i=0;i<wl;i++){
		var c1 = w1[i];
		if (already_assigned[i]==false && w2[i]==c1){
			perm.push(i);
			continue;
		}
		for (var j=0;j<wl;j++){
			if (already_assigned[j]==true){
				continue;
			}
			var c2 = w2[j];
			if (c2==c1){
				already_assigned[j]=true;
				perm.push(j);
				break;
			}
		}
	}


	var dist=0;

	for (var i=0;i<perm.length;i++){
		var pi=perm[i];

		for (var j=i+1;j<wl;j++){
			var pj=perm[j];
			if (pi>pj){
				dist++
			}
		}
	}

	var result=dist;
	gdist_cache[key]=result;
	return result;
}

function makeUnique(arr) {
	for (let i=arr.length-1;i>=0;i--){
		let w = arr[i];
		if (arr.indexOf(w)<i){
			arr.splice(i,1);
		}
	}
}



function allWordsReachableWithJumps(startw,r,words){

	let tovisit=[startw]
	let visited=[]
	while(tovisit.length>0){
		let w = tovisit.pop();
		if (visited.indexOf(w)>=0){
			continue;
		}
		visited.push(w);
		let targets = getWordsRadiusRFrom(w,r,words);
		for (let i=0;i<targets.length;i++){
			let t=targets[i];
			if (visited.indexOf(t)>=0){
				continue;
			}
			let d = gdist(w,t);
			if (d<=r){
				tovisit.push(t);
			}
		}
	}
	return visited;
}

function printRadiusPointedDists(w,words){
	let key = w;

	let word_dists = [];
	for (let i=0;i<words.length;i++){
		let w2 = words[i];
		let d = gdist(w,w2);
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

function getWordsRadiusRFrom(startword,r,words){

	let distLists = printRadiusPointedDists(startword,words);
	let l = distLists
				.filter( (e) => (e[0]<=r) )
				.map( (a) => a.slice(1) );
	let result = [].concat.apply([], l)
	return result;
}

function printPointedDists(startword,words){
	let lastgraph=[];
	for (let i=0;;i++){
		let curradius_words=allWordsReachableWithJumps(startword,i,words);
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





function printGraph(_words,sprache){

	let fn = _words[0];

	let s = ""
	s += `graph {\n`
	// s += `\t graph [ rankdir=LR ]\n`

	for (let i=0;i<_words.length;i++){
		let w1=_words[i];
		for (let j=i+1;j<_words.length;j++){
			let w2=_words[j];		
			let d = gdist(w1,w2);
			s += `\t${w1} -- ${w2} [ label="${d}" ];\n`
		}
	}
	s += "}"
	fs.writeFileSync(`output/dot/${sprache}_${fn}.dot`, s);
	exec(`dot -Tpng output/dot/${sprache}_${fn}.dot > output/png/${sprache}_${fn}.png`);
}


function printPoints(_words){
	for (let i=0;i<_words.length;i++){
		let w=_words[i];
		printPointedDists(w,_words);
		console.log("\n");
	}
}

for (let i=0;i<wordsList.length;i++){
	gdist_cache={}

	sprache = i<=22 ? "EN":"DE";

	let _words = wordsList[i];

	_words.sort();
	console.log("\n\n\n\n=========\n"+_words[0]+"\n=======\n\n")
	printPoints(_words);
	printGraph(_words,sprache);
}




