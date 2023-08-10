interface Config {
  title: string
  tagline?: string
  date?: string
  imagePublicID?: string
  cloudName?: string
  version?: string | null
  titleFont?: string
  taglineFont?: string
  imageWidth?: number
  imageHeight?: number
  textAreaWidth?: number
  textLeftOffset?: number
  titleTopOffset?: number
  taglineBottomOffset?: number
  textColor?: string
  titleFontSize?: number
  taglineFontSize?: number
}

const escape = (text: string): string =>
  encodeURIComponent(encodeURIComponent(text))

const generateSocialImage = ({
  title,
  tagline,
  date,
  imagePublicID = 'benmvp/blog-post-template_gkpzgc',
  version = 'v1619329795',
  titleFont = 'roboto',
  taglineFont = 'roboto',
  imageWidth = 1280,
  imageHeight = 669,
  textAreaWidth = 666,
  textLeftOffset = 550,
  titleTopOffset = 64,
  taglineBottomOffset = 64,
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
  // starts at the top and grows downward
  const titleConfig = [
    `w_${textAreaWidth}`,
    'c_fit',
    `co_rgb:${textColor}`,
    'g_north_west',
    `x_${textLeftOffset}`,
    `y_${titleTopOffset}`,
    `l_text:${escape(titleFont)}_${titleFontSize}_bold:${escape(title)}`,
  ].join(',')

  // configure the tagline text
  // starts at the bottom and grows upward
  const taglineConfig = tagline
    ? [
        `w_${textAreaWidth}`,
        'c_fit',
        `co_rgb:${textColor}`,
        'g_south_west',
        `x_${textLeftOffset}`,
        `y_${taglineBottomOffset}`,
        `l_text:${escape(taglineFont)}_${taglineFontSize}_light:${escape(
          tagline,
        )}`,
      ].join(',')
    : ''

  // configure the date text
  // beneath the logo
  const dateConfig = date
    ? [
        `w_350`,
        'c_fit',
        `co_rgb:${textColor}`,
        'g_south_west',
        `x_64`,
        `y_64`,
        `l_text:${escape(taglineFont)}_${taglineFontSize}:${escape(date)}`,
      ].join(',')
    : ''

  // combine all the pieces required to generate a Cloudinary URL
  const urlParts = [
    imageConfig,
    titleConfig,
    taglineConfig,
    dateConfig,
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
