interface Props {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  // TODO: replace with real auth check when auth is built
  const isAuthenticated = false

  if (isAuthenticated) {
    return <>{children}</>
  }
  return <div>You must be logged in to view this page.</div>
}

export default ProtectedRoute