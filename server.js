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
