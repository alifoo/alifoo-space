import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.post("/github-webhook", async (req, res) => {
	const payload = req.body;

	const commitCount = payload.commits?.length || 0;

	if (commitCount === 0) {
		console.log("No commits found, exiting.");
		return res.status(200).send("No commits");
	}

	const { error } = await supabase.rpc("increment_commit_count", {
		num: commitCount,
	});

	if (error) {
		console.error("Supabase error:", error);
		return res.status(500).send("Error updating commit count");
	}

	console.log(`Commit count updated by ${commitCount}`);
	return res.status(200).send("OK");
});

app.get("/", (req, res) => {
	res.send("GitHub webhook listener is running.");
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});

app.get("/api/get-commit-count", async (req, res) => {
	const { data, error } = await supabase
		.from("commit_counter")
		.select("total_commits")
		.limit(1)
		.single();

	if (error || !data) {
		console.error("Error fetching commit count:", error);
		return res.status(500).json({ total_commits: null });
	}

	return res.json(data);
});
