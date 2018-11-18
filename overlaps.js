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
];

var chars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","ü","ö","ä"]
var wordvecs=[];
for (var i=0;i<wordsList.length;i++){
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
	for (var i=0;i<vec1.length;i++){
		if (vec1[i]>vec2[i]){
			return false;
		}
	}
	return true;	
}

var sprach_index=0;
let text = ["",""]

text[0] += `digraph {\n`
text[1] += `digraph {\n`

for (var i=0;i<wordvecs.length;i++){
	if (i===22){
		sprach_index=1;
	}
	var word1 = wordvecs[i];
	for (var j=0;j<wordvecs.length;j++){
		if ( (i<22 && j>=22) || (j<22  && i>=22) || (i===j)){
			continue;
		}
		var word2 = wordvecs[j];
		if (containedin(word1[1],word2[1])){
			console.log(sprach_index+"\t"+word1[0]+"\t"+word2[0]);
			text[sprach_index] += `\t"${word1[0]}(${word1[2].length})" -> "${word2[0]}(${word2[2].length})";\n`;
		} 
	}
}

text[0] += "}"	
text[1] += "}"	

fs.writeFileSync(`output/dot/overlaps_en.dot`, text[0]);
exec(`dot -Tpng output/dot/overlaps_en.dot > output/png/overlaps_en.png`);
fs.writeFileSync(`output/dot/overlaps_de.dot`, text[1]);
exec(`dot -Tpng output/dot/overlaps_de.dot > output/png/overlaps_de.png`);
