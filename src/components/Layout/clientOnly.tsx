/**
 * This file comes from a post written by hdoshi2,
 * regarding an issue related to server-side VS client-side rendering
 * for using Material UI with Next.js :
 * https://github.com/mui/material-ui/issues/15073
 */
import React, { PropsWithChildren } from 'react'

const ClientOnly = ({ children, ...delegated }: PropsWithChildren<any>) => {
  const [hasMounted, setHasMounted] = React.useState(false)

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null

  return <React.Fragment {...delegated}>{children}</React.Fragment>
}

export default ClientOnly
