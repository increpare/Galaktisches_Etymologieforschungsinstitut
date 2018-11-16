const fs = require('fs');

function loadStuff(filename){
	let content =String(fs.readFileSync(filename));
	let words = content.split("\n");
	console.log(words.length + " words")

	words.sort( (a,b) => a.length-b.length)

	console.log("calculating divisions");

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
	return divided;
}

let en_Divided = loadStuff("wordsEn.txt");
let de_Divided = loadStuff("deutsch.txt");

let diff =  de_Divided[0][Object.keys(de_Divided[0])[0]].length-en_Divided[0][Object.keys(en_Divided[0])[0]].length;

var arraysoverlap = function (ar1, ar2) {
    return ar1.some(function (v) {
        return ar2.indexOf(v) >= 0;
    }) || ar2.some(function (v) {
        return ar1.indexOf(v) >= 0;
    });
};

//print top 20 from each group
for (let i=diff;i<en_Divided.length;i++){
	console.log("\n\nprocessing division "+i+"\n");

	let en_division=en_Divided[i];
	let en_dict={}
	for (let j=0;j<en_division.length;j++){
		let w = en_division[j];
		let k = w.split('').sort().join('');
		if (k==="mf"){
			console.log("AAH "+k);
			console.log("AAH "+w);
		}
		if (en_dict.hasOwnProperty(k)){
			en_dict[k].push(w);
		} else {
			en_dict[k]=[w];
		}
	}
	let en_vals = Object.keys(en_dict);

	let de_division=de_Divided[i-diff];
	let de_dict={}
	for (let j=0;j<de_division.length;j++){
		let w = de_division[j];
		let k = w.split('').sort().join('');
		if (de_dict.hasOwnProperty(k)){
			de_dict[k].push(w);
		} else {
			de_dict[k]=[w];
		}
	}
	let de_vals = Object.keys(de_dict);

	let bi_pairs = [];

	let joined_dict={}
	for (k=0;k<en_vals.length;k++){
		let key = en_vals[k]
		let e_v = en_dict[key]

		if (e_v.length>1){
			continue;
		}
		if (!de_dict.hasOwnProperty(key)){
			continue;
		}
		let de_v = de_dict[key];
		if (arraysoverlap(e_v,de_v)){
			continue;
		}
		bi_pairs.push([e_v,de_v])
	}

	bi_pairs.sort( (b,a) => b[0].length+b[1].length-a[0].length-a[1].length);

	for (k=0;k<bi_pairs.length;k++){
		var pair = bi_pairs[k]
		console.log(pair[0]+"\t"+pair[1]);
	}

	// en_vals.sort( (a,b) => b.length-a.length)
	// for (k=0;k<10 && k<en_vals.length && en_vals[k].length>1;k++){
	// 	console.log(en_vals[k].join("\", \""))
	// }
	// console.log("\n\n");

}
