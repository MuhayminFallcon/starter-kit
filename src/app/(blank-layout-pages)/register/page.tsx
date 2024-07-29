// Next Imports
import type { Metadata } from 'next'

// Component Imports
import Register from '@views/register'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata: Metadata = {
  title: 'register',
  description: 'register to a new account'
}

const RegisterPage = () => {
  // Vars
  const mode = getServerMode()

  return <Register mode={mode} />
}

export default RegisterPage
