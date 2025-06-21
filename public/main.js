const commitCounterElement = document.getElementById("commit-counter");

async function fetchCommitCount() {
	try {
		//const response = await fetch("https://6cc0-2804-14c-87c0-ce8b-a1f3-46dd-a600-b93c.ngrok-free.app/api/get-commit-count");
		//const data = await response.json();
		const response = await fetch("/api/get-commit-count");
		console.log("Raw response:", response);
		const data = await response.json();
		console.log("Parsed data:", data);
		//		console.log("Fetched data:", data);
		if (data.total_commits != null) {
			commitCounterElement.textContent = `${data.total_commits}/999`;
		} else {
			commitCounterElement.textContent = "Failed to fetch commit count.";
		}
	} catch (error) {
		console.error("failed to fetch commit count:", error);
		commitCounterElement.textContent = "Failed to load commit count";
	}
}

fetchCommitCount();
