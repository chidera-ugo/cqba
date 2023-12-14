import {
  Approval,
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
import { UserRole } from 'enums/employee_enum';
import { useRouter } from 'next/router';
import { convertToUrlString } from 'utils/converters/convertToUrlString';

interface NavigationItem {
  icon: JSX.Element;
  title: string;
  id?: string;
  isRoot?: boolean;
  showWhenUnverified?: boolean;
}

type NavigationItems = Record<string, NavigationItem[]>;

export const useNavigationItems = (role?: UserRole) => {
  const { pathname } = useRouter();

  const ownerNavigationItems = {
    Home: [
      {
        icon: <BadgeCheck />,
        title: 'Get Started',
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
        title: 'Budgets',
        id: 'budgeting',
      },
      {
        icon: <Approval />,
        title: 'Approvals',
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
  } as NavigationItems;

  const noneOwnerNavigationItems = {
    '': [
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
        icon: <PieChart />,
        title: 'Budgets',
        id: 'budgeting',
      },
      {
        icon: <Refund />,
        title: 'Reimbursement',
      },
      {
        icon: <Card />,
        title: 'Cards',
      },
      {
        icon: <Cog />,
        title: 'Settings',
      },
    ],
  } as NavigationItems;

  const navigationItems =
    role === 'owner' ? ownerNavigationItems : noneOwnerNavigationItems;

  function isValidRoute() {
    const arr: NavigationItem[] = [];

    for (const i in navigationItems) {
      arr.push(...navigationItems[i]!);
    }

    if (pathname === '/') return true;

    let isValid = false;

    for (const i of arr) {
      if (
        !!pathname
          .split('/')[1]
          ?.includes(i?.id ?? convertToUrlString(i?.title))
      )
        isValid = true;
    }

    return isValid;
  }

  return {
    navigationItems,
    isValidRoute,
  };
};
