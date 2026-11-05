import { createClient } from '@supabase/supabase-js';

// .env.local ফাইল থেকে URL এবং API Key নিয়ে আসা হচ্ছে
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// যদি কোনো কারণে key মিসিং থাকে, তবে কনসোলে এরর দেখাবে
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL or Anon Key is missing in environment variables.');
}

// Supabase ক্লায়েন্ট তৈরি করা হলো, যা পুরো প্রজেক্টে ব্যবহৃত হবে
export const supabase = createClient(supabaseUrl, supabaseAnonKey);