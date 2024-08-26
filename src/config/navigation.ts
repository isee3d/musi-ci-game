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
    const link = document.createElement('a');
    link.href = '/media/sample.pdf';
    link.download = 'uitleg-musi-ci-2024.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export const navItemsPlayer: PlayerNavItem[] = [
  {
    title: 'Ga naar podium',
    href: '/podium',
    enableAfterLogin: true,
    role: ['USER'],
  },
  {
    title: 'Ga naar uitleg',
    href: '/tutorial',
    enableAfterLogin: false,
  },
  {
    title: 'Test geluid',
    action: runTestSound,
    enableAfterLogin: false,
  },
  {
    title: 'Download pdf',
    action: downloadPdf,
    enableAfterLogin: true,
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
