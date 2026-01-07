-- Create the campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  reward TEXT,
  token TEXT DEFAULT 'ETH',
  image TEXT,
  difficulty INTEGER DEFAULT 1,
  total_spots INTEGER DEFAULT 5,
  joined INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  type TEXT DEFAULT 'public', -- 'public' or 'private'
  creator_address TEXT,
  tags TEXT[] DEFAULT '{}'::TEXT[]
);

-- Enable Row Level Security (RLS)
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Create policies (open for MVP, restrict in production)
CREATE POLICY "Enable read access for all users" ON campaigns
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON campaigns
  FOR INSERT WITH CHECK (true);

-- Optional: Create a storage bucket for proof images
-- insert into storage.buckets (id, name) values ('proofs', 'proofs');
-- create policy "Public Access" on storage.objects for select using ( bucket_id = 'proofs' ); 
-- create policy "Upload Access" on storage.objects for insert with check ( bucket_id = 'proofs' );
