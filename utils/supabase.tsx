
import { createClient } from '@supabase/supabase-js'

let URL = process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : "";
let API = process.env.NEXT_PUBLIC_KEY ? process.env.NEXT_PUBLIC_KEY : "";
 

export const supabase = createClient(URL, API);