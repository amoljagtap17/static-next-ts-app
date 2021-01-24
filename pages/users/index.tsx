import useSWR from 'swr'
import Link from 'next/link'
import { fetcher } from 'utils/fetcher'
import { IUser } from 'types/user'

export default function Users() {
  const { data: users, error } = useSWR<IUser[]>(
    'https://jsonplaceholder.typicode.com/users',
    fetcher
  )

  if (error) return <div>failed to load</div>
  if (!users) return <div>loading...</div>

  console.log('users : ', users)

  return (
    <>
      <h1>Users:</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${encodeURIComponent(user.id)}`}>
              <a>{user.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

/* import axios from 'axios'
import { InferGetStaticPropsType } from 'next'
import { IUser } from 'types/user'

export default function Users({
  users,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('users', users)

  return (
    <>
      <h1>Users:</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get users
  const users = (
    await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
  ).data

  // By returning { props: { users } }, the User component
  // will receive `users` as a prop at build time
  return {
    props: {
      users,
    },
  }
}
 */
