import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'



export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
  return (
    <>
      <header className='w-full sticky'>
        <div className='py-2 font-bold bg-purple-950 text-center text-xs'>
          This is a protected page that you can only see as an authenticated user
        </div>
      </header>

      <main>
        {children}
      </main>
    </>
  );
}
