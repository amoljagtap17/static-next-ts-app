import axios from 'axios'
import { useRouter } from 'next/router'
import { InferGetStaticPropsType } from 'next'
import { IUser } from 'types/user'

export default function User({
  user,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>User Details : </h1>
      <p>Name : {user.name}</p>
      <p>Username: {user.username}</p>
      <p>Phone : {user.phone}</p>
      <p>Email : {user.email}</p>
    </>
  )
}

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /users/1, then params.id is 1
  const user = (
    await axios.get<IUser>(
      `https://jsonplaceholder.typicode.com/users/${params.id}`
    )
  ).data

  /* if (!user) {
    return {
      notFound: true,
    }
  } */

  // Pass user data to the page via props
  return { props: { user } }
}

export async function getStaticPaths() {
  const users = (
    await axios.get<IUser[]>(
      'https://jsonplaceholder.typicode.com/users?_page=1'
    )
  ).data

  /* return {
    paths: users.map((user) => {
      return {
        params: {
          id: `${user.id}`,
        },
      }
    }),
    fallback: false,
  } */

  return {
    paths: [],
    fallback: false,
  }
}
