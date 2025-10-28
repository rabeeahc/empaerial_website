import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// 🟢 Handle GET request — fetch all projects
export async function GET() {
  try {
    const { data, error } = await supabase.from('Projects').select('*')
    if (error) throw error
    return new Response(JSON.stringify(data), { status: 200 })
  } catch (error) {
    console.error('GET error:', error.message)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}

// 🟠 Handle POST request — add new project
export async function POST(request) {
  try {
    const body = await request.json()
    const { data, error } = await supabase.from('Projects').insert([body])
    if (error) throw error
    return new Response(JSON.stringify(data), { status: 200 })
  } catch (error) {
    console.error('POST error:', error.message)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}
