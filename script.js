/*important global variables */
	/*retrieves the user input from the text field*/
const input = document.querySelector('#fruit');
	/*provides a location to generate the dropdown entries*/
const suggestions = document.querySelector('.suggestions ul');
	/*connects to the clear button*/
const clearInput = document.querySelector("#clearButton");
	/*array that suggestions are pulled from*/
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
	/*create the empty string */
	const results = [];
	/*use a regular expression to take the input value and ignore case*/
	const searchExp = new RegExp(inputVal, "i");
	/*for each value in the fruit array, use the method test from the regular expression
	to determine if the input value is found in that value*/
	fruit.forEach((val) => {
		/*if the value is contained*/
		if (searchExp.test(val)) {
			/*add that value into the results array*/
			results.push(val);
		}
		/*otherwise do nothing*/
	});
	/*once the results array is populated truncate it down to 10 values*/
	return results.slice(0,11);
}

/*searchHandler function - takes the input value and the output from the search function
then returns the suggestions from the showSuggestions function */
function searchHandler(e) {
	/*takes the user input value*/
	const inputVal = input.value;
	/*takes the ouput from the search function*/
	const searchResults = search(inputVal, fruit).slice(0,11);
	/*if the input does not match anything in the fruit array run the noMatch function */
	if(searchResults.length === 0){
		noMatch();
	/*otherwise take the input and run the showSuggestions function */
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
	/*sets the suggestions list to an empty string*/
	suggestions.innerHTML = "";
	/*using the results array and forEach method, creates an li for each result*/
	results.forEach((result) => {
		const listItem = document.createElement("li");
		/*sets the content of the list item to the result value*/
		listItem.textContent = result;
		/*appends each list item to the suggestions list*/
		suggestions.appendChild(listItem);
	})
}
/*useSuggestion function works with the suggestions event handler*/
function useSuggestion(e) {
	/*if the suggestion is clicked*/
	if (e.target.tagName === "LI"){
		if(e.target.textContent === "No Match Found"){

		} else {
		/*set the input value to the suggestion text*/
		input.value = e.target.textContent;
		}
		/*reset the suggestions to an empty string*/
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
	/*sets the input value to an empty string*/
	input.value = "";
	/*sets the suggestions to an empty string*/
	suggestions.innerHTML = "";
}

/*input event listeners*/
	/*keyup allows for dynamic updates to the input */
input.addEventListener('keyup', searchHandler);
	/* focus is used when the user focuses on the text input field*/
input.addEventListener('focus', function () {
	/*saves the user input*/
	const inputVal = input.value;
	/*uses the search function to generate suggestions*/
	const searchResults = search(inputVal, fruit);
	/*returns suggestions based on user input*/
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