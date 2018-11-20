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
	["carets","caters","caster","crates","reacts","recast","traces"],
	["nips", "pins", "spin", "snip"],
	["trees", "terse", "steer", "ester", "reset"],
	["now", "own", "won"],
	["lap", "pal", "alp"],
	["trap", "part", "tarp", "prat", "rapt"],
	["psalter", "stapler", "platers", "plaster"],
	["prattles", "platters", "splatter"],
	["retails", "saltier", "realist"],
	["singer", "signer", "reigns", "resign"],
	["signaler", "aligners", "realigns"],
	["alerts", "staler", "alters", "slater", "salter"],
	["teslas", "tassel", "steals", "slates"],
	["elastins", "saltines", "salients", "nailsets"],
	["striate", "tastier", "iratest", "attires", "artiste", "artiest"],
	["treatise", "treaties", "iterates"],
	["tenser", "enters", "ernest", "resent", "nester"],
	["sintered", "sentried", "inserted", "resident"],
	["iridescent", "indiscrete", "indiscreet"],
	["recount", "counter", "trounce"],
	["trounces", "construe", "counters", "recounts"],
	["introduces", "rediscount", "reductions", "discounter"],
	["pertains", "parentis", "pantries", "painters", "repaints"],
	["serrated", "treaders", "retreads", "arrested"],
	["rawest", "waters", "waster"],
	["tamers", "stream", "maters", "master"],
	["dearths", "hardest", "hardset", "hatreds", "threads", "trashed"],


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
	["triebes", "siebter", "siebert", "seibert", "riebest", "biester", "reibest", "breites", "bieters", "biester", "bereits", "bereist", "beierst"],
	["sicheren", "schreine", "schreien", "schieren", "riechens", "einscher", "erschein", "erschien", "reichens"],
	["gestrichene", "gestenreich", "gesicherten", "genetischer", "energetisch"],
	["negierest", "negiertes", "seigerten", "ereignest", "ersteigen", "erstiegen", "erstiegne", "genierest", "geniertes", "gereisten", "geriesten"],
	["abreisten", "abreitens", "absentier", "anbieters", "antriebes", "arbeitens", "basierten"],
	["reifendes", "riefendes", "seifender", "seifernde", "eiferndes", "feierndes", "fierendes", "freiendes"],
	["stedinger", "steigernd", "tigerndes", "trendiges", "designter", "erdigsten", "geisternd"],
	["abseilen", "anbliese", "balinese", "einblase", "einsalbe", "libanese"],
	["libanesen", "anbliesen", "balinesen", "biennales", "einblasen", "einsalben"],
	["verholten", "verlohnet", "verlohnte", "verlohten", "vorlehnet", "vorlehnte"],
	["nordseite", "serientod", "sondieret", "sondierte", "steroiden", "desertion", "dosierten", "dotierens", "drosteien"],

];

var chars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","ü","ö","ä"]
var wordvecs=[];
for (var i=0;i<wordsList.length;i++){
	console.log(wordsList[i]);
	var w = wordsList[i][0];
	var key = [];
	for (var j=0;j<chars.length;j++){
		key.push(0);
	}
	for (var j=0;j<w.length;j++){
		var c=w[j];
		var ci = chars.indexOf(c);
		key[ci]++;
	}
	wordvecs.push([w,key,wordsList[i]]);
}

function overlaps(vec1,vec2){
	for (var i=0;i<vec1.length;i++){
		if (vec1[i]>0 && vec2[i]>0){
			return true;
		}
	}
	return false;	
}


function containedin(vec1,vec2){
	var equal=true;
	for (var i=0;i<vec1.length;i++){
		if (vec1[i]>vec2[i]){
			return false;
		}
		if (vec1[i]!==vec2[i]){
			equal=false;
		}
	}
	return equal===false;	
}

var sprach_index=0;
let text = ["",""]

text[0] += `digraph {\n`
text[1] += `digraph {\n`

var firstdeutsch = 43;

function noContainedBetween(wv1,wv2){
	for (var i=0;i<wordvecs.length;i++){
		var w_cand = wordvecs[i];
		if (containedin(wv1[1],w_cand[1]) && containedin(w_cand[1],wv2[1])){
			return false;
		}
	}
	return true;
}

for (var i=0;i<wordvecs.length;i++){
	if (i===firstdeutsch){
		sprach_index=1;
	}
	var word1 = wordvecs[i];
	for (var j=0;j<wordvecs.length;j++){
		if ( (i<firstdeutsch && j>=firstdeutsch) || (j<firstdeutsch  && i>=firstdeutsch) || (i===j)){
			continue;
		}
		var word2 = wordvecs[j];
		if (containedin(word1[1],word2[1])){
			if (noContainedBetween(word1,word2)){
				text[sprach_index] += `\t"${word1[0]}(${word1[2].length})" -> "${word2[0]}(${word2[2].length})";\n`;
			}
		} 
	}
}

text[0] += "}"	
text[1] += "}"	

fs.writeFileSync(`output/dot/overlaps_en.dot`, text[0]);
exec(`dot -Tpng output/dot/overlaps_en.dot > output/png/overlaps_en.png`);
fs.writeFileSync(`output/dot/overlaps_de.dot`, text[1]);
exec(`dot -Tpng output/dot/overlaps_de.dot > output/png/overlaps_de.png`);
