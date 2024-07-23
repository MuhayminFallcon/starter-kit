// React Imports
import type { SVGAttributes } from 'react'

const Logo = (props: SVGAttributes<SVGElement>) => {
  return (
    <img 
    src="/morabaa_logo.jpeg" 
    alt="Logo"
    {...props}
    height="45"
    width="45"
    style={{
       borderRadius: '11px'
    }}
  />
  )
}

export default Logo
