import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // We use the service role key to bypass RLS for incrementing the view count
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Call the RPC function 'increment_view'. We pass 'page_slug' as the argument.
    const { data, error } = await supabase.rpc('increment_view', { page_slug: slug });

    if (error) throw error;

    return NextResponse.json({ views: data });
  } catch (error) {
    console.error('Error incrementing view:', error);
    return NextResponse.json({ error: 'Failed to increment view' }, { status: 500 });
  }
}
