import axios from 'axios'
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
