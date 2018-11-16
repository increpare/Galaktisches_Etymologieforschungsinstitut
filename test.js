const fs = require('fs');
const { exec } = require('child_process');

var wordsList = [
	["post", "pots", "spot", "stop", "tops"],
	["east","eats","sate","seat","teas"],
	["alerting", "altering", "integral", "relating", "triangle"],
	["skate","stake","steak","takes","teaks"],
	["reins","resin","rinse","risen","siren"],
	["pares","parse","pears","reaps","spare","spear"],
	["least","slate","stale","steal","tales","teals"],
	["east","eats","sate","seat","teas"],
	["parsley","parleys","players","replays","sparely"],
	["dearths","hardest","hatreds","threads","trashed"],
	["carets","caters","caster","crates","reacts","recast","traces"],
	["altering", "tanglier", "triangle", "integral", "alerting", "relating"],
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
	["sirene", "serien", "reines", "seiner", "reisen", "einser", "riesen", "eisern"]
];

//https://de.wiktionary.org/wiki/Verzeichnis:Deutsch/Anagramme

function allPerms(string) {
    if (string.length < 2) return string; // This is our break condition

    var permutations = []; // This array will hold our permutations

    for (var i=0; i<string.length; i++) {
        var char = string[i];

        // Cause we don't want any duplicates:
        if (string.indexOf(char) != i) // if char was used already
            continue;           // skip it this time

        var remainingString = string.slice(0,i) + string.slice(i+1,string.length); //Note: you can concat Strings via '+' in JS

        for (var subPermutation of allPerms(remainingString))
            permutations.push(char + subPermutation)

    }
    return permutations;
}

function genGraph(words){
	result = {};
	for (var i=0;i<words.length;i++){
		var w = words[i];
		var targets = [];
		for (var j=0;j<w.length-1;j++){
			var wn = w.substr(0,j)+w[j+1]+w[j]+w.substr(j+2);
			targets.push(wn);
		}
		result[w]=targets;
	}
	return result;
}

var cache={};
function gdist(w1,w2,g){
	var key = w1+w2;
	if (cache.hasOwnProperty(key)){
		return cache[key];
	}
	
	if (w1==w2){
		return 0;
	}

	var visited = {};
	var tovisit = g[w1];
	var dist=0;
	var nexttovisit = [];

	while(true){
		dist++;
		for (var i=0;i<tovisit.length;i++){			
			var w = tovisit[i];
			if (w==w2){
				cache[key]=dist;
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
	for (var i=arr.length-1;i>=0;i--){
		var w = arr[i];
		if (arr.indexOf(w)<i){
			arr.splice(i,1);
		}
	}
}


function allWordsReachableWithJumps(startw,r,words,g){
	var tovisit=[startw]
	var visited=[]
	while(tovisit.length>0){
		var w = tovisit.pop();
		if (visited.indexOf(w)>=0){
			continue;
		}
		visited.push(w);
		var targets = getWordsRadiusRFrom(w,r,words,g);
		for (var i=0;i<targets.length;i++){
			var t=targets[i];
			if (visited.indexOf(t)>=0){
				continue;
			}
			var d = gdist(w,t,g);
			if (d<=r){
				tovisit.push(t);
			}
		}
	}
	return visited;
}

function printRadiusPointedDists(w,words,g){
	var word_dists = [];
	for (var i=0;i<words.length;i++){
		var w2 = words[i];
		var d = gdist(w,w2,g);
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

	var dists = word_dists.map( ([d,w]) => d );
	makeUnique(dists);
	dists.sort();

	function foldFn(acc,cur){

		if (acc.length==0){
			return [cur];
			}
		var last = acc[acc.length-1];
		if (last[0]==cur[0]){
			last.push(cur[1]);
		} else {
			acc.push(cur);
				}
		return acc;
	}

	var distLists = word_dists.reduce ( foldFn, [] )

	// printDistList(distLists);

	return distLists;
}

function getWordsRadiusRFrom(startword,r,words,g){
	var distLists = printRadiusPointedDists(startword,words,g);
	var l = distLists
				.filter( (e) => (e[0]<=r) )
				.map( (a) => a.slice(1) );
	var result = [].concat.apply([], l)
	return result;
}

function printPointedDists(startword,words,g){
	var lastgraph=[];
	for (var i=0;;i++){
		var curradius_words=allWordsReachableWithJumps(startword,i,words,g);
		var newwords = curradius_words.filter( (w) => lastgraph.indexOf(w)===-1 );

		
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
	var s="";
	var lastDist=0;
	for (var i=0;i<distLists.length;i++){
		var line=distLists[i];
		
		for(var j=0;j<line[0]-lastDist;j++){
			s+=".\n";
		}
		for(var j=1;j<line.length;j++){
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



function printPoints(_words,graph){
	for (var i=0;i<_words.length;i++){
		var w=_words[i];
		printPointedDists(w,_words,graph);
		console.log("\n");
	}
}


function printGraph(_words,graph){
	var fn = _words[0];

	var s = ""
	s += `graph {\n`
	// s += `\t graph [ rankdir=LR ]\n`

	for (var i=0;i<_words.length;i++){
		var w1=_words[i];
		for (var j=i+1;j<_words.length;j++){
			var w2=_words[j];
			var d = gdist(w1,w2,graph);
			s += `\t${w1} -- ${w2} [ label="${d}" ];\n`
		}
	}
	s += "}"

	fs.writeFileSync(`output/dot/${fn}.dot`, s);
	exec(`dot -Tpng output/dot/${fn}.dot > output/png/${fn}.png`);
}

for (var i=0;i<wordsList.length;i++){
	var _words=wordsList[i];

	var perms = allPerms(_words[0]);
	var graph = genGraph(perms);
	_words.sort();
	console.log("\n\n\n\n=========\n"+_words[0]+"\n=======\n\n")
	printPoints(_words,graph);
	// var result = allWordsReachableWithJumps("post",2,_words,graph);
	// console.log(JSON.stringify(result));

	printGraph(_words,graph);
}


