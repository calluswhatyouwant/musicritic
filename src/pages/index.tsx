import { signIn, signOut, useSession } from 'next-auth/client'

export default function Home() {
  const [session, loading] = useSession()

  return (
    <>
      <h1>Musicritic</h1>
      {!loading && session?.user && <p>Logado como {session?.user?.name}</p>}
      {!loading && !session?.user && (
        <button onClick={() => signIn('spotify', { redirect: false })}>
          Login
        </button>
      )}
      {!loading && session?.user && (
        <button onClick={() => signOut()}>Logout</button>
      )}
    </>
  )
}
