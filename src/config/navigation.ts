import { testSound } from '~/components/fragmentPlayer/audio/AudioControls'
import { NavItem, PlayerNavItem } from '~/components/mobileNav'

export const navItemsResearcher: NavItem[] = [
  {
    title: 'download data',
    href: '/download',
  },
]

export const navItemsTemplate: NavItem[] = [
  {
    title: 'Levels beheren',
    href: '/manage/levels',
  },
  {
    title: 'Sublevels beheren',
    href: '/manage/sublevels',
  },
  {
    title: 'Fragmenten beheren',
    href: '/manage/fragments',
  },
  {
    title: 'Spelers beheren',
    href: '/manage/users',
  },
  {
    title: 'Team beheren',
    href: '/manage/team',
  },
  {
    title: 'App instellingen',
    href: '/manage/appSettings',
  },
  {
    title: 'Vragen',
    href: '/manage/questions',
  },
  {
    title: 'Fragment Groepen',
    href: '/manage/fragmentGroup',
  },
]

async function runTestSound() {
  await testSound()
}

function downloadPdf() {
  // try {
    // if (
    //   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    // ) {
      // For mobile devices, just try to open in a new tab
      setTimeout(() => {
        window.open('/media/sample.pdf', '_top')
      });
      // return
    // }

  //   const response = await fetch('/media/sample.pdf')
  //   if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
  //   const blob = await response.blob()
  //   const url = URL.createObjectURL(blob)

  //   const link = document.createElement('a')
  //   link.href = url
  //   link.target = '_blank'
  //   link.download = 'uitleg-musi-ci-2024.pdf'

  //   document.body.appendChild(link)
  //   link.click()
  //   document.body.removeChild(link)
  //   URL.revokeObjectURL(url)
  // } catch (error) {
  //   console.error('Error downloading the PDF:', error)
  // }
}

export const navItemsPlayer: PlayerNavItem[] = [
  {
    title: 'Ga naar podium',
    href: '/podium',
    enableAfterLogin: true,
    role: ['USER'],
  },
  {
    title: 'Bekijk uitleg',
    action: downloadPdf,
    enableAfterLogin: true,
  },
  {
    title: 'Test geluid',
    action: runTestSound,
    enableAfterLogin: false,
  },
  {
    title: 'Download data',
    href: '/download',
    enableAfterLogin: true,
    role: ['ADMIN', 'RESEARCHER'],
  },
]

export const roleHierarchy = {
  ADMIN: 3,
  RESEARCHER: 2,
  USER: 1,
}
