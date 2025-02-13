import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = 'https://uacdxoiknniqssvfsjon.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhY2R4b2lrbm5pcXNzdmZzam9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU1MzIxNDIsImV4cCI6MjA0MTEwODE0Mn0.edEO2uxWaWCGAWhWZtBy45RlHHqL1-LQKzWWF3xZ2gE"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;