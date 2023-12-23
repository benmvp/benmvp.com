import { formatUrl } from 'url-lib'
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
import { Stack } from '@mui/material'
import SITE_CONFIG from '../config/site'

type ShareOption = 'twitter' | 'facebook' | 'pocket' | 'linkedin' | 'email'

const DEFAULT_ICON_SIZE = 48
const DEFAULT_SHARE_OPTIONS: ShareOption[] = [
  'twitter',
  'facebook',
  'pocket',
  'linkedin',
  'email',
]

interface Props {
  iconSize?: number
  options?: ShareOption[]
  summary: string
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
  const socialUrl = formatUrl(url, {
    utm_medium: 'social',
    utm_campaign: 'share',
  })
  const shareOptions = new Set(options)

  const handleShare = (method: string) => {
    window.gtag?.('event', 'share', {
      content_type: type,
      item_id: url,
      method,
    })
  }

  return (
    <Stack
      direction="row"
      spacing={1}
      // display="flex"
      // flexDirection="row"
      // justifyContent="center"
      // flexWrap="wrap"
    >
      {shareOptions.has('twitter') && (
        <TwitterShareButton
          url={formatUrl(socialUrl, { utm_source: 'twitter' })}
          title={`${title} - ${summary}`}
          via={SITE_CONFIG.twitterHandle}
          hashtags={tags || []}
          aria-label="Share on Twitter"
          onShareWindowClose={() => handleShare('Twitter')}
        >
          <TwitterIcon round size={iconSize} />
        </TwitterShareButton>
      )}
      {shareOptions.has('facebook') && (
        <FacebookShareButton
          url={formatUrl(socialUrl, { utm_source: 'facebook' })}
          quote={`${title} - ${summary}`}
          aria-label="Share on Facebook"
          onShareWindowClose={() => handleShare('Facebook')}
        >
          <FacebookIcon round size={iconSize} />
          <FacebookShareCount url={url} />
        </FacebookShareButton>
      )}
      {shareOptions.has('pocket') && (
        <PocketShareButton
          url={formatUrl(socialUrl, { utm_source: 'pocket' })}
          title={title}
          aria-label="Save to Pocket"
          onShareWindowClose={() => handleShare('Pocket')}
        >
          <PocketIcon round size={iconSize} />
        </PocketShareButton>
      )}
      {shareOptions.has('linkedin') && (
        <LinkedinShareButton
          url={formatUrl(socialUrl, { utm_source: 'linkedin' })}
          title={title}
          summary={summary}
          source={SITE_CONFIG.title}
          aria-label="Share on LinkedIn"
          onShareWindowClose={() => handleShare('LinkedIn')}
        >
          <LinkedinIcon round size={iconSize} />
        </LinkedinShareButton>
      )}
      {shareOptions.has('email') && (
        <EmailShareButton
          url={formatUrl(socialUrl, { utm_source: 'email' })}
          subject={`Check out "${title}"`}
          body={`Here's an summary:\n\n${summary}`}
          aria-label="Share by email"
          onShareWindowClose={() => handleShare('Email')}
        >
          <EmailIcon round size={iconSize} />
        </EmailShareButton>
      )}
    </Stack>
  )
}

export default Share
