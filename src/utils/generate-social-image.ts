interface Config {
  title: string
  tagline: string
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
  imagePublicID = 'benmvp/blog-post-template',
  version = 'v1601356888',
  titleFont = 'roboto',
  taglineFont = 'roboto%20condensed',
  imageWidth = 1280,
  imageHeight = 669,
  textAreaWidth = 660,
  textLeftOffset = 580,
  titleBottomOffset = 254,
  taglineTopOffset = 445,
  textColor = 'ffffff',
  titleFontSize = 64,
  taglineFontSize = 48,
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
    `l_text:${titleFont}_${titleFontSize}:${encodeURIComponent(title)}`,
  ].join(',')

  // configure the tagline text
  const taglineConfig = [
    `w_${textAreaWidth}`,
    'c_fit',
    `co_rgb:${textColor}`,
    'g_north_west',
    `x_${textLeftOffset}`,
    `y_${taglineTopOffset}`,
    `l_text:${taglineFont}_${taglineFontSize}:${encodeURIComponent(tagline)}`,
  ].join(',')

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
