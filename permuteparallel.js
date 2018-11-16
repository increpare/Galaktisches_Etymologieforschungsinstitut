let ars = [
[0,3,2,1],
[2,1,0,3,4],
[5,2,4,1,0,3],
[2,0,4,6,3,1,5],
[7,4,2,3,5,1,6,0],
[2,8,5,0,4,6,1,3,7],
[1,3,8,2,0,7,4,6,5,9],
[1,2,9,6,8,5,10,4,7,3,0]
];

var woerter = [ ["duel","lude","lash","hals","blah","halb","balk","kalb"],
["ditch","dicht","kneed","denke","admit","damit","gored","droge","snots","sonst"],
["longer","orgeln","regret","erregt","gnawed","gewand","gaslit","lastig","goblet","gelobt","gloves","vogels"],
["likened","kleiden","vintage","negativ","orgasms","sorgsam","figured","freudig","cherish","hirsche","penises","speisen","handgun","ahndung"],
["urbanize","zauberin","chortles","rechtlos","theories","reithose","indulges","siedlung","lukewarm","maulwerk","thesauri","haustier","feathers","seefahrt","freaking","grafiken","mistaken","semantik"],
["treasured","steuerrad","aneurisms","masseurin","languages","augenglas","bitchiest","tibetisch","phonetics","optischen","governors","vorsorgen","elemental","metallene","enciphers","speichern","seesawing","weissagen"],
["enthralled","handteller","artichokes","kroatische","governable","rabenvogel","nominators","astronomin","antipodean","adaptionen","foreigners","sorgenfrei","mensurable","lebensraum","monarchies","romanische","fingernail","filigranen","theologian","anthologie"],
["infestation","sinfonietta","nearsighted","geisterhand","reorienting","ignorierten","westernized","widersetzen","multiethnic","lichtminute","machinelike","chemikalien","monochromes","chromosomen","dilettantes","stadtteilen","netherlands","strahlenden","furtherance","frauenrecht","telekinesis","kieselstein"] ];

function perm(w,p){
	var r = "";
	for (var i=0;i<p.length;i++){
		r+=w[p[i]];
	}
	return r;
}

var result=[]
for (var i=4;i<=11;i++){
	var p = ars[i-4];
	var words = woerter[i-4];
	var row=[]
	for (var j=1;j<words.length;j+=2){
		var w = words[j];
		row.push(perm(w,p));
	}
	result.push(row);
}

console.log(result);