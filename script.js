document.addEventListener("DOMContentLoaded", () => {
	fetch("words.txt")
		.then(response => response.text())
		.then(data => {
			const dictionaryDiv = document.getElementById("dictionary");
			const words = data.trim().split("\n\n"); // Words are separated by a blank line

			words.forEach(entry => {
				const lines = entry.split("\n");
				const word = lines[0].trim();
				const definition = lines[1]?.