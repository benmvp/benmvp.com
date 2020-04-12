import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core'
import {
  FacebookShareButton,
  FacebookShareCount,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  PocketShareButton,
  PocketIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share'
import CONFIG from '../../content/meta/config'

const ICON_SIZE = 48

const useStyles = makeStyles((theme) =>
  createStyles({
    links: {
      marginTop: theme.spacing(3),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    shareButton: {
      margin: theme.spacing(0, 1),
    },
  }),
)

interface Props {
  summary: string
  tags?: string[]
  title: string
  url: string
}

export default ({ url, tags, title, summary }: Props) => {
  const classes = useStyles()

  return (
    <div className={classes.share}>
      <div className={classes.links}>
        <TwitterShareButton
          url={url}
          title={title}
          via={CONFIG.twitterHandle}
          hashtags={tags || []}
          aria-label="Share on Twitter"
          className={classes.shareButton}
        >
          <TwitterIcon round size={ICON_SIZE} />
        </TwitterShareButton>
        <FacebookShareButton
          url={url}
          quote={`${title} - ${summary}`}
          aria-label="Share on Facebook"
          className={classes.shareButton}
        >
          <FacebookIcon round size={ICON_SIZE} />
          <FacebookShareCount url={url}>
            {(count) => count && <div className="share-count">{count}</div>}
          </FacebookShareCount>
        </FacebookShareButton>
        <PocketShareButton
          url={url}
          title={title}
          aria-label="Save to Pocket"
          className={classes.shareButton}
        >
          <PocketIcon round size={ICON_SIZE} />
        </PocketShareButton>
        <LinkedinShareButton
          url={url}
          title={title}
          summary={summary}
          source={CONFIG.siteTitle}
          aria-label="Share on LinkedIn"
          className={classes.shareButton}
        >
          <LinkedinIcon round size={ICON_SIZE} />
        </LinkedinShareButton>
        <EmailShareButton
          url={url}
          subject={`Check out "${title}"`}
          body={`Here's an summary:\n\n${summary}`}
          aria-label="Share by email"
          className={classes.shareButton}
        >
          <EmailIcon round size={ICON_SIZE} />
        </EmailShareButton>
      </div>
    </div>
  )
}
