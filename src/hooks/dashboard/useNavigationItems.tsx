import {
  BadgeCheck,
  BarChart,
  Card,
  Code,
  Cog,
  Home,
  PieChart,
  Refund,
  Users,
  Wallet,
} from 'components/svgs/dashboard/Icons_NavigationItems';

interface NavigationItem {
  icon: JSX.Element;
  title: string;
  id?: string;
  url?: string;
  isRoot?: boolean;
  showWhenUnverified?: boolean;
}

export const useNavigationItems = () => {
  const navigationItems = {
    Home: [
      {
        icon: <BadgeCheck />,
        title: 'Get Started',
        url: '/kyc',
        id: 'kyc',
        showWhenUnverified: true,
      },
      {
        icon: <Home />,
        title: 'Overview',
        isRoot: true,
      },
      {
        icon: <Wallet />,
        title: 'Wallet',
      },
      {
        icon: <BarChart />,
        title: 'Transactions',
      },
    ],
    'Spend Management': [
      {
        icon: <PieChart />,
        title: 'Budgeting',
      },
      {
        icon: <Refund />,
        title: 'Reimbursement',
      },
      {
        icon: <PieChart />,
        title: 'Analytics',
      },
      {
        icon: <Card />,
        title: 'Cards',
      },
    ],
    Others: [
      {
        icon: <Users />,
        title: 'Employees',
      },
      {
        icon: <Code />,
        title: 'Integrations',
      },
      {
        icon: <Cog />,
        title: 'Settings',
      },
    ],
  } as Record<string, NavigationItem[]>;

  return {
    navigationItems,
  };
};
