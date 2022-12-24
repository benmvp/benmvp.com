import React from 'react'
import { formatUrl } from 'url-lib'
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
import { title as siteTitle, twitterHandle } from '../../config/site'

type ShareOption = 'twitter' | 'facebook' | 'pocket' | 'linkedin' | 'email'

const DEFAULT_ICON_SIZE = 48
const DEFAULT_SHARE_OPTIONS = new Set<ShareOption>([
  'twitter',
  'facebook',
  'pocket',
  'linkedin',
  'email',
])

const useStyles = makeStyles((theme) =>
  createStyles({
    links: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    shareButton: {
      '&:not(:first-child)': {
        marginLeft: theme.spacing(1),
      },
    },
  }),
)

interface Props {
  iconSize?: number
  options?: Set<ShareOption>
  summary?: string
  tags?: string[]
  title: string
  type?: 'minishop' | 'post'
  url: string
}

const Share = ({
  iconSize = DEFAULT_ICON_SIZE,
  options = DEFAULT_SHARE_OPTIONS,
  url,
  tags,
  title,
  type,
  summary,
}: Props) => {
  const classes = useStyles()
  const socialUrl = formatUrl(url, {
    utm_medium: 'social',
    utm_campaign: 'share',
  })

  const handleShare = (method) => {
    window.gtag?.('event', 'share', {
      content_type: type,
      item_id: url,
      method,
    })
  }

  return (
    <div>
      <div className={classes.links}>
        {options.has('twitter') && (
          <TwitterShareButton
            url={formatUrl(socialUrl, { utm_source: 'twitter' })}
            title={`${title} - ${summary}`}
            via={twitterHandle}
            hashtags={tags || []}
            aria-label="Share on Twitter"
            className={classes.shareButton}
            onShareWindowClose={() => handleShare('Twitter')}
          >
            <TwitterIcon round size={iconSize} />
          </TwitterShareButton>
        )}
        {options.has('facebook') && (
          <FacebookShareButton
            url={formatUrl(socialUrl, { utm_source: 'facebook' })}
            quote={`${title} - ${summary}`}
            aria-label="Share on Facebook"
            className={classes.shareButton}
            onShareWindowClose={() => handleShare('Facebook')}
          >
            <FacebookIcon round size={iconSize} />
            <FacebookShareCount url={url}>
              {(shareCount) =>
                shareCount && <div className="share-count">{shareCount}</div>
              }
            </FacebookShareCount>
          </FacebookShareButton>
        )}
        {options.has('pocket') && (
          <PocketShareButton
            url={formatUrl(socialUrl, { utm_source: 'pocket' })}
            title={title}
            aria-label="Save to Pocket"
            className={classes.shareButton}
            onShareWindowClose={() => handleShare('Pocket')}
          >
            <PocketIcon round size={iconSize} />
          </PocketShareButton>
        )}
        {options.has('linkedin') && (
          <LinkedinShareButton
            url={formatUrl(socialUrl, { utm_source: 'linkedin' })}
            title={title}
            summary={summary}
            source={siteTitle}
            aria-label="Share on LinkedIn"
            className={classes.shareButton}
            onShareWindowClose={() => handleShare('LinkedIn')}
          >
            <LinkedinIcon round size={iconSize} />
          </LinkedinShareButton>
        )}
        {options.has('email') && (
          <EmailShareButton
            url={formatUrl(socialUrl, { utm_source: 'email' })}
            subject={`Check out "${title}"`}
            body={`Here's an summary:\n\n${summary}`}
            aria-label="Share by email"
            className={classes.shareButton}
            onShareWindowClose={() => handleShare('Email')}
          >
            <EmailIcon round size={iconSize} />
          </EmailShareButton>
        )}
      </div>
    </div>
  )
}

export default Share
