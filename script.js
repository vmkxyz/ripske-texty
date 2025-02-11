document.addEventListener("DOMContentLoaded", () => {
	fetch("words.txt")
		.then(response => response.text())
		.then(data => {
			const dictionaryDiv = document.getElementById("dictionary");
			const words = data.trim().split("\n\n"); // Words are separated by a blank line

			// Parse entries and store in an array
			const entries = words.map(entry => {
				const lines = entry.split("\n");
				return {
					word: lines[0].trim(),
					definition: lines[1]?.trim() || "No definition available.",
					example: lines[2]?.trim() || ""
				};
			});

			// Sort entries alphabetically by word
			entries.sort((a, b) => a.word.localeCompare(b.word));

			// Render sorted words
			entries.forEach(({ word, definition, example }) => {
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
		})
		.catch(error => console.error("Error loading dictionary:", error));
});
