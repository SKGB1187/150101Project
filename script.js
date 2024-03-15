const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');
const clearInput = document.querySelector("#clearButton");

const fruit = [
    'Apple 🍎', 'Apricot 🍑', 'Avocado 🥑', 'Banana 🍌', 'Bilberry 🫐', 'Blackberry 🫐', 
	'Blackcurrant 🍇', 'Blueberry 🫐', 'Boysenberry 🫐', 'Currant 🍇', 'Cherry 🍒', 
	'Coconut 🥥', 'Cranberry 🍒', 'Cucumber 🥒', 'Custard apple 🍏', 'Damson 🍇',
    'Date 🍑', 'Dragonfruit 🐉🍓', 'Durian 🍈', 'Elderberry 🍇', 'Feijoa 🍈', 'Fig 🪴', 
	'Gooseberry 🫐', 'Grape 🍇', 'Raisin 🍇', 'Grapefruit 🍊', 'Guava 🍈', 'Honeyberry 🍇',
	'Huckleberry 🫐', 'Jabuticaba 🍇', 'Jackfruit 🍈', 'Jambul 🍇', 'Juniper berry 🍇',
    'Kiwifruit 🥝', 'Kumquat 🍊', 'Lemon 🍋', 'Lime 🍋', 'Loquat 🍈', 'Longan 🍇', 
	'Lychee 🍇', 'Mango 🥭', 'Mangosteen 🍇', 'Marionberry 🫐', 'Melon 🍈', 'Cantaloupe 🍈',
	'Honeydew 🍈', 'Watermelon 🍉', 'Miracle fruit 🍇', 'Mulberry 🫐', 'Nectarine 🍑',
    'Nance 🍇', 'Olive 🫒', 'Orange 🍊', 'Clementine 🍊', 'Mandarine 🍊', 'Tangerine 🍊', 
	'Papaya 🍈', 'Passionfruit 🍇', 'Peach 🍑', 'Pear 🍐', 'Persimmon 🍅', 'Plantain 🍌', 
	'Plum 🍑', 'Pineapple 🍍', 'Pomegranate 🍎', 'Pomelo 🍋', 'Quince 🍐', 'Raspberry 🍇', 
	'Salmonberry 🫐', 'Rambutan 🍇', 'Redcurrant 🍒', 'Salak 🍇', 'Satsuma 🍊', 
	'Soursop 🍇', 'Star fruit ⭐', 'Strawberry 🍓', 'Tamarillo 🍅', 'Tamarind 🍋', 'Yuzu 🍋'
]
/*search function - takes user input and values from array to generate an array of values 
with matching strings*/
function search(inputVal, fruit) {
	const results = [];
	const searchExp = new RegExp(inputVal, "i");

	fruit.forEach((val) => {
		if (searchExp.test(val)) {
			results.push(val);
		}
	});
	return results;
}

/*searchHandler function - takes the input value and the output from the search function
then returns the suggestions from the showSuggestions function */
function searchHandler(e) {
	const inputVal = input.value;
	const searchResults = search(inputVal, fruit);

	if(searchResults.length === 0){
		noMatch();
	} else {
		showSuggestions(searchResults);
	}
}

/*noMatch function returns No Match Found if string does not match a string in the array */
function noMatch(){
	suggestions.innerHTML = "<li>No Match Found</li>";
}
/*showSuggestions function creates an unordered list item for each result returned*/
function showSuggestions(results) {
	suggestions.innerHTML = "";

	results.forEach((result) => {
		const listItem = document.createElement("li");
		listItem.textContent = result;
		suggestions.appendChild(listItem);
	})
}
/*useSuggestion function works with the suggestions event handler*/
function useSuggestion(e) {
	if (e.target.tagName === "LI"){
		if(e.target.textContent === "No Match Found"){
		} else {
		input.value = e.target.textContent;
		}
		suggestions.innerHTML = "";
	}
}
/*clean view functions */
	/* this will hide the suggestions dropdown works with document event listener */
function hideSuggestions(){
	suggestions.innerHTML = "";
}
	/*this will clear the page, works with the clearButton event listener */
function clearInputFunction(){
	input.value = "";
	suggestions.innerHTML = "";
}

/*input event listeners*/
	/*keyup allows for dynamic updates to the input */
input.addEventListener('keyup', searchHandler);
	/* focus is used when the user focuses on the text input field*/
input.addEventListener('focus', function () {
	const inputVal = input.value;
	const searchResults = search(inputVal, fruit);

	showSuggestions(searchResults);
});

/*suggestions event listener */
	/*this fills the text input with the selected suggestion */
suggestions.addEventListener('click', useSuggestion);

/*clear event listener */
	/*this will clear the text input for new searches */
clearButton.addEventListener('click', clearInputFunction);

/*document event listener */
	/*if you click outside of the input, button or suggestions dropdown it will hide the 
	dropdown */
document.addEventListener("click", function(e){
	const clickedInput = input.contains(e.target);
	const clickedSuggestions = suggestions.contains(e.target);

	if(!clickedInput && !clickedSuggestions){
		hideSuggestions();
	}
})