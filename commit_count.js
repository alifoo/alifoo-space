import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_ANON_KEY
);

export async function GET() {
	const { data, error } = await supabase
		.from("commit_counter")
		.select("total_commits")
		.limit(1)
		.single();

	if (error) {
		return new Response(JSON.stringify({ total_commits: 0 }), {
			status: 500,
		});
	}

	return new Response(JSON.stringify(data), {
		headers: { 'Content-Type': 'application/json' },
	});
}

