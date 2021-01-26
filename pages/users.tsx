import { useRouter } from 'next/router'
import { UserDetails, UserList } from 'components'

export default function Users() {
  const router = useRouter()
  const { id } = router.query

  return id ? <UserDetails /> : <UserList />
}
