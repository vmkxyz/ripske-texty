document.addEventListener("DOMContentLoaded", () => {
	fetch("words.txt")
		.then(response => response.text())
		.then(data => {
			const dictionaryDiv = document.getElementById("dictionary");
			const words = data.trim().split("\n\n"); // Words are separated by a blank line

			words.forEach(entry => {
				const lines = entry.split("\n");
				const word = lines[0].trim();
				const definition = lines[1]?.trim() || "No definition available.";
				const example = lines[2]?.trim() || "";

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
