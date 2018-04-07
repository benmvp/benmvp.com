import React from 'react'
import PropTypes from 'prop-types'

import Article from '../Main/Article'
import PostHeader from './PostHeader'
import Content from '../Main/Content'
import PostFooter from './PostFooter'

const Post = props => {
  const {post = {}, author, slug} = props
  const {frontmatter = {}, html, fields} = post
  const {title, subTitle} = frontmatter
  const date = fields.prefix

  return (
    <Article>
      <PostHeader title={title} subTitle={subTitle} date={date} />
      <Content html={html} />
      <PostFooter author={author} post={post} slug={slug} />
    </Article>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
}

export default Post
