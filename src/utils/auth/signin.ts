import { supabase } from "./connect";

export default async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if(error) return error;
}
