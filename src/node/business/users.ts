import type { collections } from 'src/node/lib/firebase-admin'

export const getUserById = (
  userId: string,
  usersCollection: typeof collections.users
) => {
  return usersCollection.doc(userId).get()
}
