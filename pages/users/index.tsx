import axios from 'axios'

interface IUser {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
}

interface IUserProps {
  users: IUser[]
}

export default function Users({ users }: IUserProps) {
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
  // Call an external API endpoint to get posts
  const users = await (
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
