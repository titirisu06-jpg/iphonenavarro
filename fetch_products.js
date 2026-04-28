import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xnsusvrxpmmpdymltwve.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhuc3VzdnJ4cG1tcGR5bWx0d3ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxMzI2MTQsImV4cCI6MjA4OTcwODYxNH0.v68KFcMu9do7rGHrS-56he-UOZhdnQzz1sRiOGW9bHI';
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase.from('products').select('*');
  if (error) console.error(error);
  else console.log(JSON.stringify(data, null, 2));
}

main();
