import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).send("Method Not Allowed");
	}

	const payload = req.body;
	const commitCount = payload.commits?.length || 0;

	if (commitCount === 0) {
		return res.status(200).send("No commits");
	}

	const { error } = await supabase.rpc("increment_commit_count", {
		num: commitCount,
	});

	if (error) {
		return res.status(500).send("Error updating commit count");
	}

	res.status(200).send("OK");
}
