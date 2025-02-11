document.addEventListener("DOMContentLoaded", () => {
	const dictionaryDiv = document.getElementById("dictionary");
	const searchInput = document.getElementById("search");
	let entries = [];

	fetch("words.txt")
		.then(response => response.text())
		.then(data => {
			const words = data.trim().split("\n\n"); // Words are separated by a blank line

			// Parse entries and store in an array
			entries = words.map(entry => {
				const lines = entry.split("\n");
				return {
					word: lines[0].trim(),
					definition: lines[1]?.trim() || "No definition available.",
					example: lines[2]?.trim() || ""
				};
			});

			// Sort entries alphabetically
			entries.sort((a, b) => a.word.localeCompare(b.word));

			// Render all words initially
			renderDictionary(entries);
		})
		.catch(error => console.error("Error loading dictionary:", error));

	// Function to render words
	function renderDictionary(words) {
		dictionaryDiv.innerHTML = ""; // Clear previous content

		words.forEach(({ word, definition, example }) => {
			const wordDiv = document.createElement("div");
			wordDiv.classList.add("word");

			const wordTitle = document.createElement("h2");
			wordTitle.textContent = word;

			const wordDefinition = document.createElement("p");
			wordDefinition.textContent = definition;

			wordDiv.appendChild(wordTitle);
			wordDiv.appendChild(wordDefinition);

			if (example) {
				const exampleSentence = document.createElement("p");
				exampleSentence.style.fontStyle = "italic";
				exampleSentence.textContent = `Example: ${example}`;
				wordDiv.appendChild(exampleSentence);
			}

			dictionaryDiv.appendChild(wordDiv);
		});
	}

	// Search function
	searchInput.addEventListener("input", () => {
		const query = searchInput.value.toLowerCase();
		const filteredEntries = entries.filter(({ word }) => word.toLowerCase().includes(query));
		renderDictionary(filteredEntries);
	});
});
