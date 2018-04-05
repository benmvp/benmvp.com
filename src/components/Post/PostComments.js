import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import ReactDisqusComments from 'react-disqus-comments'

import config from '../../../content/meta/config'

const styles = theme => ({
  postComments: {
    margin: '3em 0 0',
    padding: '3em 0 0',
    borderTop: '1px solid #ddd',
  },
})

class PostComments extends React.Component {
  render() {
    const {classes, post, slug} = this.props
    const {frontmatter: {title, category}} = post
    const postUrl = `${config.siteUrl}${slug}`

    return (
      <div id="post-comments" className={classes.postComments}>
        <ReactDisqusComments
          shortname={config.disqusShortname}
          identifier={slug}
          title={title}
          url={postUrl}
          category_id={category}
        />
      </div>
    )
  }
}

PostComments.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
}

export default injectSheet(styles)(PostComments)
