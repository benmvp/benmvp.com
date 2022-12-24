import { useState, useEffect, useCallback } from 'react'
import { formatUrl } from 'url-lib'
import { ButtonProps } from '@material-ui/core'

const useCopyUrl = (
  url: string,
): [
  { copyText: string; copyButtonColor: ButtonProps['color'] },
  () => void,
] => {
  const trackedUrl = formatUrl(url, {
    utm_source: 'copy',
    utm_medium: 'social',
    utm_campaign: 'share',
  })
  const [copyStatus, setCopyStatus] = useState<
    'inactive' | 'copied' | 'failed'
  >('inactive')

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
      () => {
        setCopyStatus('copied')
      },
      () => {
        setCopyStatus('failed')
      },
    )
  }, [trackedUrl])

  let copyText = 'Copy URL'
  let copyButtonColor: ButtonProps['color'] = 'primary'

  if (copyStatus === 'copied') {
    copyText = 'Copied'
    copyButtonColor = 'secondary'
  } else if (copyStatus === 'failed') {
    copyText = 'Failed!'
    copyButtonColor = 'default'
  }

  return [{ copyText, copyButtonColor }, copy]
}

export default useCopyUrl
