import React from 'react'
import {
  makeStyles,
  createStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
} from '@material-ui/core'
import { Link } from 'gatsby-theme-material-ui'
import Share from './Share'
import { getMinishopUrl, genMinishopSlug } from '../utils'
import useCopyUrl from '../utils/useCopyUrl'

interface Props {
  mode?: 'min' | 'full'
  slug: string
  summary: string
  tags?: string[]
  title: string
}

const useStyles = makeStyles((theme) =>
  createStyles({
    buttons: {
      flex: 1,
      marginRight: theme.spacing(2),
    },
  }),
)

const MinishopCard = ({ mode = 'full', slug, summary, tags, title }: Props) => {
  const classes = useStyles()
  const url = getMinishopUrl(slug)
  const [{ copyText, copyButtonColor }, copy] = useCopyUrl(url)
  const showShare = mode !== 'min'

  return (
    <Card id={genMinishopSlug(title)}>
      <CardActionArea
        component={Link}
        to={`/minishops${slug}`}
        underline="none"
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            color="textPrimary"
            component="h3"
            title={title}
            noWrap
          >
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {summary}
          </Typography>
        </CardContent>
      </CardActionArea>
      {showShare && (
        <CardActions>
          <Box className={classes.buttons}>
            <Button size="small" color={copyButtonColor} onClick={copy}>
              {copyText}
            </Button>
          </Box>
          <Share
            iconSize={32}
            summary={summary}
            tags={tags}
            title={`${title} Minishop`}
            url={url}
            options={new Set(['twitter', 'facebook', 'linkedin'])}
          />
        </CardActions>
      )}
    </Card>
  )
}

export default MinishopCard
