const fs = require('fs');
const { exec } = require('child_process');


let wordsList = [

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

["teigeres", "teeriges", "steigere", "seigerte", "ersteige", "erstiege", "geeister", "geistere", "gereiste", "gerieste", "getieres"],
["streiche", "sicherte", "seichter", "schreite", "schreiet", "scheitre", "scheiter", "riechest", "estriche", "reichest", "reichste"],
["trainees", "stearine", "sanierte", "sanieret", "anreiset", "anreiste", "anstiere", "astreine", "einraste", "inserate", "resinate"],
["triefest", "tiefster", "streifte", "streifet", "rieftest", "fiertest", "fitteres", "freitest", "fristete", "reiftest"],
["triebest", "treibest", "tibeters", "berietst", "berittes", "bestreit", "birettes", "bitteres", "breitest", "brietest"],
["tischler", "strichle", "strichel", "stichler", "schliert", "rischelt", "erlischt", "erstlich", "lichters", "restlich"],
["teigster", "teigrest", "stetiger", "steigert", "ersteigt", "erstiegt", "geistert", "gerietst", "gestiert", "giertest"],
["seiender", "seidener", "sedieren", "riesende", "edierens", "eierndes", "eisender", "niederes", "reisende"],
["siechten", "seichten", "schneite", "schneiet", "schiente", "schienet", "scheiten", "scheinet", "einstech"],
["storchte", "storchet", "stochert", "schrotte", "schrotet", "schottre", "schotter", "schortet", "rochetts"],
["agileren", "anlieger", "einlager", "einlagre", "galerien", "genialer", "inegaler", "rangelei", "regalien"],
["tratsche", "tartsche", "schratte", "schartet", "chartest", "chatters", "erstacht", "ratschet", "ratschte"],
["striegle", "striegel", "riegelst", "erliegst", "geilster", "gelierst", "gleiters", "grieselt", "legierst"],
["abreiten", "abrieten", "anbieter", "anbriete", "anerbiet", "antreibe", "antriebe", "arbeiten", "einbrate"],
["sicheren", "schreine", "schreien", "schieren", "riechens", "einscher", "erschein", "erschien", "reichens"],
["teigeren", "teerigen", "ereignet", "geeinter", "genieret", "genierte", "gerieten", "negieret", "negierte"],
["abledern", "albernde", "beladner", "bladeren", "brandele", "erlabend", "labender", "labernde"],
["geeifert", "gefeiert", "gefeiter", "gefierte", "gefreite", "geiferte", "gereifte", "geriefte"],
["riegelte", "erlieget", "geeilter", "geleiert", "gelieret", "gelierte", "legieret", "legierte"],
["steigern", "geistern", "genierst", "gestirne", "greinest", "grienest", "integres", "negierst"],
["abregnet", "abregten", "benagter", "betragen", "gebarten", "gebraten", "gebratne", "genarbte"],
["tangiere", "agierten", "arteigen", "arteigne", "eigenart", "eintrage", "gerainte", "nagetier"],
["schriebe", "schreibe", "schieber", "bereichs", "beschrei", "beschrie", "besicher", "besichre"],
["tauchers", "strauche", "staucher", "schauert", "erschaut", "rauchest", "rauschet", "rauschte"],
["stichele", "sichelte", "schielte", "schielet", "scheitle", "scheitel", "etliches", "leichtes"],
["tirassen", "stearins", "sanierst", "retsinas", "anreisst", "anrisset", "inserats", "resinats"],
["singerei", "signiere", "siegerin", "riesigen", "einigers", "ereignis", "nieriges", "reisigen"],
["pachtens", "panschet", "panschte", "pantsche", "paschten", "patchens", "patschen"],
["teigsten", "stetigen", "entsteig", "entstieg", "genistet", "gesteint", "neigtest"],
["abgelten", "ablegten", "belanget", "belangte", "benagelt", "gabelten", "gelabten"],
["tascherl", "schralte", "schralet", "schalter", "achterls", "lachters", "raschelt"],
["tendiere", "dienerte", "edierten", "einredet", "eiternde", "identere", "reitende"],
["riefende", "eifernde", "feiender", "feiernde", "fierende", "freiende", "reifende"],
["absegnet", "angebest", "begasten", "benagest", "benagtes", "besagten", "gebanste"],
["absentem", "bastenem", "beatmens", "bemasten", "benamset", "benamste", "besamten"],
["beeifert", "befreiet", "befreite", "bereifet", "bereifte", "beriefet", "fieberte"],
["türchens", "tünchers", "trüschen", "schürten", "schnürte", "schnüret", "rüschten"],
["tauschen", "tauchens", "stauchen", "schauten", "ansuchet", "ansuchte", "nastuche"],
["seeartig", "agierest", "agiertes", "gasieret", "gasierte", "gasterei", "gastiere"],
["uterines", "untieres", "uniertes", "unierest", "tunesier", "steuerin", "einstreu"],
["sterinen", "steinern", "ersinnet", "innerste", "inserent", "internes", "reinsten"],
["vertiere", "verriete", "verreite", "vereitre", "vereiter", "revierte", "revieret"],
["entringe", "erntinge", "gerinnet", "greinten", "grienten", "integren", "regentin"],
["staderen", "anredest", "artendes", "astender", "estraden", "rastende", "ratendes"],
["geiltest", "gelistet", "gestielt", "gleistet", "gleitest", "igeltest", "lettiges"],
["witschte", "witschet", "wischtet", "wichtest", "wichstet", "switchte", "switchet"],
["siegelst", "seligste", "geilstes", "geisselt", "gleisest", "gleisset", "gleisste"],
["schlieft", "schleift", "schilfte", "schilfet", "feilscht", "festlich", "fischelt"],
["ahnender", "andrehen", "erahnend", "erdnahen", "harnende", "nahender"],
["einleger", "erliegen", "geileren", "gelieren", "legieren", "reinlege"],
["tonerden", "tonender", "donnerte", "nordeten", "ordneten", "ortenden"],
["absuchet", "absuchte", "bauchest", "bauschet", "bauschte", "beschaut"],
["tokaiern", "kantorei", "karotine", "kraniote", "kreation", "reaktion"],
["eilender", "ereilend", "erleiden", "leidener", "leideren", "leiernde"],
["tischens", "sichtens", "schneist", "schienst", "scheinst", "estnisch"],
["eierndem", "emendier", "endreime", "niederem", "reimende", "remedien"],
["ursachen", "schauern", "ansucher", "erschaun", "rauchens", "rauschen"],
["timendes", "stiemend", "sediment", "dementis", "mindeste", "mistende"],
["abseilen", "anbliese", "balinese", "einblase", "einsalbe", "libanese"],
["darlegen", "endlager", "endlagre", "geladner", "lagernde", "legendar"],
["tibetern", "beritten", "berittne", "biretten", "bitteren", "erbitten"],
["unterste", "unsteter", "treusten", "streuten", "streunte", "streunet"],
["tessiner", "stierens", "entreiss", "entrisse", "reinstes", "reistens"],
["unterdes", "suderten", "streuend", "steuernd", "rundeste", "dusteren"],
["abregelt", "belagert", "gaberlte", "gealbert", "gelabert", "gelabter"],
["bieterin", "einbriet", "einreibt", "einriebt", "eintreib", "eintrieb"],
["ablenket", "ablenkte", "anklebet", "anklebte", "betakeln", "kabelten"],
["kleister", "kleistre", "klierest", "kreiselt", "kriselte", "reliktes"],
["besieget", "besiegte", "besteige", "bestiege", "gebietes", "gesiebte"],
["tuscheln", "schulten", "luchsten", "lunchest", "lutschen", "nuschelt"],
["beiertet", "beitrete", "bereitet", "berietet", "breitete", "erbietet"],
["teigerer", "teeriger", "gerieret", "gerierte", "regieret", "regierte"],
["befreist", "befriste", "bereifst", "beriefst", "briefest", "fieberst"],
["teetisch", "siechtet", "sichtete", "seichtet", "scheitet", "eichtest"],
["tauschte", "tauschet", "tauchest", "stauchte", "stauchet", "schautet"],
["beeilten", "beteilen", "einlebet", "einlebte", "entleibe", "entliebe"],
["tristere", "triester", "streiter", "riestert", "errietst", "erstreit"],
["ziertest", "triezest", "striezte", "striezet", "ersitzet", "reiztest"],
["tatschen", "schatten", "anstecht", "chattens", "entascht", "naschtet"],
["retabeln", "alberten", "erlabten", "laberten", "rentabel", "rentable"],
["taschner", "schraten", "scharten", "anrechts", "chartens", "ratschen"],
["einlegst", "entgleis", "geilsten", "gleisten", "gleitens", "legisten"],
["triefens", "streifen", "feinster", "finstere", "freisten", "reifsten"],
["tandemer", "amtender", "artendem", "atmender", "maternde", "ratendem"],
["talmines", "sintemal", "anleimst", "maltesin", "melanits", "mitlasen"],
["vertrieb", "vertreib", "verriebt", "verreibt", "verbriet", "verbreit"],
["bauender", "bauernde", "bedauern", "brauende", "erbauend", "raubende"],
["auskernt", "ausrenkt", "knausert", "krausten", "krautens", "kurantes"],
["strichet", "streicht", "schritte", "richtest", "rettichs", "ersticht"],
["striches", "streichs", "sicherst", "schriest", "schreist", "estrichs"],
["rötesten", "rösteten", "entstöre", "ertönest", "ertöntes", "ertötens"],
["sagender", "erdgasen", "garendes", "gasender", "grasende", "ragendes"],
["ausbreit", "ausbriet", "ausreibt", "ausriebt", "austreib", "austrieb"],
["salbende", "ablesend", "beladens", "beladnes", "blasende", "labendes"],
["schalkte", "schalket", "hackelst", "kachelst", "kaschelt", "klatsche"],
["streamen", "steamern", "samtnere", "samtener", "maserten", "maternes"],
["strakten", "kanterst", "knastert", "krantest", "krattens", "ranktest"],
["witschen", "wischten", "wichtens", "wichsten", "switchen", "entwisch"],
["schiegte", "schieget", "gescheit", "geseicht", "gesichte", "gesiecht"],
["schirkte", "schirket", "kicherst", "kreischt", "kretisch", "kriechst"],
["schliefe", "schleife", "elfische", "feilsche", "fischele", "fleische"],
["aufliest", "aufliste", "ausfeilt", "ausfielt", "auslieft", "eislauft"],
["stieseln", "stielens", "senilste", "selenits", "entliess", "leistens"],
["stierend", "dereinst", "dienerst", "dreisten", "reistend", "resident"],
["schmante", "manschet", "manschte", "mantsche", "matschen", "meschant"],
["schnaube", "schauben", "absuchen", "anschube", "bauschen", "beschaun"],
["schniebe", "schieben", "scheiben", "beschein", "beschien", "beschnei"],
["transite", "anrietst", "anstiert", "artisten", "nitrates", "raintest"],
["armlehne", "ehrenmal", "erlahmen", "hamelern", "hamelner", "lahmeren"],
["anregten", "genanter", "gerannte", "geranten", "geratnen", "renntage"],
["seienden", "seidenen", "einendes", "einsende", "eisenden", "niesende"],
["steinige", "einigest", "einigste", "einsteig", "einstieg", "einstige"],
["anpreiet", "anpreite", "aptieren", "panieret", "panierte", "parteien"],
["seigerns", "gerissen", "gerissne", "giessern", "griessen", "ingresse"],
["anlasest", "anlasset", "atlassen", "atlassne", "elastans", "nasalste"],
["stegreif", "feigster", "fertiges", "festiger", "geiferst", "greifest"],
["zisterne", "zensiert", "triezens", "striezen", "setzerin", "ersitzen"],
["startete", "artetest", "erstatte", "ertastet", "rastetet", "ratetest"],
["seligere", "selegier", "geileres", "geleiers", "geriesel", "griesele"],
["stachelt", "schaltet", "lachtest", "laschtet", "latschet", "latschte"],
["ankertet", "entreakt", "kanterte", "karetten", "karteten", "knattere"],
["siechend", "seichend", "schneide", "schieden", "scheiden", "deichens"],
["angeregt", "gegarten", "genagter", "getragen", "getragne", "regentag"],
["sprachen", "schrapen", "ansprech", "panscher", "paschern", "rapschen"],
["spinates", "anpisset", "anpisste", "anspeist", "anspiest", "einpasst"],
["spiebest", "speibest", "bepisset", "bepisste", "bespeist", "bespiest"],
["angelnde", "anlegend", "geladnen", "landenge", "langende", "nagelnde"],
["ametrien", "amtieren", "anmeiert", "emaniert", "emiraten", "materien"],
["skaterin", "riskante", "kanister", "keratins", "kreatins", "nearktis"],
["rangieret", "rangierte", "tragieren", "tranigere", "arteigner", "artigeren", "enragiert", "garnieret", "garnierte", "gerainter", "geriatern", "granieret", "granierte"],
["nagetiers", "seenartig", "stagniere", "angereist", "arteignes", "einsarget", "einsargte", "eintrages", "gasierten", "gastieren", "geraintes", "inertgase"],
["reichsten", "scheitern", "schreiten", "sicherten", "streichen", "einschert", "enterichs", "entsicher", "entsichre", "erscheint", "erschient", "estrichen"],
["negierest", "negiertes", "seigerten", "ereignest", "ersteigen", "erstiegen", "erstiegne", "genierest", "geniertes", "gereisten", "geriesten"],
["lederigen", "legierend", "liegender", "niederleg", "riegelnde", "elendiger", "erledigen", "erliegend", "geilender", "gelierend", "gelindere"],
["seigertet", "steigerte", "stetigere", "teerigste", "teigreste", "ersteiget", "erstieget", "geisterte", "gereistet", "gerietest", "gestreite"],
["leichters", "lichteres", "restliche", "rischelte", "schlieret", "schlierte", "streichel", "streichle", "strichele", "tischlere"],
["legierest", "legiertes", "selegiert", "striegele", "erliegest", "gelierest", "geliertes", "gerieselt", "geseilter", "grieselte"],
["schiebern", "schreiben", "schrieben", "bernische", "beschrein", "beschrien", "besichern", "bierchens", "brieschen", "erbschein"],
["nierigste", "reinigest", "signieret", "signierte", "steigerin", "steiniger", "stierigen", "einigster", "einstiger"],
["nordseite", "serientod", "sondieret", "sondierte", "steroiden", "desertion", "dosierten", "dotierens", "drosteien"],
["resinaten", "sanierten", "stearinen", "anreisten", "anstieren", "antiseren", "astreinen", "einrasten", "inseraten"],
["panierest", "paniertes", "septarien", "anpreiest", "anpreiset", "anprieset", "aptierens", "einsparet", "einsparte"],
["schreibet", "schriebet", "berichtes", "beriechst", "beschreit", "beschriet", "besichert", "bestreich", "bestriche"],
["regierest", "regiertes", "steigerer", "ersteiger", "ersteigre", "gereisert", "gereister", "gerierest", "geriester"],
["siegelten", "einlegest", "entgleise", "entsiegel", "entsiegle", "geleintes", "geleitens", "genieselt", "geseilten"],
["beeifernd", "befiedern", "befreiend", "befrieden", "bereifend", "briefende", "erbfeinde", "federbein", "fiebernde"],
["negierend", "neigender", "eignender", "ereignend", "genierend", "gierenden", "greinende", "grienende"],
["bereutest", "besteuert", "bestreuet", "bestreute", "beteuerst", "betreuest", "betreutes", "erbeutest"],
["lagernden", "landregen", "langender", "nagelnder", "rangelnde", "angelnder", "endlagern", "erlangend"],
["reifender", "riefender", "eifernder", "ereifernd", "feiernder", "fierender", "freiender", "frierende"],
["reifendes", "riefendes", "seifender", "seifernde", "eiferndes", "feierndes", "fierendes", "freiendes"],
["negierter", "regierten", "terrigene", "egreniert", "generiert", "genierter", "gerierten", "integrere"],
["saniertem", "seitenarm", "amnestier", "amtierens", "anmeierst", "astreinem", "einmaster", "emanierst"],
["niederste", "reistende", "reitendes", "sedierten", "stierende", "einredest", "eiterndes", "identeres"],
["schraubet", "schraubte", "tarbusche", "abrutsche", "ausbrecht", "baurechts", "berauscht", "brauchest"],
["leidesten", "leistende", "leitendes", "siedelten", "stielende", "teilendes", "dieselten", "edelstein"],
["seibertet", "beiertest", "bereistet", "bereitest", "berietest", "bestreite", "breiteste", "erbietest"],
["leiertest", "leisetret", "rieseltet", "eitelster", "ereiltest", "erlistete", "erteilest", "erteiltes"],
["seitenbau", "taubeneis", "ausbeinet", "ausbeinte", "ausbieten", "bausteine", "einbauest", "einstaube"],
["lettische", "lichteste", "scheitelt", "schieltet", "sicheltet", "stichelte", "stilechte", "teelichts"],
["abgeldern", "abregelnd", "balgender", "belagernd", "berglande", "gabelnder", "gaberlnde", "geberland"],
["ableisten", "ableitens", "abseilten", "abteilens", "anblieset", "einblaset", "einsalbet", "einsalbte"],
["legierten", "reinleget", "reinlegte", "riegelten", "entriegel", "entriegle", "geleinter", "gelierten"],
["reifenden", "riefenden", "eifernden", "feiernden", "feinender", "fierenden", "freienden"],
["nietender", "reitenden", "rindentee", "tendieren", "dienerten", "eiternden", "identeren"],
["resinates", "sanierest", "saniertes", "anreisest", "anreisset", "astreines", "inserates"],
["revierest", "servieret", "servierte", "vereister", "verreiset", "verreiste", "versierte"],
["revierten", "vereinter", "vereitern", "verreiten", "verrieten", "vertieren", "enerviert"],
["nitschele", "scheiteln", "schielten", "schneitel", "schneitle", "sichelten", "teilchens"],
["saniertet", "statieren", "anreistet", "anrietest", "anstieret", "anstierte", "einrastet"],
["scheibten", "schniebet", "schniebte", "beichtens", "bescheint", "beschient", "beschneit"],
["scheitend", "schindete", "schneidet", "sichtende", "tischende", "entscheid", "entschied"],
["nacheifer", "nacheifre", "nachfeier", "nachfeire", "nachreife", "nachriefe", "einfacher"],
["schindere", "schneider", "schneidre", "schreiend", "sichernde", "drieschen", "eindresch"],
["schleifet", "schleifte", "schliefet", "feilschet", "feilschte", "festliche", "fischelte"],
["langseite", "angeseilt", "anliegest", "einglaset", "einglaste", "genialste", "genitales"],
["lavierest", "laviertes", "relatives", "salvieret", "salvierte", "versatile", "vitaleres"],
["ratschten", "schnatter", "schnattre", "schratten", "tartschen", "trachtens", "tratschen"],
["rauschest", "schauerst", "schauster", "stauchers", "strauches", "ausschert", "erschaust"],
["besorgten", "betrognes", "geborsten", "geborstne", "gestobner", "gestorben", "gestorbne"],
["reichsabt", "sichtbare", "tabischer", "abschreit", "absichert", "abstreich", "abstriche"],
["stedinger", "steigernd", "tigerndes", "trendiges", "designter", "erdigsten", "geisternd"],
["tibetaner", "anbrietet", "antreibet", "antriebet", "batterien", "beitraten", "einbratet"],
["treibende", "bedienter", "bereitend", "biederten", "bietender", "breitende", "erbietend"],
["verbreite", "verbriete", "verreibet", "verriebet", "vertreibe", "vertriebe", "brevetier"],
["liedchens", "schielend", "schindele", "sichelnde", "deichseln", "delischen", "endliches"],
["nesttreue", "neuertest", "steuerten", "teuersten", "treuesten", "unstetere", "erneutest"],
["abreisten", "abreitens", "absentier", "anbieters", "antriebes", "arbeitens", "basierten"],
["miefender", "reifendem", "riefendem", "eiferndem", "feierndem", "fierendem", "freiendem"],
["begeister", "begeistre", "besiegter", "gebieters", "geseibert", "gesiebter", "getriebes"],
["mietender", "reitendem", "dementier", "demeriten", "eiterndem", "emendiert", "identerem"],
["besiegten", "besteigen", "bestiegen", "bestiegne", "eingebest", "gebietens", "gesiebten"],
["rundbeete", "beteuernd", "betreuend", "betuender", "beutender", "erbeutend"],
["scheinest", "scheitens", "schienest", "schneiest", "siechsten", "estnische"],
["raschelst", "schalster", "schalters", "schralest", "schralste", "tascherls"],
["ratschest", "schartest", "schrattes", "tratsches", "crashtest", "erstachst"],
["schiegten", "teschinge", "genetisch", "geschient", "geschneit", "gesichten"],
["leideners", "leierndes", "rieselnde", "seilender", "sielender", "erleidens"],
["nastuches", "schausten", "stauchens", "sutaschen", "tauschens", "ansuchest"],
["schortest", "schotters", "schrotest", "schrottes", "stocherst", "storchest"],
["keratinen", "nektarien", "nektarine", "annektier", "antikeren", "einaktern"],
["reibendes", "seibernde", "siebender", "bedieners", "beierndes", "bereisend"],
["seiberten", "siebenter", "beniester", "bereisten", "bereitens", "erbietens"],
["knetbaren", "aberkennt", "bankerten", "bekannter", "berankten", "betranken"],
["leitender", "teilender", "trielende", "dentelier", "erdteilen", "erteilend"],
["leitgeben", "begleiten", "beilegten", "eingelebt", "gebleiten", "geliebten"],
["kramenden", "kranendem", "markenden", "rankendem", "ankerndem", "anmerkend"],
["siegeltet", "geleistet", "geleitest", "gelistete", "gestielte", "geteiltes"],
["stagniert", "strategin", "tangierst", "tranigste", "argentits", "artigsten"],
["staubfrei", "aufbriset", "aufbriste", "aufreibst", "aufriebst", "auftriebs"],
["libanesen", "anbliesen", "balinesen", "biennales", "einblasen", "einsalben"],
["steiniges", "eingiesst", "einigstes", "einstiegs", "einstiges", "eisigsten"],
["steiniget", "steinigte", "einigtest", "einsteigt", "einstiegt", "einteigst"],
["stiebende", "bedienest", "bedientes", "benedeist", "beneidest", "bietendes"],
["strategie", "agiertest", "gasiertet", "gastieret", "gastierte", "gasttiere"],
["tangieret", "tangierte", "tantigere", "aigretten", "eintraget", "gattieren"],
["teilhaben", "abheilten", "abhielten", "anbehielt", "beinhalte", "einbehalt"],
["reizendes", "sezierend", "siezender", "zedierens", "zeisender", "zierendes"],
["tieferleg", "freileget", "freilegte", "gefeilter", "geliefert", "geriefelt"],
["legierens", "seleniger", "seligeren", "einlegers", "erliegens", "gelierens"],
["ungeraten", "ungeratne", "ungetaner", "agenturen", "gaunerten", "geraunten"],
["untersage", "ausregnet", "genauster", "gerauntes", "getrauens", "grauesten"],
["verbleiet", "verbleite", "verleibet", "verleibte", "verliebet", "verliebte"],
["labeltest", "abstellet", "abstellte", "ballettes", "bestallet", "bestallte"],
["verheilet", "verheilte", "verhielte", "verleihet", "verliehet", "helvetier"],
["verholest", "verholtes", "verlohest", "verlohtes", "versohlet", "versohlte"],
["verholten", "verlohnet", "verlohnte", "verlohten", "vorlehnet", "vorlehnte"],
["abderiten", "abreitend", "anbiedert", "arbeitend", "bardieten", "darbieten"],
["laberndes", "salbender", "selbander", "ablederns", "alberndes", "blasender"],
["abgeltens", "belangest", "belangtes", "benagelst", "gebanselt", "gesalbten"],
["renegatin", "tangieren", "arteignen", "eintragen", "gerainten", "granitene"],
["reviertet", "vereitert", "verreitet", "verrietet", "vertieret", "vertierte"],
["abreistet", "abreitest", "abrietest", "abstreite", "arbeitest", "basiertet"],
["abweichst", "abwichest", "abwichset", "abwichste", "abwischet", "abwischte"],
["alteisens", "anliesset", "anseilest", "einlasest", "einlasset", "essential"],
["aufbereit", "aufbriete", "aufreibet", "aufriebet", "auftreibe", "auftriebe"],
["ausbreite", "ausbriete", "ausreibet", "ausriebet", "austreibe", "austriebe"],
["riesterst", "stierster", "streiters", "tressiert", "triesters", "tristeres"],
["beeiferst", "befreiest", "befreites", "bereifest", "bereiftes", "beriefest"],
["kantendes", "skatenden", "stakenden", "tankendes", "andenkest", "dantesken"],
["beilegest", "beseliget", "beseligte", "besiegelt", "gebleites", "geliebtes"],
["berentest", "besternte", "betretens", "betretnes", "enterbest", "enterbtes"],
["prustende", "pustender", "spurtende", "sputender", "stupender", "endspurte"],
["rangehest", "ehrengast", "ehrentags", "gesahnter", "hagersten", "hersagten"],
["nadeliger", "nadligere", "adligeren", "anglieder", "angliedre", "dreiangel"],
["beteilten", "einlebtet", "entleibet", "entleibte", "entliebet", "entliebte"],
["ergreifet", "gefierter", "gefreiter", "gefrieret", "gereifter", "geriefter"],
["erzeigest", "erzeigtes", "gereiztes", "gesiezter", "gezeister", "geziertes"],
["gefeinter", "gefierten", "gefreiten", "geiferten", "gereiften", "gerieften"],
["gefiertes", "gefreites", "gereiftes", "gerieftes", "geseifert", "geseifter"],
["gestrichene", "gestenreich", "gesicherten", "genetischer", "energetisch"],
["taschenbier", "steinbacher", "abstreichen", "abschreiten"]
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

for (var i=0;i<paths.length;i++){
	console.log(paths[i]);
}
// fs.writeFileSync(`output/dot/overlaps_en_big.dot`, text[0]);
// exec(`dot -Tpng output/dot/overlaps_en_big.dot > output/png/overlaps_en_big.png`);
