interface Config {
  title: string
  tagline?: string
  imagePublicID?: string
  cloudName?: string
  version?: string | null
  titleFont?: string
  taglineFont?: string
  imageWidth?: number
  imageHeight?: number
  textAreaWidth?: number
  textLeftOffset?: number
  titleBottomOffset?: number
  taglineTopOffset?: number
  textColor?: string
  titleFontSize?: number
  taglineFontSize?: number
}

const generateSocialImage = ({
  title,
  tagline,
  imagePublicID = 'benmvp/blog-post-template_xz3hus',
  version = 'v1601530635',
  titleFont = 'roboto',
  taglineFont = 'roboto',
  imageWidth = 1280,
  imageHeight = 669,
  textAreaWidth = 666,
  textLeftOffset = 550,
  titleBottomOffset = 327,
  taglineTopOffset = 370,
  textColor = 'ffffff',
  titleFontSize = 70,
  taglineFontSize = 40,
}: Config): string => {
  // configure social media image dimensions, quality, and format
  const imageConfig = [
    `w_${imageWidth}`,
    `h_${imageHeight}`,
    'c_fill',
    'q_auto',
    'f_auto',
  ].join(',')

  // configure the title text
  const titleConfig = [
    `w_${textAreaWidth}`,
    'c_fit',
    `co_rgb:${textColor}`,
    'g_south_west',
    `x_${textLeftOffset}`,
    `y_${titleBottomOffset}`,
    `l_text:${encodeURIComponent(
      titleFont,
    )}_${titleFontSize}_bold:${encodeURIComponent(title)}`,
  ].join(',')

  // configure the tagline text
  const taglineConfig = tagline
    ? [
        `w_${textAreaWidth}`,
        'c_fit',
        `co_rgb:${textColor}`,
        'g_north_west',
        `x_${textLeftOffset}`,
        `y_${taglineTopOffset}`,
        `l_text:${encodeURIComponent(
          taglineFont,
        )}_${taglineFontSize}_light:${encodeURIComponent(tagline)}`,
      ].join(',')
    : ''

  // combine all the pieces required to generate a Cloudinary URL
  const urlParts = [
    imageConfig,
    titleConfig,
    taglineConfig,
    version,
    imagePublicID,
  ]

  // remove any falsy sections of the URL (e.g. an undefined version)
  const validParts = urlParts.filter(Boolean)

  // join all the parts into a valid URL to the generated image
  return `https://res.cloudinary.com/benmvp/image/upload/${validParts.join(
    '/',
  )}`
}

export default generateSocialImage
