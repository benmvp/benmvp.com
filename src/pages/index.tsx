import React from 'react'
import { Typography } from '@material-ui/core'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import { getUrl } from '../utils'

export default () => {
  return (
    <Layout>
      <Seo url={getUrl()} />
      <Typography variant="h3" component="h1">
        Welcome!
      </Typography>
    </Layout>
  )
}
