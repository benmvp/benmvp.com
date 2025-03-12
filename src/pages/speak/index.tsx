import { GetStaticProps } from 'next'
import { Fragment } from 'react'
import { Box, Divider, Grid, Typography } from '@mui/material'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import PageHeader from '../../components/PageHeader'
import HeroImage from '../../components/HeroImage'
import Link from '../../components/Link'
import SpeakCard from '../../components/SpeakCard'
import { type SpeakingEngagement, getEngagements } from '../../utils/engagement'
import { getDateYear } from '../../utils/date'
import { getUrl } from '../../utils/url'
import speakImage from '../../components/images/speak-hero.png'

interface Props {
  upcoming: SpeakingEngagement[]
  past: SpeakingEngagement[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const upcoming = getEngagements({
    filter: { when: 'upcoming' },
    sortOrder: 'asc',
  })
  const past = getEngagements({
    filter: { when: 'past' },
  })

  return {
    props: { upcoming, past },
    revalidate: 60 * 60 * 24, // revalidate once a day
  }
}

const PAGE_TITLE = 'Speaking Engagements'

const SpeakingEngagementListPage = ({ upcoming, past }: Props) => {
  let curYear = getDateYear(past[0].talks[0].date) + 1

  return (
    <Layout>
      <Seo
        url={getUrl('speak', true)}
        title={PAGE_TITLE}
        description="Check out Ben Ilegbodu's upcoming and previous speaking engagements for React and frontend web development. The links to videos and slides should help you keep up to date with the latest best practices."
        image={getUrl('images/speak-seo.png')}
      />
      <Box mb={5}>
        <PageHeader
          title={PAGE_TITLE}
          subTitle="Ben's upcoming and previous speaking engagements"
        />
      </Box>
      <Box mb={3}>
        <HeroImage
          image={speakImage}
          alt="Ben Ilegbodu speaking at Reactathon 2018"
        />
      </Box>
      <Typography variant="body1" gutterBottom>
        Every opportunity I get to share my knowledge and experience with others
        is a blessing! My hope is that when I give a talk, host a workshop or
        participate in a panel, the attendees will learn something new that will
        make them a better developer.
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        If you&apos;re interested in having me speak to or hold a workshop with
        your group, thank you! It means a lot that you entrust me with with
        leveling up your group. Please feel free to contact me via{' '}
        <a
          href="https://twitter.com/benmvp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        , <a href="mailto:ben@benmvp.com">email</a> or{' '}
        <Link href={getUrl('ama')}>my AMA</Link>.
      </Typography>

      {upcoming.length > 0 && (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} mt={3}>
              <Typography id="upcoming" variant="h3">
                Upcoming
              </Typography>
            </Grid>

            {upcoming.map((engagement) => (
              <Grid key={engagement.id} item xs={12}>
                <SpeakCard engagement={engagement} />
              </Grid>
            ))}
          </Grid>

          <Box my={5} mx="auto" width="50%">
            <Divider variant="middle" />
          </Box>
        </>
      )}

      <Grid container spacing={2}>
        {past.map((engagement) => {
          const engagementYear = getDateYear(engagement.talks[0].date)
          let dateDisplay

          if (engagementYear < curYear) {
            curYear = engagementYear

            dateDisplay = (
              <Grid item xs={12}>
                <Typography variant="h3">{curYear}</Typography>
              </Grid>
            )
          }

          return (
            <Fragment key={engagement.id}>
              {dateDisplay}
              <Grid item xs={12}>
                <SpeakCard engagement={engagement} />
              </Grid>
            </Fragment>
          )
        })}
      </Grid>
    </Layout>
  )
}

export default SpeakingEngagementListPage
