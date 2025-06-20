const commitCounterElement = document.getElementById("commit-counter");

async function fetchCommitCount() {
	try {
		const response = await fetch("/api/get-commit-count");
		const data = await response.json();
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
