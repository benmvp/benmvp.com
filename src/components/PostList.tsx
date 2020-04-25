import React from 'react'
import { Grid } from '@material-ui/core'
import PostCard from '../components/PostCard'

const PostList = ({ posts }) => {
  return (
    <Grid container spacing={2}>
      {posts.edges.map(({ node }) => (
        <Grid key={node.id} item xs={12} sm={6} lg={4}>
          <PostCard
            slug={node.fields.slug}
            title={node.frontmatter.title}
            tags={node.frontmatter.tags}
            date={node.frontmatter.date}
            summary={node.frontmatter.description || node.excerpt}
            hero={node.frontmatter.hero}
            heroAlt={node.frontmatter.heroAlt}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default PostList
