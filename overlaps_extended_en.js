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
	["carets","caters","caster","crates","reacts","recast","traces"],
	["nips", "pins", "spin", "snip"],
	["trees", "terse", "steer", "ester", "reset"],
	["now", "own", "won"],
	["lap", "pal", "alp"],
	["trap", "part", "tarp", "prat", "rapt"],


["crapes", "spacer", "capers", "casper", "recaps", "scrape", "pacers", "parsec", "escarp"],
["niters", "nitres", "sinter", "trines", "inters", "insert", "inerts", "estrin"],
["petals", "plates", "pleats", "staple", "septal", "palest", "palets", "pastel"],
["crates", "traces", "carets", "cartes", "reacts", "caster", "caters", "recast"],
["tensor", "tenors", "stoner", "noster", "noters", "toners", "nestor"],
["merits", "smiter", "mister", "miters", "mitres", "timers", "remits"],
["laster", "alerts", "talers", "staler", "alters", "slater", "salter"],
["spread", "spared", "spader", "drapes", "rasped", "padres", "parsed"],
["aspers", "spears", "sparse", "spares", "parses", "passer", "repass"],
["terras", "arrest", "starer", "rarest", "raster", "raters"],
["sutler", "ulster", "lustre", "luster", "rustle", "result"],
["tetras", "taters", "taster", "strate", "stater", "treats"],
["stripe", "sprite", "priest", "tripes", "esprit", "ripest"],
["lasted", "staled", "deltas", "desalt", "slated", "salted"],
["teaser", "aretes", "seater", "easter", "eaters", "reseat"],
["teslas", "tassel", "steals", "stales", "slates", "leasts"],
["versal", "slaver", "serval", "ravels", "salver", "lavers"],
["singer", "signer", "sering", "reigns", "renigs", "resign"],
["lascar", "craals", "rascal", "scalar", "sacral"],
["stifle", "itself", "flites", "fliest", "filets"],
["tenser", "enters", "ernest", "resent", "nester"],
["arches", "casher", "search", "chares", "chaser"],
["perdus", "prudes", "pursed", "drupes", "dupers"],
["argons", "groans", "orangs", "organs", "sarong"],
["phaser", "phrase", "sherpa", "shaper", "seraph"],
["steres", "steers", "serest", "esters", "resets"],
["corset", "coster", "sector", "rectos", "escort"],
["costar", "castor", "castro", "scrota", "actors"],
["stared", "daters", "derats", "treads", "trades"],
["beldam", "lambed", "blamed", "ambled", "bedlam"],
["warred", "warder", "drawer", "redraw", "reward"],
["lasing", "algins", "aligns", "lingas", "signal"],
["idlest", "listed", "delist", "silted", "tildes"],
["litres", "liters", "lister", "tilers", "relist"],
["danger", "grande", "garden", "gander", "ranged"],
["breads", "debars", "bardes", "sabred", "beards"],
["sparge", "grapes", "gasper", "gapers", "pagers"],
["sparer", "rapers", "rasper", "parers", "parser"],
["listen", "silent", "inlets", "tinsel", "enlist"],
["softer", "foster", "fortes", "forest", "fetors"],
["lamber", "marble", "blamer", "ambler", "ramble"],
["veiler", "levier", "relive", "eviler", "revile"],
["tapers", "prates", "paster", "paters", "repast"],
["trance", "canter", "recant", "centra", "nectar"],
["clears", "lacers", "sclera", "scaler"],
["lopers", "polers", "proles", "sloper"],
["horsed", "hordes", "shored", "rhodes"],
["warned", "warden", "wander", "andrew"],
["archon", "anchor", "rancho", "charon"],
["honers", "herons", "nosher", "senhor"],
["subtle", "sublet", "bluest", "bustle"],
["strove", "stover", "voters", "troves"],
["strode", "stored", "sorted", "doters"],
["tester", "street", "setter", "retest"],
["teased", "adeste", "sedate", "seated"],
["strife", "sifter", "refits", "rifest"],
["contra", "craton", "cantor", "carton"],
["stores", "sorest", "tosser", "rosets"],
["noires", "nosier", "irones", "senior"],
["stones", "stenos", "setons", "onsets"],
["tawers", "rawest", "waters", "waster"],
["lament", "mantle", "mantel", "mental"],
["boards", "adsorb", "broads", "dobras"],
["persia", "praise", "aspire", "spirea"],
["cosher", "ochers", "ochres", "chores"],
["hereat", "heater", "aether", "reheat"],
["poster", "presto", "tropes", "topers"],
["petard", "prated", "depart", "parted"],
["pintos", "piston", "pitons", "points"],
["stance", "ascent", "secant", "enacts"],
["laired", "derail", "dialer", "railed"],
["crated", "traced", "carted", "redact"],
["coders", "credos", "decors", "scored"],
["manger", "german", "ragmen", "engram"],
["tarred", "darter", "trader", "retard"],
["larges", "lagers", "argles", "glares"],
["spored", "prosed", "dopers", "pedros"],
["cruets", "curets", "truces", "eructs"],
["prides", "spired", "prised", "spider"],
["livres", "livers", "sliver", "silver"],
["ablest", "tables", "bleats", "stable"],
["biders", "debris", "brides", "rebids"],
["danker", "darken", "narked", "ranked"],
["esther", "ethers", "threes", "theres"],
["tamers", "stream", "maters", "master"],
["aisled", "ideals", "ladies", "sailed"],
["deairs", "irades", "raised", "aiders"],
["player", "parley", "replay", "pearly"],
["dearer", "reader", "reared", "reread"],
["tubers", "brutes", "buster", "rebuts"],
["binder", "brined", "rebind", "inbred"],
["deigns", "design", "singed", "signed"],
["bruise", "buries", "busier", "rubies"],
["gourde", "drogue", "rouged", "rogued"],
["tabers", "breast", "barest", "baster"],
["dentin", "intend", "tinned", "indent"],
["glider", "girdle", "gilder", "regild"],
["detour", "toured", "redout", "routed"],
["devein", "veined", "endive", "envied"],
["aliens", "alines", "lianes", "saline"],
["sirens", "serins", "resins", "rinses"],
["triode", "dotier", "editor", "rioted"],
["dieter", "reedit", "tiered", "retied"],
["alined", "daniel", "denial", "nailed"],
["wolfer", "fowler", "flower", "reflow"],
["lifers", "fliers", "filers", "rifles"],
["ancien", "canine", "cannie", "encina"],
["cadres", "cedars", "scared", "sacred"],
["trepan", "enrapt", "parent", "entrap"],
["angers", "ganser", "ranges", "sanger"],
["inures", "insure", "ursine", "urines"],
["hotels", "hostel", "helots", "tholes"],
["gainer", "earing", "regain", "regina"],
["senate", "sateen", "enates", "santee"],
["dreads", "readds", "sadder", "adders"],
["secure", "recuse", "cereus", "rescue"],
["sealer", "leaser", "resale", "reseal"],
["scathe", "sachet", "chaste", "cheats"],
["basest", "basset", "bastes", "beasts"],
["pirates", "piastre", "piaster", "pastier", "parties", "traipse"],
["results", "rustles", "sutlers", "ulsters", "lusters", "lustres"],
["repairs", "raspier", "rapiers", "praiser", "parries", "aspirer"],
["esprits", "priests", "spriest", "sprites", "stripes", "persist"],
["erasing", "reginas", "regains", "earings", "searing", "gainers"],
["enviers", "inverse", "veiners", "veneris", "venires", "versine"],
["retsina", "retinas", "retains", "stainer", "stearin", "nastier"],
["dearths", "hardest", "hardset", "hatreds", "threads", "trashed"],
["proteus", "spouter", "pouters", "posture", "petrous", "troupes"],
["striate", "tastier", "iratest", "attires", "artiste", "artiest"],
["retests", "setters", "streets", "tersest", "testers"],
["retails", "saltier", "realist", "slatier", "tailers"],
["rentage", "reagent", "grantee", "greaten", "negater"],
["eroding", "redoing", "groined", "ignored", "negroid"],
["entails", "salient", "saltine", "elastin", "nailset"],
["respect", "scepter", "sceptre", "specter", "spectre"],
["reviles", "relives", "servile", "leviers", "veilers"],
["enraged", "derange", "grandee", "grenade", "angered"],
["sainted", "detains", "destain", "stained", "instead"],
["resider", "redries", "serried", "desirer", "derries"],
["scalper", "placers", "clasper", "parcels", "carpels"],
["scanter", "recants", "canters", "trances", "nectars"],
["editors", "sortied", "steroid", "storied", "triodes"],
["rearing", "earring", "rangier", "grainer", "angrier"],
["rambles", "blamers", "lambers", "amblers", "marbles"],
["seraphs", "shapers", "sherpas", "phrases", "phasers"],
["psalter", "stapler", "platers", "plaster", "palters"],
["reseals", "resales", "sealers", "earless", "leasers"],
["rescued", "reduces", "recused", "secured", "seducer"],
["spireas", "praises", "parises", "paresis", "aspires"],
["staider", "tardies", "tirades", "astride", "aridest"],
["replays", "sparely", "players", "parsley", "parleys"],
["regally", "gallery", "largely", "allergy"],
["filters", "stifler", "trifles", "lifters"],
["waister", "waiters", "wariest", "wastier"],
["entraps", "pastern", "parents", "trepans"],
["sacrals", "scalars", "rascals", "lascars"],
["relates", "elaters", "realest", "stealer"],
["related", "treadle", "altered", "alerted"],
["resound", "enduros", "sounder", "undoers"],
["resigns", "signers", "singers", "ingress"],
["enlists", "silents", "tinsels", "listens"],
["revised", "diverse", "deviser", "derives"],
["salters", "slaters", "lasters", "artless"],
["salting", "slating", "staling", "lasting"],
["regilds", "gilders", "girdles", "gliders"],
["reseats", "easters", "seaters", "teasers"],
["reflows", "flowers", "fowlers", "wolfers"],
["scalers", "scleras", "classer", "carless"],
["retinal", "reliant", "ratline", "latrine"],
["retrace", "recrate", "terrace", "caterer"],
["scarlet", "crestal", "clarets", "cartels"],
["scleral", "recalls", "cellars", "callers"],
["elating", "gelatin", "genital", "atingle"],
["recount", "counter", "cornute", "trounce"],
["recipes", "precise", "pierces", "piecers"],
["reports", "pretors", "sporter", "porters"],
["reteach", "hectare", "teacher", "cheater"],
["eatings", "easting", "seating", "teasing"],
["reacted", "created", "cerated", "catered"],
["rasping", "sparing", "parsing", "parings"],
["raspers", "sparers", "sparser", "parsers"],
["raptest", "spatter", "tapster", "patters"],
["dopiest", "deposit", "posited", "topside"],
["repeals", "relapse", "pleaser", "leapers"],
["retards", "darters", "starred", "traders"],
["serging", "gingers", "snigger", "niggers"],
["gaiters", "stagier", "triages", "aigrets"],
["sheared", "headers", "hearsed", "adheres"],
["shotgun", "gunshot", "hognuts", "noughts"],
["diapers", "despair", "praised", "aspired"],
["devoirs", "devisor", "visored", "voiders"],
["skating", "staking", "takings", "tasking"],
["slander", "snarled", "darnels", "landers"],
["slashes", "hassels", "hassles", "ashless"],
["slather", "halters", "thalers", "lathers"],
["smartie", "artemis", "maestri", "maitres"],
["granite", "tangier", "tearing", "ingrate"],
["declaim", "decimal", "claimed", "medical"],
["sorbate", "borates", "boaters", "boaster"],
["rewards", "redraws", "drawers", "warders"],
["reveres", "reverse", "reserve", "severer"],
["escorts", "sectors", "costers", "corsets"],
["rouster", "routers", "tourers", "trouser"],
["reviled", "relived", "deliver", "livered"],
["erasmus", "assumer", "amusers", "masseur"],
["subtler", "butlers", "bustler", "bluster"],
["restack", "rackets", "stacker", "tackers"],
["coalpit", "topical", "optical", "capitol"],
["impaler", "impearl", "palmier", "lempira"],
["tertian", "iterant", "nitrate", "nattier"],
["altering", "tanglier", "triangle", "integral", "alerting", "relating"],
["astringe", "granites", "ingrates", "angriest", "rangiest", "gantries"],
["grantees", "greatens", "sergeant", "estrange", "negaters", "reagents"],
["assertor", "assorter", "oratress", "roasters", "reassort"],
["strainer", "trainers", "retrains", "restrain", "terrains"],
["sceptres", "scepters", "respects", "spectres", "specters"],
["traipses", "piastres", "piasters", "pastries", "raspiest"],
["pertains", "parentis", "pantries", "painters", "repaints"],
["dressier", "residers", "derrises", "desirers"],
["damneder", "remanded", "redemand", "demander"],
["teariest", "treatise", "treaties", "iterates"],
["vileness", "veinless", "evilness", "liveness"],
["trounces", "construe", "counters", "recounts"],
["teardrop", "prorated", "predator", "parroted"],
["serrated", "treaders", "retreads", "arrested"],
["triremes", "rimester", "miterers", "merriest"],
["prattles", "platters", "sprattle", "splatter"],
["sintered", "sentried", "inserted", "resident"],
["gardened", "dangered", "deranged", "gandered"],
["elastins", "saltines", "salients", "nailsets"],
["simpered", "premised", "impeders", "epiderms"],
["diopters", "peridots", "topsider", "riposted"],
["silenter", "enlister", "listener", "reenlist"],
["cantered", "crenated", "decanter", "recanted"],
["piecrust", "pictures", "crepitus", "cuprites"],
["signaler", "aligners", "realigns", "slangier"],
["salesmen", "lameness", "nameless", "maleness"],
["entrails", "retinals", "latrines", "ratlines"],
["inserter", "reinters", "reinsert", "terrines"],
["ethicist", "itchiest", "chitties", "theistic"],
["cratered", "retraced", "recrated", "terraced"],
["creating", "catering", "argentic", "reacting"],
["caterers", "retraces", "recrates", "terraces"],
["introduces", "rediscount", "reductions", "discounter"]

	// ["eilst","leist","liest","liste","seilt","sielt","steil","stiel","stile","teils"],
	// ["genre","neger","regen","gerne","enger"],
	// ["balgen","belang","gabeln"],
	// ["feiern", "ferien", "freien", "riefen", "reifen","eifern"],
	// ["roten", "orten", "toren", "tenor"],
	// ["heer", "eher", "ehre","rehe"],
	// ["rote", "tore", "orte"],
	// ["ort", "rot", "tor"],
	// ["derlei", "leider", "lieder"],
	// ["schlafen", "falschen", "flaschen"],
	// ["seien", "seine", "eines", "eisen"],
	// ["streichen","enterichs","scheitern","schreiten","sicherten","reichsten"],
	// ["sirene", "serien", "reines", "seiner", "reisen", "einser", "riesen", "eisern"],


	// ["scheinen", "schienen", "chinesen", "schneien"],
	// ["genetischer", "gesicherten", "gestenreich", "gestrichene", "energetisch"],

	// ["tischchen", "schichten", "technisch", "tschechin"],

	// ["scheint", "schneit", "sichten", "stichen", "nitsche", "tischen"],
	// ["breite", "bereit", "beriet", "bertie", "triebe", "treibe", "bieter"],
	// ["sterne", "tresen", "resten", "nester", "ersten", "ernste", "ernest"],
	// ["nagel", "galen", "angel", "lange", "lagen", "algen"],
	// ["reaktion", "kantorei", "kroatien", "kreation"],
	// ["niere", "eiern", "einer", "reine"],
	// ["vorsprechen", "vorpreschen", "versprochen"],
	// ["verbreite", "verbriete", "verreibet", "verriebet", "vertreibe", "vertriebe", "brevetier"],
	// ["agileren", "anlieger", "einlager", "einlagre", "galerien", "algerien", "genialer", "inegaler", "rangelei", "regalien"],
	// ["triebes", "siebter", "siebert", "seibert", "riebest", "biester", "reibest", "breites", "bieters", "biester", "bereits", "bereist", "beierst"],
];


// wordsList = [
// 	["a"],
// 	["b"],
// 	["c"],
// 	["ab"],
// 	["abc"],
// 	["abce"],
// 	["abcf"],
// ]

let  chars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","ü","ö","ä"]
let  wordvecs=[];
for (let  i=0;i<wordsList.length;i++){
	let  w = wordsList[i][0];
	let  key = [];
	for (let  j=0;j<chars.length;j++){
		key.push(0);
	}
	for (let  j=0;j<w.length;j++){
		let  c=w[j];
		let  ci = chars.indexOf(c);
		key[ci]++;
	}
	wordvecs.push([w,key,wordsList[i]]);
}

function overlaps(vec1,vec2){
	for (let  i=0;i<vec1.length;i++){
		if (vec1[i]>0 && vec2[i]>0){
			return true;
		}
	}
	return false;	
}


function containedin(vec1,vec2){
	let  somedifferent=false;
	for (let  i=0;i<vec1.length;i++){
		if (vec1[i]>vec2[i]){
			return false;
		}
		if (vec1[i]!==vec2[i]){
			somedifferent=true;
		}
	}
	return somedifferent;//true;//allequal===false;	
}

let text = [""]

edges = {};

for (let  i=0;i<wordvecs.length;i++){
	let  word1 = wordvecs[i];
	let  w1 = word1[1];
	let  k1 = `${word1[0]}(${word1[2].length})`;
	for (let  j=0;j<wordvecs.length;j++){
		let  word2 = wordvecs[j];		
		let  k2 = `${word2[0]}(${word2[2].length})`;
		let  w2 = word2[1];

		if (containedin(w1,w2)){
			if (edges.hasOwnProperty(k1)){
				if (edges[k1].indexOf(k2)===-1){
					edges[k1].push(k2);
				}
			} else {
				edges[k1]=[k2]
			}
		} 
	}
}


let  vertices = Object.keys(edges);
let  targets = Object.values(edges);

let  sources = vertices.filter( v => targets.indexOf(v)===-1 )


function getPaths(path){
	var initpad = "";
	for (var i=0;i<path.lenght;i++){
		initpad+="\t";
	}

	let  curWord = path[path.length-1];

	if (edges.hasOwnProperty(curWord)){
		var result=[];
		let edgetargets = edges[curWord];
		for (var i=0;i<edgetargets.length;i++){
			var target = edgetargets[i];
			var extendedPath = path.slice();
			extendedPath.push(target);
			var extendedPaths = getPaths(extendedPath);
			for (var j=0;j<extendedPaths.length;j++){
				result.push(extendedPaths[j]);
			}
		}
		return result;
	} else {
		return [path];
	}
}

let  paths = [];

for (let  i=0;i<sources.length;i++){
	let  s = sources[i];
	var ps = getPaths([s]);
	for (let j=0;j<ps.length;j++){
		paths.push(ps[j]);
	}
}

paths.sort(function (a, b) {
  return b.length - a.length;
});

console.log(paths);
// fs.writeFileSync(`output/dot/overlaps_en_big.dot`, text[0]);
// exec(`dot -Tpng output/dot/overlaps_en_big.dot > output/png/overlaps_en_big.png`);
