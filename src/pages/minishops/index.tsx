import { type GetStaticProps } from 'next'
import { Divider, Grid, Stack, Typography } from '@mui/material'
import { getMinishops, type Minishop } from '../../utils/minishop'
import { useEffect } from 'react'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import { getMinishopUrl, getUrl } from '../../utils/url'
import PageHeader from '../../components/PageHeader'
import HeroImage from '../../components/HeroImage'
import MinishopCard from '../../components/MinishopCard'
import minishopHero from '../../components/images/remote-work-setup.jpg'

interface Props {
  upcoming: Minishop[]
  remaining: Minishop[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const upcoming = await getMinishops({
    filter: { when: 'upcoming' },
  })
  const remaining = await getMinishops({
    filter: { when: 'remaining' },
    sortBy: 'title',
  })

  return {
    props: {
      upcoming,
      remaining,
    },
  }
}

const MinishopListPage = ({ upcoming, remaining }: Props) => {
  useEffect(() => {
    if (upcoming.length) {
      window.gtag?.('event', 'view_item_list', {
        items: upcoming.map((minishop, index) => ({
          id: minishop.slug,
          name: minishop.title,
          list_name: 'Minishops',
          list_position: index + 1,
          price: 100,
        })),
      })
    }
  }, [upcoming])

  return (
    <Layout>
      <Seo
        url={getMinishopUrl('', true)}
        title="Remote Minishops, Online Workshops, Virtual Training"
        description="Minishops by Ben Ilegbodu are 3-hour, fully-remote workshops that focus on frontend technologies like React, TypeScript and testing. They're highly-focused, covering only the concepts you want to learn so that you can level up your skills and get on with the rest of your day."
        image={getUrl('images/minishops/seo.jpg')}
      />
      <Stack spacing={3} direction="column">
        <PageHeader
          title="Minishops with Ben"
          subTitle="Let's learn together without having to leave your house! Use remote minishops by Ben Ilegbodu to level up your JavaScript, React and frontend skills."
        />
        <HeroImage
          image={minishopHero}
          alt="Picture of a remote working environment with a monitor with code and a mug that says 'Life begins at the end of your comfort zone'"
          credit="Photo by [Tudor Baciu](https://unsplash.com/@baciutudor)"
        />
        <Typography variant="body1">
          Minishops by Ben Ilegbodu are 3-hour, fully-remote workshops that
          focus on frontend technologies like React, TypeScript and testing.
          They&apos;re highly-focused, covering only the concepts you want to
          learn so that you can level up your skills and get on with the rest of
          your day.
        </Typography>
        {upcoming.length > 0 && (
          <>
            <Typography component="h3" variant="h4">
              Upcoming Minishops
            </Typography>
            <Grid container spacing={2}>
              {upcoming.map((minishop) => (
                <Grid key={minishop.slug} item xs={12}>
                  <MinishopCard minishop={minishop} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
        {upcoming.length > 0 && remaining.length > 0 && (
          <Divider sx={{ width: '50%', alignSelf: 'center' }} />
        )}
        {remaining.length > 0 && (
          <>
            <Typography component="h3" variant="h4">
              {upcoming.length > 0 ? 'Remaining' : 'All'} Minishops
            </Typography>
            <Grid container spacing={2}>
              {remaining.map((minishop) => (
                <Grid key={minishop.slug} item xs={12} sm={6}>
                  <MinishopCard minishop={minishop} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Stack>
    </Layout>
  )
}

export default MinishopListPage
