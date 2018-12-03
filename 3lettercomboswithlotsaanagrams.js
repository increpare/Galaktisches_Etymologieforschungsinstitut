const fs = require('fs');

let content=String(fs.readFileSync('wordsEn.txt'));
let words = content.split('\n');
console.log(words.length + ' words')
words = words.filter( w => w.length===3);
console.log(words.length + ' 3words')

function getAllPermutations(s) {
  let results = [];

  for (var i=0;i<s.length;i++){
  	for (var j=0;j<s.length;j++){
	  	for (var k=0;k<s.length;k++){
	  		var perm = s[i]+s[j]+s[k];
	  		results.push(perm);
	  	}
  	}
  }
  return results;
}

let letters =['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
let list =[];

function compareNumbers(a, b) {
  return a - b;
}

for (let i=0;i<26;i++){
	for (let j=i+1;j<26;j++){
		for (let k=j+1;k<26;k++){
			let s = letters[i]+letters[j]+letters[k];
			let perms = getAllPermutations(s);
			let score=0;
			let found=[];
			for (let l=0;l<perms.length;l++){
				if (words.indexOf(perms[l])>=0){
					found.push(perms[l]);
					score++;
				}
			}
			if (score>0){
				// console.log([s,score]);
			}
			list.push([s,score,found]);
		}
	}
}

list.sort( (a,b) => compareNumbers(a[1],b[1])).reverse();
console.log(list);


