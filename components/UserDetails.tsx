import useSWR from 'swr'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { fetcher } from 'utils/fetcher'
import { IUser } from 'types/user'

export const UserDetails = () => {
  const router = useRouter()
  const { id } = router.query

  console.log('id : ', id)

  const { data: user, error } = useSWR<IUser>(
    id ? `https://jsonplaceholder.typicode.com/users/${id}` : null,
    fetcher,
    {
      dedupingInterval: 1000 * 60 * 60,
    }
  )

  if (error) return <div>failed to load</div>
  if (!user) return <div>loading...</div>

  console.log('user : ', user)

  return (
    <>
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">User Details</h1>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-4">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="https://bulma.io/images/placeholders/1280x960.png"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">{user.name}</p>
                      <p className="subtitle is-6">{user.username}</p>
                    </div>
                  </div>
                  <div className="content">
                    <p>{user.website}</p>
                    <p>{user.phone}</p>
                    <p>{user.email}</p>
                    {/* <button onClick={() => router.push('/users')}>Home</button> */}
                  </div>
                </div>
                <footer className="card-footer">
                  <Link href="/users">
                    <a className="card-footer-item">Go Home</a>
                  </Link>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/* import axios from 'axios'
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
} */

/* export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /users/1, then params.id is 1
  const user = (
    await axios.get<IUser>(
      `https://jsonplaceholder.typicode.com/users/${params.id}`
    )
  ).data

  // if (!user) {
  //  return {
  //    notFound: true,
  //  }
  //}

  // Pass user data to the page via props
  return { props: { user } }
} */

/* export async function getStaticPaths() {
  const users = (
    await axios.get<IUser[]>(
      'https://jsonplaceholder.typicode.com/users?_page=1'
    )
  ).data

  return {
    paths: [],
    fallback: false,
  }
} */

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
