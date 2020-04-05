import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Link as MuiLink } from '@material-ui/core'

const GatsbyLinkWrapper = ({ href, ...props }) => (
  <GatsbyLink to={href} {...props} />
)

export default (props) => {
  return <MuiLink {...props} component={GatsbyLinkWrapper} />
}
