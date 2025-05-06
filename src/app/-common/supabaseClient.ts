import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lebbgxicitnfzmsvdepo.supabase.co'
//FIXME: перенести в переменную import.meta.env.VITE_SUPABASE_KEY
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlYmJneGljaXRuZnptc3ZkZXBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5OTc3MTYsImV4cCI6MjA1ODU3MzcxNn0.TER-liRtcBn2Q-j3rmM6lBcWBO9EQiaKSZMCf1zxIq4'

const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }
