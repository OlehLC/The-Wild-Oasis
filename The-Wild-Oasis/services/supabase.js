
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://ydyfxwumdqggxsnqfslx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkeWZ4d3VtZHFnZ3hzbnFmc2x4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NDgyOTcsImV4cCI6MjA3MDMyNDI5N30.CqjaYAcezc3M4HP5RR8sAl5lpJ_vFI23_yPoxomAALg'
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase