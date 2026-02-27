import { createClient } from '@supabase/supabase-js'

// These lines look for the secret keys in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// This creates the "Truck" that will carry your registration data to Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)