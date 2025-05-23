import { type TalkId } from './talks'

type TalkLinkLabel =
  | 'Blog post'
  | 'Code examples'
  | 'Demo'
  | 'Podcast'
  | 'Slides'
  | 'Twitch'
  | 'Video'
  | 'Workshop code'
  | 'Workshop repo'

export interface TalkLink {
  label: TalkLinkLabel
  url: string
}

interface IdentifiedSourceTalk {
  id: TalkId
  title?: string
}
interface TitledSourceTalk {
  id?: never
  title: string
}

type BaseSourceTalk = IdentifiedSourceTalk | TitledSourceTalk

export type SourceTalk = BaseSourceTalk & {
  categories?: string[]
  date: string
  room?: string
  time?: string
  links?: TalkLink[]
}

export interface SourceEngagement {
  isCancelled?: boolean
  location: string
  name: string
  talks: SourceTalk[]
  url: string
  venue?: string
}

export const SPEAKING_ENGAGEMENTS: SourceEngagement[] = [
  {
    name: 'JavaScript fwdays 2025',
    url: 'https://fwdays.com/en/event/javascript-fwdays-2025',
    location: 'Online',
    talks: [
      {
        id: 'sneaky-ai',
        date: '05/24/2025',
        time: '15:00',
        links: [
          {
            label: 'Slides',
            url: 'https://www.benmvp.com/jsfwd-sneaky-ai',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/sneaky-ai-demo',
          },
        ],
      },
    ],
  },
  {
    name: 'All Things Open AI',
    url: 'https://allthingsopen.ai/',
    location: 'Durham, North Carolina',
    venue: 'Carolina Theater',
    talks: [
      {
        id: 'sneaky-ai',
        date: '03/18/2025',
        time: '2:15p',
        room: 'AI Engineers',
        links: [
          {
            label: 'Slides',
            url: 'https://www.benmvp.com/ato-sneaky-ai',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/sneaky-ai-demo',
          },
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=KkYIY1DT3wo',
          },
        ],
      },
    ],
  },
  {
    name: 'ConFoo 2025',
    url: 'https://confoo.ca/en/2025',
    location: 'Montreal, Canada',
    venue: 'Bonaventure Hotel',
    talks: [
      {
        id: 'sneaky-ai',
        date: '02/28/2025',
        time: '11:00a',
        room: 'ST-Laurent 8',
        links: [
          {
            label: 'Slides',
            url: 'https://www.benmvp.com/cf-sneaky-ai',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/sneaky-ai-demo',
          },
        ],
      },
      {
        id: 'shopping-ai',
        date: '02/27/2025',
        time: '3:00p',
        room: 'Westmount 6',
        links: [
          {
            label: 'Slides',
            url: 'https://www.benmvp.com/cf-ai-shop',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/discover-ai',
          },
        ],
      },
    ],
  },
  {
    name: 'Connect.Tech 2024',
    url: 'https://2024.connect.tech/',
    location: 'Atlanta, Georgia',
    venue: 'Cobb Galleria Centre',
    talks: [
      {
        id: 'nextjs-rendering',
        date: '11/19/2024',
        time: '11:30a',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2024/connecttech/nextjs.html',
          },
          {
            label: 'Demo',
            url: 'https://nextjs-rendering.benmvp.com',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/nextjs-rendering',
          },
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=oBldsJslSU0',
          },
        ],
      },
    ],
  },
  {
    name: 'Black is Tech 2024',
    url: 'hhttps://blackistechconference.com/',
    location: 'Houston, Texas',
    talks: [
      {
        id: 'nextjs-rendering',
        date: '08/19/2024',
        time: '12:30p',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2024/bit/nextjs.html',
          },
          {
            label: 'Demo',
            url: 'https://nextjs-rendering.benmvp.com',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/nextjs-rendering',
          },
        ],
      },
    ],
  },
  {
    name: 'UI Architecture 2024',
    url: 'https://uiarchconf.com/',
    isCancelled: true,
    location: 'New Orleans, Louisiana',
    talks: [
      {
        id: 'divops-workshop',
        date: '05/20/2024',
      },
    ],
  },
  {
    name: 'React Miami 2024',
    url: 'https://www.reactmiami.com/',
    location: 'Miami, Florida',
    talks: [
      {
        id: 'nextjs-rendering',
        date: '04/19/2024',
        time: '1:27p',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2024/reactmiami/nextjs.html',
          },
          {
            label: 'Demo',
            url: 'https://nextjs-rendering.benmvp.com',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/nextjs-rendering',
          },
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=SM9ze_6WPs8',
          },
        ],
      },
    ],
  },
  {
    name: 'HalfStack Phoenix 2024',
    url: 'https://halfstackconf.com/phoenix',
    location: 'Gilbert, Arizona',
    venue: 'Gilbert Majestic Theater',
    talks: [
      {
        id: 'shopping-ai',
        date: '02/02/2024',
        links: [
          {
            label: 'Slides',
            url: 'https://www.benmvp.com/hs-phx-ai',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/discover-ai',
          },
        ],
      },
    ],
  },
  {
    name: 'The Modern Web Podcast',
    url: 'https://www.thisdot.co/',
    location: 'Remote',
    talks: [
      {
        title:
          'Unlock the Power of DivOps Engineering with Ben Ilegbodu and Jonathan Creamer',
        date: '11/15/2023',
        categories: ['DivOps'],
        links: [
          {
            label: 'Podcast',
            url: 'https://modernweb.podbean.com/e/modern-web-podcast-s11e13-unlock-the-power-of-divops-engineering-with-ben-ilegbodu-and-jonathan-creamer/',
          },
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=6MmuBj22vx0',
          },
        ],
      },
    ],
  },
  {
    name: 'Connect.Tech 2023',
    url: 'https://2023.connect.tech/',
    location: 'Atlanta, Georgia',
    venue: 'Georgia World Congress Center',
    talks: [
      {
        id: 'divops',
        date: '10/26/2023',
        time: '9:00a',
        room: 'Main stage',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2023/connecttech/divops.html',
          },
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=Xh4JLNJeWQ4',
          },
        ],
      },
    ],
  },
  {
    name: 'All Things Open 2023',
    url: 'https://2023.allthingsopen.org/',
    location: 'Raleigh, North Carolina',
    venue: 'Raleigh Convention Center',
    talks: [
      {
        id: 'nextjs-rendering',
        date: '10/17/2023',
        time: '2:45p',
        room: 'Developer 1, Ballroom B',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2023/ato/nextjs.html',
          },
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=_B9kJdMUDPk',
          },
        ],
      },
    ],
  },
  {
    name: 'Black is Tech 2023',
    url: 'https://blackistechconference.com/',
    location: 'Atlanta, Georgia',
    venue: 'Georgia World Congress Center',
    talks: [
      {
        id: 'web-dev',
        date: '08/11/2023',
        time: '12:30p',
        room: 'Georgia Ballroom 2',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2023/bit/webdev.html',
          },
        ],
      },
    ],
  },
  {
    name: 'SeattleJS Conf 2023',
    url: 'https://seattlejs.com/conf',
    location: 'Seattle, Washington',
    venue: 'Amazon Meeting Center (SEA45)',
    talks: [
      {
        id: 'nextjs-rendering',
        date: '08/08/2023',
        time: '10:15a',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2023/seattlejs/nextjs.html',
          },
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=JZIB8qrCers',
          },
        ],
      },
    ],
  },
  {
    name: 'HalfStack Charlotte 2023',
    url: 'https://halfstackconf.com/charlotte',
    location: 'Charlotte, North Carolina',
    talks: [
      {
        id: 'web-dev',
        date: '04/28/2023',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2023/halfstack/webdev.html',
          },
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=EsO22N9cIOo',
          },
        ],
      },
    ],
  },
  {
    name: 'Connect.Tech 2022',
    url: 'https://2022.connect.tech/',
    location: 'Atlanta, Georgia',
    talks: [
      {
        id: 'web-dev',
        date: '11/9/2022',
        time: '1:30p',
        room: 'Room 105',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2022/connecttech/webdev.html',
          },
        ],
      },
      {
        id: 'typescript-react',
        date: '11/8/2022',
        time: '10:30a',
        room: 'Ballroom C',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2022/connecttech/ts-react.html',
          },
        ],
      },
    ],
  },
  {
    name: 'Houston React Developers',
    url: 'https://www.meetup.com/houston-react-js-group/events/287638053/',
    location: 'Remote',
    talks: [
      {
        id: 'mixins-to-hooks',
        date: '9/22/2022',
        time: '4p PST',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2022/houreactdevs/mixins-hooks.html',
          },
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=_1hT6Qv5LfM',
          },
        ],
      },
    ],
  },
  {
    name: 'HackBuddy',
    url: 'https://javascriptla.net/blog/from-mixins-to-custom-hooks-history-of-sharing-in-react-w-benmvp/',
    location: 'Remote',
    talks: [
      {
        id: 'mixins-to-hooks',
        date: '7/26/2022',
        time: '6p PST',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2022/hackbuddy/mixins-hooks.html',
          },
        ],
      },
    ],
  },
  {
    name: 'Global React Meetup April 2022',
    url: 'https://www.reactjsmeetup.com/archive/state-of-react-or-april-2022',
    location: 'Remote',
    talks: [
      {
        title: 'State of React',
        date: '4/26/2022',
        time: '9a PST',
        categories: ['react'],
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=7LMsR30p1xM',
          },
        ],
      },
    ],
  },
  {
    name: 'React Miami 2022',
    url: 'https://www.reactmiami.com/',
    location: 'Miami, Florida',
    talks: [
      {
        id: 'enzyme-to-rtl',
        date: '4/19/2022',
        time: '10:57a EST',
        categories: ['react'],
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=po5UstEVIK4',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2022/reactmiami/enzyme-to-rtl.html',
          },
        ],
      },
    ],
  },
  {
    name: 'CascadiaJS 2021',
    url: 'https://2021.cascadiajs.com/workshops/ben-ilegbodu',
    location: 'Remote',
    talks: [
      {
        title: 'Zero to React with Hooks Minishop',
        date: '11/10/2021',
        time: '1p PST',
        categories: ['react'],
      },
      {
        title: 'TypeScript for React Developers Minishop',
        date: '11/11/2021',
        time: '1p PST',
        categories: ['typescript', 'react'],
      },
    ],
  },
  {
    name: 'StaffEng Podcast',
    url: 'https://podcast.staffeng.com/',
    location: 'Remote',
    talks: [
      {
        title: 'Ben Ilegbodu (Stitch Fix)',
        date: '11/2/2021',
        categories: ['career'],
        links: [
          {
            label: 'Podcast',
            url: 'https://podcast.staffeng.com/1687069/9464860-ben-ilegbodu-stitch-fix',
          },
        ],
      },
    ],
  },
  {
    name: 'Global React Meetup September 2021',
    url: 'https://www.reactjsmeetup.com/archive/react-contributor-days-september-2021',
    location: 'Remote',
    talks: [
      {
        title: 'React Contributor Days',
        date: '9/9/2021',
        time: '9a PST',
        categories: ['react'],
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=jweh2aO33RY',
          },
        ],
      },
    ],
  },
  {
    name: 'Egghead.io Twitter Space',
    url: 'https://twitter.com/i/spaces/1mrGmwwnnEvxy',
    location: 'Remote',
    talks: [
      {
        title:
          'Learning & Teaching React w/ @kentcdodds @chantastic @shaundai @benmvp',
        date: '07/08/2021',
        time: '1a PST',
        categories: ['react', 'mentoring'],
      },
    ],
  },
  {
    name: 'Open Source 101 2021',
    url: 'https://opensource101.com/',
    location: 'Remote',
    talks: [
      {
        id: 'perfect-lib',
        date: '03/30/2021',
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=wA77sWwdQZo',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2021/os101/perfect-lib.html',
          },
        ],
      },
    ],
  },
  {
    name: 'C000000DE',
    url: 'https://twitter.com/HenriHelvetica/status/1357805286623490048',
    location: 'Remote',
    talks: [
      {
        id: 'typescript-react',
        date: '02/27/2021',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2021/c000000de/ts-react.html',
          },
        ],
      },
    ],
  },
  {
    name: 'Global React Meetup November 2020',
    url: 'https://www.reactjsmeetup.com/#/global-react-meetup-november-2020',
    location: 'Remote',
    talks: [
      {
        id: 'mixins-to-hooks',
        date: '11/12/2020',
        time: '12:30p PST',
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=ox-IJGoor1c',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2020/reactjsmeetup/mixins-hooks.html',
          },
        ],
      },
    ],
  },
  {
    name: 'QCon Plus 2020',
    url: 'https://plus.qconferences.com/plus2020/track/clientside-wasm-browser-applications',
    location: 'Remote',
    talks: [
      {
        id: 'mixins-to-hooks',
        date: '11/5/2020',
        time: '9am PST',
        links: [
          {
            label: 'Video',
            url: 'https://www.infoq.com/presentations/react-custom-hooks/',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2020/qconplus/mixins-hooks.html',
          },
        ],
      },
      {
        title: 'Front End Happy Hour',
        date: '11/5/2020',
        time: '11:30a PST',
        links: [
          {
            label: 'Podcast',
            url: 'https://frontendhappyhour.com/episodes/live-at-qcon-plus-2020/',
          },
        ],
      },
    ],
  },
  {
    name: 'All Things Open 2020',
    url: 'https://2020.allthingsopen.org/',
    location: 'Remote',
    talks: [
      {
        id: 'perfect-lib',
        date: '10/20/2020',
        time: '10:30a PDT',
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=Drli_MNdCts',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2020/ato/perfect-lib.html',
          },
        ],
      },
    ],
  },
  {
    name: 'React Summit 2020',
    url: 'https://reactsummit.com/',
    location: 'Remote',
    talks: [
      {
        title: 'Migrating to React Hooks Minishop',
        date: '10/13/2020',
        time: '9a PDT',
      },
      {
        id: 'typescript-react',
        date: '10/15/2020',
        room: 'Summit',
        time: '11:30a PDT',
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=MBrOX6gS4C8',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2020/reactsummit/typescript.html',
          },
        ],
      },
    ],
  },
  {
    name: 'JS Party',
    url: 'https://changelog.com/jsparty/149',
    location: 'Remote',
    talks: [
      {
        title: 'Bringing it back to TypeScript',
        date: '10/15/2020',
        time: '10a PDT',
        categories: ['typescript'],
        links: [
          {
            label: 'Podcast',
            url: 'https://changelog.com/jsparty/149',
          },
        ],
      },
    ],
  },
  {
    name: 'TSConf 2020',
    url: 'https://tsconf.io/',
    location: 'Remote',
    talks: [
      {
        id: 'typescript-react',
        date: '10/9/2020',
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=xfcPUP2_J9E',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2020/tsconf/react.html',
          },
        ],
      },
    ],
  },
  {
    name: 'Learn With Jason',
    url: 'https://www.learnwithjason.dev/power-up-react-with-typescript',
    location: 'Remote',
    talks: [
      {
        title: 'Power up React with TypeScript',
        date: '10/8/2020',
        time: '9:30a PDT',
        categories: ['react', 'typescript'],
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=4PduzmHf1YQ',
          },
          {
            label: 'Twitch',
            url: 'https://www.twitch.tv/videos/764289820',
          },
        ],
      },
    ],
  },
  {
    name: 'ui.dev Events',
    url: 'https://ui.dev/events/',
    location: 'Remote',
    talks: [
      {
        id: 'typescript-react',
        date: '10/1/2020',
        time: '11:00a PDT',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2020/uidev/ts-react.html',
          },
        ],
      },
    ],
  },
  {
    name: 'React Global Online Summit 2020',
    url: 'https://react.geekle.us/',
    location: 'Remote',
    talks: [
      {
        id: 'perfect-lib',
        date: '09/15/2020',
        time: '5:20p PDT',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2020/reactglobal/perfect-lib.html',
          },
        ],
      },
    ],
  },
  {
    name: 'Junior Developer Happy Hour July 2020',
    url: 'https://www.meetup.com/es/Junior-Developer-Happy-Hour/events/271574913/',
    location: 'Remote',
    talks: [
      {
        title: 'JDHH with special guest Ben Ilegbodu',
        date: '07/18/2020',
        time: '12p PDT',
        categories: ['mentoring'],
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=s0ax5_WvDKM',
          },
        ],
      },
    ],
  },
  {
    name: 'React Loop 2020',
    url: 'https://reactloop.com/',
    isCancelled: true,
    location: 'Chicago, Illinois',
    venue: 'Venue SIX10',
    talks: [
      {
        id: 'typescript-react',
        date: '06/19/2020',
      },
    ],
  },
  {
    name: 'Reactive Online Meetup',
    url: 'https://twitter.com/ReactiveMeetups/status/1270298765514203136',
    location: 'Remote',
    talks: [
      {
        title: '#BlackLivesMatter #MetaTalk w/ Pariss & Ben',
        date: '06/09/2020',
        time: '10a PDT',
        categories: ['miscellaneous'],
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=5JY7tmT3htg',
          },
        ],
      },
    ],
  },
  {
    name: 'Reactathon 2020',
    url: 'https://www.reactathon.com/',
    location: 'Remote',
    talks: [
      {
        id: 'react-workshop-hooks',
        date: '03/30/2020',
        time: '9a PST',
        links: [
          {
            label: 'Workshop code',
            url: 'https://github.com/benmvp/react-workshop/',
          },
        ],
      },
    ],
  },
  {
    name: 'Flashback Conference 2020',
    url: 'http://flashback.dev',
    location: 'Orlando, Florida',
    venue: 'The Abbey',
    talks: [
      {
        id: 'web-dev',
        date: '02/10/2020',
        time: '1:30p',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2020/flashback/webdev',
          },
        ],
      },
    ],
  },
  {
    name: "JSConf Hawai'i 2020",
    url: 'https://www.jsconfhi.com/',
    location: "Waikiki, Hawai'i",
    venue: "'Alohilani Resort",
    talks: [
      {
        id: 'perfect-lib',
        date: '02/05/2020',
        time: '11:30a',
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=kQ4r9OATmB0',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2020/jsconfhi/perfect-lib',
          },
        ],
      },
    ],
  },
  {
    name: 'NationJS Frontrunners React 2019',
    url: 'http://nationjs.com/',
    location: 'Washington, D.C.',
    venue: 'Burke Theater',
    talks: [
      {
        id: 'react-eco',
        title: 'Navigating the Ecosystem',
        date: '06 December 2019',
        time: '10:35a',
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=e4tkunIoWTc',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2019/nationjs/react-eco',
          },
        ],
      },
    ],
  },
  {
    name: 'Silicon Valley Code Camp 2019',
    url: 'https://www.siliconvalley-codecamp.com/',
    location: 'San Jose, California',
    venue: 'PayPal Town Hall',
    talks: [
      {
        id: 'react-eco',
        date: '19 October 2019',
        time: '11a',
        room: 'Fireside A',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2019/svcc/react-eco',
          },
        ],
      },
    ],
  },
  {
    name: 'All Things Open 2019',
    url: 'https://2019.allthingsopen.org/',
    location: 'Raleigh, North Carolina',
    venue: 'Raleigh Convention Center',
    talks: [
      {
        id: 'react-eco',
        date: '14 October 2019',
        time: '2:15p',
        room: 'Ballroom C',
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=36pyoPW0-iU',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2019/ato/react-eco',
          },
        ],
      },
    ],
  },
  {
    name: 'Web Unleashed 2019',
    url: 'https://fitc.ca/event/webu19/',
    location: 'Toronto, Canada',
    venue: 'Hilton Toronto',
    talks: [
      {
        id: 'web-dev',
        date: '13 September 2019',
        time: '1:30p',
        room: 'Toronto II',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2019/webu/webdev',
          },
        ],
      },
    ],
  },
  {
    name: 'CSS Conf EU 2019',
    url: 'https://2019.cssconf.eu/',
    location: 'Berlin, Germany',
    venue: 'Arena Berlin',
    talks: [
      {
        id: 'web-dev',
        date: '31 May 2019',
        time: '14:20',
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=TJxxzKoaLNE',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2019/cssconfeu/webdev',
          },
        ],
      },
    ],
  },
  {
    name: 'Reactathon 2019',
    url: 'https://www.reactathon.com/',
    location: 'San Francisco, California',
    venue: 'Github HQ',
    talks: [
      {
        id: 'react-eco',
        title: 'State of the React Ecosystem (Keynote)',
        date: '31 March 2019',
        time: '10:10a',
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=mtjHxwUQUs0&t=183',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2019/reactathon/react-eco',
          },
        ],
      },
    ],
  },
  {
    name: 'React Next 2018',
    url: 'https://react-next.com/schedule',
    location: 'Tel Aviv, Israel',
    venue: 'Dan Panorama Hotel',
    talks: [
      {
        id: 'react-eco',
        title: 'State of the React Ecosystem',
        date: '04 November 2018',
        time: '9:50a',
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=yOWzQOZIANU',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2018/reactnext/react-eco',
          },
        ],
      },
    ],
  },
  {
    name: 'Framework Summit 2018',
    url: 'https://www.frameworksummit.com/',
    location: 'Park City, Utah',
    venue: 'DoubleTree Inn',
    talks: [
      {
        id: 'nav-react',
        date: '03 October 2018',
        time: '4p',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2018/frameworksummit/nav-react',
          },
        ],
      },
    ],
  },
  {
    name: 'NDC Sydney 2018',
    url: 'https://ndcsydney.com/',
    location: 'Sydney, Australia',
    venue: 'Hilton Sydney',
    talks: [
      {
        title: 'Ask Me Anything! - Build your own React-based stack',
        date: '20 September 2018',
        time: '11:40a',
        room: 'Room 8 / Level 4',
        categories: ['react'],
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=1KOq5AZS2m8',
          },
        ],
      },
      {
        id: 'nav-react',
        date: '20 September 2018',
        time: '10:20a',
        room: 'Room 5',
        links: [
          { label: 'Video', url: 'https://vimeo.com/297082496' },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2018/ndcsydney/nav-react',
          },
        ],
      },
    ],
  },
  {
    name: 'React Alicante 2018',
    url: 'http://reactalicante.es/',
    location: 'Alicante, Spain',
    venue: 'Hotel Meliã',
    talks: [
      {
        id: 'react-perf',
        date: '14 September 2018',
        time: '16:50',
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=LBzJFcZsPBQ',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2018/reactalicante/react-perf',
          },
        ],
      },
      {
        id: 'redux-testing-workshop',
        date: '13 September 2018',
        time: '9:00',
        room: 'Terra Lucis II',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2018/reactalicante/react-workshop',
          },
          {
            label: 'Workshop code',
            url: 'https://github.com/benmvp/react-workshop/tree/email-based/src/testing',
          },
        ],
      },
    ],
  },
  {
    name: 'React Rally 2018',
    url: 'http://www.reactrally.com/',
    location: 'Salt Lake City, Utah',
    venue: 'Sheraton Salt Lake City Hotel',
    talks: [
      {
        title: 'Master of Ceremonies',
        date: 'August 16/17, 2018',
      },
    ],
  },
  {
    name: 'NEJS 2018',
    url: 'https://2018.nejsconf.com/',
    location: 'Omaha, Nebraska',
    venue: 'Holland Performing Arts Center',
    talks: [
      {
        id: 'web-dev',
        date: '27 July 2018',
        time: '1:30p',
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=6hyIZlaWVmU',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2018/nejs/webdev',
          },
        ],
      },
    ],
  },
  {
    name: 'Node Summit 2018',
    url: 'http://www.nodesummit.com/',
    location: 'San Francisco, California',
    venue: 'Mission Bay Conference Center',
    talks: [
      {
        id: 'esnext',
        date: '24 July 2018',
        time: '2:55p',
        room: 'Main Stage',
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=9yK4t2CuIHQ',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2018/nodesummit/esnext',
          },
        ],
      },
      {
        title: 'Panel: Node in the Enterprise',
        date: '24 July 2018',
        time: '1:30p',
        room: 'Main Stage',
        links: [{ label: 'Video', url: 'https://vimeo.com/289098128' }],
      },
    ],
  },
  {
    name: 'Music City Code 2018',
    url: 'http://www.musiccitytech.com/conferences/music-city-code/',
    location: 'Nashville, Tennessee',
    venue: 'Vanderbilt University',
    talks: [
      {
        id: 'react-workshop',
        date: '31 May 2018',
        time: '9a',
        room: 'Cinema',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2018/mctech/react-workshop',
          },
          {
            label: 'Workshop code',
            url: 'https://github.com/benmvp/react-workshop/tree/email-based/src/react',
          },
        ],
      },
    ],
  },
  {
    name: 'Reactathon 2018',
    url: 'http://www.reactathon.com/',
    location: 'San Francisco, California',
    venue: 'Palace of the Fine Arts',
    talks: [
      {
        id: 'why-react',
        date: '20 March 2018',
        time: '10:15a',
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=Wfec35hSALc',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2018/reactathon/why-react',
          },
        ],
      },
      {
        id: 'react-workshop',
        date: '19 March 2018',
        time: '10a',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2018/reactathon/react-workshop',
          },
          {
            label: 'Workshop code',
            url: 'https://github.com/benmvp/react-workshop/tree/email-based/src/react',
          },
        ],
      },
    ],
  },
  {
    name: 'Sabio LA 2018',
    url: 'http://www.sabio.la/',
    location: 'Los Angeles, California',
    venue: 'Antioch University',
    talks: [
      {
        id: 'react-workshop',
        date: '23 January 2018',
        time: '7p',
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=VjI3MoDoJ',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2018/sabiola/react-workshop',
          },
          {
            label: 'Workshop code',
            url: 'https://github.com/benmvp/react-workshop/tree/email-based/src/react',
          },
        ],
      },
    ],
  },
  {
    name: 'Hack Reactor 2017',
    url: 'http://hackreactor.com/',
    location: 'San Francisco California',
    talks: [
      {
        id: 'why-react',
        date: '07 December 2017',
        time: '8p',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/telegraph/why-react',
          },
        ],
      },
    ],
  },
  {
    name: 'Nodevember 2017',
    url: 'http://nodevember.org/',
    location: 'Nashville, Tennessee',
    venue: 'Vanderbilt University',
    talks: [
      {
        id: 'why-react',
        date: '28 November 2017',
        time: '5p',
        room: 'Commodore Ballroom',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/nodevember/why-react',
          },
        ],
      },
    ],
  },
  {
    name: 'Full Stack Toronto 2017',
    url: 'http://2017.fsto.co/',
    location: 'Toronto, Canada',
    venue: 'Historic Automotive Building at Exhibition Place',
    talks: [
      {
        id: 'iso-react',
        date: '23 October 2017',
        time: '4p',
        room: 'Room 206AB',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/fstoco/iso-react',
          },
        ],
      },
    ],
  },
  {
    name: 'Hackbright Academy October 2017',
    url: 'https://hackbrightacademy.com/',
    location: 'San Francisco, California',
    venue: 'Hackbright Academy',
    talks: [
      {
        id: 'sweet-es6',
        date: '17 October 2017',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/hackbright/sweet-es6',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/learning-es6',
          },
        ],
      },
    ],
  },
  {
    name: 'Strange Loop 2017',
    url: 'https://www.thestrangeloop.com/2017/sessions.html',
    location: 'St. Louis, Missouri',
    venue: 'Peabody Opera House',
    talks: [
      {
        id: 'react-workshop',
        date: '28 September 2017',
        time: '12:30p',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/strangeloop/react-workshop',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/react-workshop',
          },
        ],
      },
    ],
  },
  {
    name: 'React Boston 2017',
    url: 'http://www.reactboston.com/',
    location: 'Boston, Massachusetts',
    venue: 'Wayfair',
    talks: [
      {
        id: 'react-fiber',
        date: '24 September 2017',
        time: '9a',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/reactboston/fiber',
          },
        ],
      },
    ],
  },
  {
    name: 'Real World React September 2017',
    url: 'https://www.meetup.com/Real-World-React/events/242202176/',
    location: 'San Francisco, California',
    venue: 'StubHub',
    talks: [
      {
        id: 'react-fiber',
        date: '19 September 2017',
        time: '7p',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/rwreact/fiber',
          },
        ],
      },
    ],
  },
  {
    name: 'OpenRec 2017',
    url: 'http://openrecsf.com/',
    location: 'San Francisco, California',
    venue: 'Terra Gallery & Event Venue',
    talks: [
      {
        title: 'Hiring Through Non-Traditional Channels',
        date: '13 September 2017',
        time: '11:25a',
      },
    ],
  },
  {
    name: 'React Rally 2017',
    url: 'http://www.reactrally.com/',
    location: 'Salt Lake City, Utah',
    venue: 'Sheraton Salt Lake City Hotel',
    talks: [
      {
        id: 'react-fiber',
        title: 'Layperson’s guide to React Fiber',
        date: '24 August 2017',
        time: '2p',
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=q6QTxq_pFn0',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/reactrally/fiber',
          },
        ],
      },
    ],
  },
  {
    name: 'Node Summit 2017',
    url: 'http://www.nodesummit.com/',
    location: 'San Francisco, California',
    venue: 'Mission Bay Conference Center',
    talks: [
      {
        id: 'iso-react',
        date: '27 July 2017',
        time: '12p',
        room: 'Fisher East',
        links: [
          { label: 'Video', url: 'https://vimeo.com/229703092' },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/nodesummit/iso-react',
          },
        ],
      },
    ],
  },
  {
    name: 'Chain React 2017',
    url: 'https://infinite.red/ChainReactConf',
    location: 'Portland, Oregon',
    venue: 'The Armory',
    talks: [
      {
        id: 'react-esnext',
        title: 'React Native + ES.next = ♥',
        date: '10 July 2017',
        time: '11:30a',
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=nbtEwjRJXLo',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/chainreact/react-native-esnext',
          },
        ],
      },
    ],
  },
  {
    name: "O'Reily Fluent 2017",
    url: 'https://conferences.oreilly.com/fluent/fl-ca',
    location: 'San Jose, California',
    venue: 'San Jose Convention Center',
    talks: [
      {
        id: 'flexbox',
        date: '22 June 2017',
        time: '11a',
        room: '210 CG',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/fluent/flexbox',
          },
        ],
      },
    ],
  },
  {
    name: 'RevolutionConf 2017',
    url: 'http://revolutionconf.com/',
    location: 'Virginia Beach, Virginia',
    venue: 'Wyndham Virginia Beach Oceanfront',
    talks: [
      {
        id: 'nav-react',
        date: '02 June 2017',
        time: '2:30p',
        room: 'Atlantic Ballroom',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/revconf/nav-react',
          },
        ],
      },
      {
        id: 'es6-workshop',
        date: '01 June 2017',
        time: '2:30p',
        room: 'Mariner A',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/revconf/esnext',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/kentcdodds/es6-workshop',
          },
        ],
      },
    ],
  },
  {
    name: 'Modern Web Meetup May 2017',
    url: 'https://www.meetup.com/modernweb/events/239003827/',
    location: 'Mountain View, California',
    venue: 'Shape Security',
    talks: [
      {
        id: 'nav-react',
        date: '23 May 2017',
        time: '8p',
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=-6gfOJwwXvs',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/modernweb/nav-react',
          },
        ],
      },
    ],
  },
  {
    name: "O'Reilly OSCON Austin 2017",
    url: 'http://conferences.oreilly.com/oscon/oscon-tx',
    location: 'Austin, Texas',
    venue: 'Austin Convention Center',
    talks: [
      {
        id: 'react-properly',
        date: '10 May 2017',
        time: '2:35p',
        room: 'Meeting Room 12',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/oscon/react-properly',
          },
        ],
      },
    ],
  },
  {
    name: 'Fog City Ruby Meetup April 2017',
    url: 'https://www.meetup.com/fogcityruby/events/238787325/',
    location: 'San Francisco, California',
    venue: 'Braintree',
    talks: [
      {
        id: 'sweet-es6',
        date: '11 April 2017',
        time: '7:15p',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/fogcityruby/es6',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/learning-es6',
          },
        ],
      },
    ],
  },
  {
    name: 'Render Conference 2017',
    url: 'http://2017.render-conf.com/',
    location: 'Oxford, United Kingdom',
    venue: "The King's Centre",
    talks: [
      {
        id: 'iso-react',
        date: '30 March 2017',
        time: '11:55',
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=zxtcr8Zuvfs',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/render/iso-react',
          },
        ],
      },
    ],
  },
  {
    name: 'JazzCon.Tech 2017',
    url: 'http://jazzcon.tech/',
    location: 'New Orleans, Louisiana',
    venue: 'New Orleans Downtown Marriott at the Convention Center',
    talks: [
      {
        id: 'react-exposed',
        date: '24 March 2017',
        time: '10a',
        room: 'ReactJS track',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/jazzcon/react-exposed',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/react-exposed',
          },
        ],
      },
      {
        id: 'nav-react',
        date: '23 March 2017',
        time: '1p',
        room: 'ReactJS track',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/jazzcon/nav-react',
          },
        ],
      },
    ],
  },
  {
    name: 'Devoxx US 2017',
    url: 'http://devoxx.us/',
    location: 'San Jose, California',
    venue: 'San Jose Convention Center',
    talks: [
      {
        id: 'nav-react',
        date: '21 March 2017',
        time: '4:30p',
        room: 'Room LL 21C',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/devoxxus/nav-react',
          },
        ],
      },
    ],
  },
  {
    name: 'React Conf 2017',
    url: 'http://conf.reactjs.org/',
    location: 'Santa Clara, California',
    venue: 'Marriott Santa Clara',
    talks: [
      {
        id: 'react-esnext',
        date: '13 March 2017',
        time: '12:30p',
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=jh_Qzi-yHU0',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/reactconf/react-esnext',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/react-esnext',
          },
        ],
      },
    ],
  },
  {
    name: 'Reactathon 2017',
    url: 'http://reactathon.com/',
    location: 'San Francisco, California',
    venue: 'Eventbrite',
    talks: [
      {
        id: 'es6-workshop',
        date: '07 March 2017',
        time: '9a',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/reactathon/esnext',
          },
          {
            label: 'Workshop code',
            url: 'https://github.com/kentcdodds/es6-workshop',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/learning-es6',
          },
        ],
      },
    ],
  },
  {
    name: 'Mobile+Web DevCon 2017',
    url: 'http://mobilewebdevconference.com/san-francisco-2017/',
    location: 'San Francisco, California',
    venue: "Marines' Memorial Club & Hotel",
    talks: [
      {
        id: 'react-esnext',
        date: '03 March 2017',
        time: '10:30a',
        room: 'Track B: Web Development',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/mwdcon/react-esnext',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/react-esnext',
          },
        ],
      },
    ],
  },
  {
    name: 'Forward JS 2017',
    url: 'https://forwardjs.com/',
    location: 'San Francisco, California',
    venue: 'Holiday Inn - Golden Gateway',
    talks: [
      {
        id: 'react-exposed',
        date: '01 March 2017',
        time: '3:45p',
        room: 'Emerald',
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=cAYMqBU7Qko',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/forwardjs/react-exposed',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/react-exposed',
          },
        ],
      },
    ],
  },
  {
    name: 'Sabio LA 2017',
    url: 'http://www.sabio.la/',
    location: 'Los Angeles, California',
    venue: 'Antioch University',
    talks: [
      {
        id: 'es6-workshop',
        date: '21 February 2017',
        time: '7p',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/sabio/esnext',
          },
          {
            label: 'Workshop code',
            url: 'https://github.com/kentcdodds/es6-workshop',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/learning-es6',
          },
        ],
      },
    ],
  },
  {
    name: 'DeveloperWeek JavaScript Conference 2017',
    url: 'http://www.developerweek.com/javascript-conference/',
    location: 'San Francisco, California',
    venue: 'Pier 27',
    talks: [
      {
        id: 'nav-react',
        date: '14 February 2017',
        time: '10a',
        room: 'DeveloperWeek Expo Stage 1',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/devweek/nav-react',
          },
        ],
      },
    ],
  },
  {
    name: 'ReactJS San Francisco Bay Area Meetup 2017',
    url: 'http://www.meetup.com/ReactJS-San-Francisco/events/232284872/',
    location: 'San Francisco, California',
    venue: 'Eventbrite',
    talks: [
      {
        id: 'react-exposed',
        date: '09 February 2017',
        time: '7p',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/reactsf/react-exposed',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/react-exposed',
          },
        ],
      },
    ],
  },
  {
    name: 'BuzzJS 2.0 2017',
    url: 'http://buzzjs.com/',
    location: 'New York City, New York',
    venue: 'Microsoft Technology Center',
    talks: [
      {
        id: 'react-esnext',
        date: '27 January 2017',
        time: '2:50p',
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=fXWvcmrbX5M',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/buzzjs/react-esnext',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/react-esnext',
          },
        ],
      },
    ],
  },
  {
    name: 'Hackbright Academy January 2017',
    url: 'https://hackbrightacademy.com/',
    location: 'San Francisco, California',
    venue: 'Hackbright Academy',
    talks: [
      {
        id: 'sweet-es6',
        date: '12 January 2017',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2017/hackbright/es6',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/learning-es6',
          },
        ],
      },
    ],
  },
  {
    name: 'ConFoo Vancouver 2016',
    url: 'https://confoo.ca/en/yvr2016',
    location: 'Montreal, Canada',
    venue: 'Sheraton Vancouver Wall Centre',
    talks: [
      {
        id: 'sweet-es6',
        date: '06 December 2016',
        time: '4p',
        room: 'Pavilion A',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2016/confoo/sweet-es6',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/learning-es6',
          },
        ],
      },
      {
        id: 'flexbox',
        date: '05 December 2016',
        time: '10a',
        room: 'Pavilion B',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2016/confoo/flexbox',
          },
        ],
      },
    ],
  },
  {
    name: 'Thunder Plains Developer Conference 2016',
    url: 'http://thunderplainsconf.com/',
    location: 'Oklahoma City, Oklahoma',
    venue: 'Devon Boathouse',
    talks: [
      {
        id: 'react-esnext',
        date: '03 November 2016',
        time: '4p',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2016/thunderplains/react-esnext',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/react-esnext',
          },
        ],
      },
    ],
  },
  {
    name: 'Connect.Tech 2016',
    url: 'http://connect.tech/',
    location: 'Atlanta, Georgia',
    venue: 'Cobb Galleria Centre',
    talks: [
      {
        id: 'iso-react',
        title: 'Isomorphic React w/o Node??',
        date: '21 October 2016',
        time: '5:10p',
        room: 'React.JS track',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2016/connect/iso-react',
          },
        ],
      },
      {
        id: 'react-eco',
        date: '21 October 2016',
        time: '11:20a',
        room: 'React.JS track',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2016/connect/nav-react',
          },
        ],
      },
    ],
  },
  {
    name: 'Real World React 2016',
    url: 'http://www.meetup.com/Real-World-React/events/232638998/',
    location: 'San Francisco, California',
    venue: 'Eventbrite',
    talks: [
      {
        id: 'iso-react',
        title: 'Isomorphic React w/o Node??',
        date: '18 October 2016',
        time: '6:45p',
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=_bfZHCSkT3Q',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2016/rwreact/iso-react',
          },
        ],
      },
    ],
  },
  {
    name: 'NodeSummit 2016',
    url: 'http://nodesummit.com/',
    location: 'San Francisco, California',
    venue: 'The Village',
    talks: [
      {
        title: 'Evolution of Javascript IV',
        date: '28 July 2016',
        time: '9:30a',
        room: 'Main Stage',
        links: [
          {
            label: 'Video',
            url: 'https://vimeo.com/180426378',
          },
          { label: 'Blog post', url: '/nodesummit-2016/' },
        ],
      },
    ],
  },
  {
    name: 'Front Porch Austin 2016',
    url: 'http://frontporch.io/austin/',
    location: 'Austin, Texas',
    venue: 'Alamo Theater',
    talks: [
      {
        id: 'react-esnext',
        date: '19 July 2016',
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=Fs4bJr1b7UU',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2016/frontporch/react-esnext',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/react-esnext',
          },
          { label: 'Blog post', url: '/front-porch-austin-2016/' },
        ],
      },
    ],
  },
  {
    name: 'ReactJS San Francisco Bay Area Meetup 2016',
    url: 'http://www.meetup.com/ReactJS-San-Francisco/events/229270590/',
    location: 'San Francisco, California',
    venue: 'Bleacher Report',
    talks: [
      {
        id: 'react-esnext',
        date: '14 July 2016',
        time: '7:30p',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2016/reactsf/react-esnext',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/react-esnext',
          },
        ],
      },
    ],
  },
  {
    name: 'NDC Oslo 2016',
    url: 'http://ndcoslo.com/',
    location: 'Oslo, Norway',
    venue: 'Oslo Spektrum',
    talks: [
      {
        id: 'no-js',
        date: '10 June 2016',
        time: '1:40p',
        room: 'Room 7',
        links: [
          { label: 'Video', url: 'https://vimeo.com/171319733' },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2016/ndcoslo/no-js',
          },
          {
            label: 'Code examples',
            url: 'https://you-dont-need-js-for-that.benmvp.com/',
          },
          { label: 'Blog post', url: '/blog/ndc-oslo-2016/' },
        ],
      },
    ],
  },
  {
    name: 'Eventbrite Engineering 2016',
    url: 'http://www.eventbrite.com/engineering',
    location: 'San Francisco, California',
    talks: [
      {
        id: 'react-workshop',
        date: '26 May 2016',
        time: '9:30a',
        room: 'Eventbrite HQ',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2016/evbeng/react-workshop',
          },
          {
            label: 'Workshop repo',
            url: 'https://github.com/benmvp/react-workshop',
          },
        ],
      },
    ],
  },
  {
    name: 'Syntax Code & Craft Convention 2016',
    url: 'http://2016.syntaxcon.com/',
    location: 'Charleston, South Carolina',
    venue: 'College of Charleston',
    talks: [
      {
        id: 'no-js',
        date: '07 May 2016',
        time: '10:30a',
        room: 'Front-End II',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2016/syntaxcon/no-js',
          },
          {
            label: 'Code examples',
            url: 'https://you-dont-need-js-for-that.benmvp.com/',
          },
        ],
      },
      {
        id: 'sweet-es6',
        date: '06 May 2016',
        time: '9:30a',
        room: 'Front-End',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2016/syntaxcon/es6',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/learning-es6',
          },
        ],
      },
    ],
  },
  {
    name: 'Prairie Dev Con 2016',
    url: 'http://www.prairiedevcon.com/',
    location: 'Winnipeg, Canada',
    venue: 'CanadInns Destination Centre Polo Park',
    talks: [
      {
        id: 'sweet-es6',
        date: '12 April 2016',
        time: '1p',
        room: 'Ambassador 2',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2016/prdc/es6',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/learning-es6',
          },
        ],
      },
      {
        id: 'no-js',
        date: '11 April 2016',
        time: '9:45a',
        room: 'Ambassador 2',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2016/prdc/no-js',
          },
          {
            label: 'Code examples',
            url: 'https://you-dont-need-js-for-that.benmvp.com/',
          },
        ],
      },
    ],
  },
  {
    name: 'NationJS Node Day 2016',
    url: 'http://nationnode2016.herokuapp.com/',
    location: 'Washington, D.C.',
    venue: 'Capital One Auditorium',
    talks: [
      {
        id: 'sweet-es6',
        date: '11 March 2016',
        time: '11:15a',
        links: [
          {
            label: 'Video',
            url: 'https://vimeo.com/169948346',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2016/nationjs/es6',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/learning-es6',
          },
          { label: 'Blog post', url: '/nationjs-nodeday-2016/' },
        ],
      },
    ],
  },
  {
    name: 'ConFoo Montreal 2016',
    url: 'http://confoo.ca/en/2016/',
    location: 'Montreal, Canada',
    venue: 'Bonaventure Hotel',
    talks: [
      {
        id: 'demystifying-es6',
        date: '25 February 2016',
        time: '3p',
        room: 'Fontaine D',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2016/confoo/es6',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/learning-es6',
          },
        ],
      },
      {
        id: 'no-js',
        date: '24 February 2016',
        time: '3p',
        room: 'Hampstead',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2016/confoo/no-js',
          },
          {
            label: 'Code examples',
            url: 'https://you-dont-need-js-for-that.benmvp.com/',
          },
        ],
      },
    ],
  },
  {
    name: 'DeveloperWeek JavaScript Conference 2016',
    url: 'http://www.developerweek.com/javascript-conference/',
    location: 'San Francisco, California',
    venue: 'Pier 27',
    talks: [
      {
        id: 'sweet-es6',
        date: '16 February 2016',
        time: '3p',
        room: 'Workshop Room 1',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2016/devweek/es6',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/learning-es6',
          },
        ],
      },
    ],
  },
  {
    name: 'Sacramento JavaScript Meetup November 2015',
    url: 'http://www.meetup.com/The-Sacramento-Javascript-Meetup/',
    location: 'Sacramento, California',
    venue: 'The Urban Hive',
    talks: [
      {
        id: 'no-js',
        date: '24 November 2015',
        time: '7p',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2015/sacjs/no-js',
          },
          {
            label: 'Code examples',
            url: 'https://you-dont-need-js-for-that.benmvp.com/',
          },
        ],
      },
    ],
  },
  {
    name: 'Fossetcon 2015',
    url: 'http://fossetcon.org/2015/',
    location: 'Orlando, Florida',
    venue: 'Hilton Lake Buena Vista',
    talks: [
      {
        id: 'no-js',
        date: '20 November 2015',
        time: '2p',
        room: 'Palm 3',
        links: [
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2015/fossetcon/no-js',
          },
          {
            label: 'Code examples',
            url: 'https://you-dont-need-js-for-that.benmvp.com/',
          },
        ],
      },
    ],
  },
  {
    name: 'Nodevember 2015',
    url: 'http://nodevember.org/index.html',
    location: 'Nashville, Tennessee',
    venue: 'Lipscomb University',
    talks: [
      {
        id: 'es6',
        date: '14 November 2015',
        time: '1p',
        room: 'Ezell 301',
        links: [
          {
            label: 'Video',
            url: 'https://www.youtube.com/watch?v=x1BvUqmn8xA',
          },
          {
            label: 'Slides',
            url: 'https://slides.benmvp.com/2015/nodevember/es6',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/learning-es6',
          },
          { label: 'Blog post', url: '/nodevember-2015/' },
        ],
      },
    ],
  },
  {
    name: 'Little Rock Tech Fest 2015',
    url: 'http://lrtechfest.com/',
    location: 'Little Rock, Arkansas',
    venue: 'Statehouse Convention Center',
    talks: [
      {
        id: 'es6',
        date: '16 October 2015',
        time: '1:30p',
        room: 'Fulton',
        links: [
          {
            label: 'Video',
            url: 'http://usergroup.tv/videos/sugar-spice-and-everything-nice-about-es6',
          },
          {
            label: 'Slides',
            url: 'https://drive.google.com/file/d/0B3vWDhvtt22UNW9qQzlNb09JRDA/view',
          },
          {
            label: 'Code examples',
            url: 'https://github.com/benmvp/learning-es6',
          },
          { label: 'Blog post', url: '/little-rock-tech-fest-2015/' },
        ],
      },
    ],
  },
]
