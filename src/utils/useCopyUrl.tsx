import { useState, useEffect, useCallback } from 'react'
import { formatUrl } from 'url-lib'

type CopyState = 'inactive' | 'copied' | 'failed'

const useCopyUrl = (url: string) => {
  const trackedUrl = formatUrl(url, {
    utm_source: 'copy',
    utm_medium: 'social',
    utm_campaign: 'share',
  })
  const [copyStatus, setCopyStatus] = useState<CopyState>('inactive')

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (copyStatus !== 'inactive') {
      timeoutId = setTimeout(() => {
        setCopyStatus('inactive')
      }, 2500)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [copyStatus])

  const copy = useCallback(() => {
    navigator.clipboard.writeText(trackedUrl).then(
      () => setCopyStatus('copied'),
      () => setCopyStatus('failed'),
    )
  }, [trackedUrl])

  let copyText = 'Copy URL'
  let copyButtonColor = 'primary'

  if (copyStatus === 'copied') {
    copyText = 'Copied'
    copyButtonColor = 'secondary'
  } else if (copyStatus === 'failed') {
    copyText = 'Failed!'
    copyButtonColor = 'default'
  }

  return [{ copyText, copyButtonColor }, copy] as const
}

export default useCopyUrl
