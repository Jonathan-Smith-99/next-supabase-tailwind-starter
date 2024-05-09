import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { logOut } from './actions'

export default async function PrivatePage() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    throw new Error('An error occurred while fetching user data')
  }
  return (
    <div>
      <h1>Private Page</h1>
      {/* // given_name is a field that is not present in the default user object
      // you can add custom fields to the user object using auth.updateUser()
      // alternatively, a public.users table could be created to store user data */}
      <p>Hello, {data?.user?.user_metadata?.given_name || 'Felicity Bancroft'}!</p>
      <form>
        <button formAction={logOut}
          className="rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
        >
          Log Out
        </button>
      </form>
    </div>
  )
}