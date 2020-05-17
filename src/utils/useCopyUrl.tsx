import { useState, useEffect, useCallback } from 'react'

const useCopyUrl = (
  url: string,
): [{ copyText: string; copyButtonColor: string }, () => void] => {
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
    navigator.clipboard.writeText(url).then(
      () => {
        setCopyStatus('copied')
      },
      () => {
        setCopyStatus('failed')
      },
    )
  }, [url])

  let copyText = 'Copy URL'
  let copyButtonColor = 'primary'

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
