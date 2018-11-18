const fs = require('fs');

var content=String(fs.readFileSync("wordsEn.txt"));
var words = content.split("\n");
console.log(words.length + " words")

words.sort( (a,b) => a.length-b.length)

console.log("calculating divisions");

var wi=0;
var cur=[words[0]]
var divided=[cur]
for (var i=1;i<words.length;i++){
	var w = words[i];
	if (cur[0].length===w.length){
		cur.push(w);
	} else {
		console.log("on stufe "+w.length);
		cur=[w];
		divided.push(cur)		
	}
}


//print top 20 from each group
for (var i=0;i<divided.length;i++){
	console.log("processing division "+i);

	var division=divided[i];
	var dict={}
	for (var j=0;j<division.length;j++){
		var w = division[j];
		var k = w.split('').sort().join('');
		if (dict.hasOwnProperty(k)){
			dict[k].push(w);
		} else {
			dict[k]=[w];
		}
	}
	var vals = Object.values(dict);
	vals.sort( (a,b) => b.length-a.length)
	for (k=0; k<vals.length && vals[k].length>2;k++){
		console.log(vals[k].join(", "))
	}
	console.log("\n\n");

}