var markov = new Object();
var exported = 'https://raw.githubusercontent.com/jamiegavis/destiny-lore/master/model.json';

fetch(exported)
	.then(response => response.json())
	.then(data => JSON.parse(data["chain"]))
	.then(model => buildMarkov(model));
	//.then(_ => sentence.push(step("___BEGIN__,___BEGIN__"))) works but promises issue

var ranInt = (maximum) => Math.floor(Math.random()*maximum);

var buildMarkov = (m) => { 
	var rolling
	for (let i = 0; i < m.length; i++) {
		rolling = 0 
		markov[m[i][0]] = []
		for (let [key,value] of Object.entries(m[i][1])) {
			rolling += value
			markov[m[i][0]].push([rolling, key])	//memory concerns?		
		}
	}
}; 

var step = (state) => {
	var rand = ranInt(markov[state][markov[state].length-1][0])
	for (let i = 0; i < markov[state].length; i++) {
		if (rand < markov[state][i][0]) return markov[state][i][1]
	}	 
};

var walk = (start) => {
	var sentence = ["___BEGIN__"]
	sentence.push(step(start))
	while (sentence[sentence.length-1] !== "___END__") {
		console.log(sentence)
		var state = sentence.slice(sentence.length-2).join(",")
		sentence.push(step(state))		
	}	
	return sentence
} 

