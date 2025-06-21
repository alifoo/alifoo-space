import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
	const { data, error } = await supabase
		.from("commit_counter")
		.select("total_commits")
		.limit(1)
		.single();

	if (error || !data) {
		return res.status(500).json({ total_commits: null });
	}

	res.status(200).json(data);
}
