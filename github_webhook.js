import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  const payload = await req.json();

  const commitCount = payload.commits?.length || 0;

  if (commitCount === 0) {
    console.log("No commits found, exiting.");
    return new Response("No commits", { status: 200 });
  }

  const { error } = await supabase.rpc("increment_commit_count", {
    num: commitCount,
  });

  if (error) {
    console.error("Supabase error:", error);
    return new Response("Error", { status: 500 });
  }

  console.log("Commit count updated successfully.");
  return new Response("OK", { status: 200 });
}



