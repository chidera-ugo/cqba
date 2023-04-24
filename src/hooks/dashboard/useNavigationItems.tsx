import {
  BadgeCheck,
  BarChart,
  Card,
  Code,
  Cog,
  Columns,
  Home,
  OpenEnvelope,
  PieChart,
  Refund,
  Users,
  Wallet,
} from 'components/svgs/dashboard/Icons_NavigationItems';

interface NavigationItem {
  icon: JSX.Element;
  title: string;
  isRoot?: boolean;
  showTooltip?: boolean;
  showWhenUnverified?: boolean;
}

export const useNavigationItems = () => {
  const navigationItems = {
    Home: [
      {
        icon: <BadgeCheck />,
        title: 'Get Started',
        showWhenUnverified: true,
      },
      {
        icon: <Home />,
        title: 'Overview',
        isRoot: true,
        showTooltip: true,
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
    Organisation: [
      {
        icon: <Card />,
        title: 'Cards',
      },
      {
        icon: <PieChart />,
        title: 'Budgeting',
      },
      {
        icon: <Columns />,
        title: 'Sub Accounts',
      },
      {
        icon: <Refund />,
        title: 'Reimbursement',
      },
    ],
    Others: [
      {
        icon: <OpenEnvelope />,
        title: 'Notifications',
      },
      {
        icon: <Users />,
        title: 'Employee',
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
