import React, { forwardRef } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Link as MuiLink } from '@material-ui/core'

const GatsbyLinkWrapper = forwardRef(({ href, ...props }, ref) => (
  <GatsbyLink ref={ref} to={href} {...props} />
))

export default (props) => {
  return <MuiLink {...props} component={GatsbyLinkWrapper} />
}
