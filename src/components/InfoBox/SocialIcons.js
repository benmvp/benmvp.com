import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'

import config from '../../../content/meta/config'

import GithubIcon from '../../images/svg-icons/github.svg'
import TwitterIcon from '../../images/svg-icons/twitter.svg'
import LinkedinIcon from '../../images/svg-icons/linkedin.svg'

const styles = theme => ({
  social: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  link: {
    display: 'inline-block',
    padding: '5px',
    '&:hover': {
      '& svg': {
        fill: theme.info.colors.socialIconsHover,
      },
    },
  },
  svg: {
    width: '40px',
    height: '40px',
    fill: theme.info.colors.socialIcons,
    transition: 'all .5s',
  },
})

const Socialcons = props => {
  const {classes} = props
  const items = config.authorSocialLinks
  const icons = {
    twitter: TwitterIcon,
    github: GithubIcon,
    linkedin: LinkedinIcon,
  }

  return (
    <div className={classes.social}>
      {items.map(item => {
        const Icon = icons[item.name]
        return (
          <a
            href={item.url}
            key={item.name}
            className={classes.link}
            target="_blank"
            rel="noopener noreferrer"
            title={item.title}
          >
            <Icon className={classes.svg} />
          </a>
        )
      })}
    </div>
  )
}

Socialcons.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default injectSheet(styles)(Socialcons)
