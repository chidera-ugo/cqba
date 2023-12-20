import {
  SubscriptionPlan,
  PlanFeature,
} from 'hooks/api/subscriptions/useGetAllSubscriptionPlans';
import { handleGrouping } from 'utils/handlers/handleGrouping';

export type RowPlan = {
  featureName?: string;
  freeUnits?: number;
  available?: boolean;
  maxUnits?: number;
  costPerUnit?: {
    NGN: number;
  };
};

type Row = {
  name: string;
  group: string;
  featureCode?: string;
  description: string;
  plans?: Record<string, RowPlan>;
};

function getFeatureCodes(data: SubscriptionPlan[]) {
  const features: (PlanFeature & { planCode: string })[] = [];
  const featureCodes: Record<
    string,
    { name: string; description: string; group: string }
  > = {};

  if (!data)
    return {
      features,
      featureCodes,
    };

  for (const i of data) {
    features.push(
      ...i.features.map((feature) => ({
        ...feature,
        planCode: i.code,
      }))
    );
  }

  for (const i of features) {
    featureCodes[i.code] = {
      name: i.name,
      description: i.description,
      group: i.group,
    };
  }

  return {
    featureCodes,
    features,
  };
}

export function getPlansRows(data: SubscriptionPlan[]) {
  const { featureCodes, features } = getFeatureCodes(data);

  const codes: Record<string, Row> = { ...featureCodes };

  for (const {
    code,
    planCode,
    freeUnits,
    costPerUnit,
    available,
    maxUnits,
    name,
  } of features) {
    const existingCode = codes[code];

    codes[code] = {
      ...existingCode!,
      plans: {
        ...existingCode?.plans,
        [planCode]: {
          featureName: name,
          freeUnits,
          maxUnits,
          available,
          costPerUnit,
        },
      },
    };
  }

  const rows: Row[] = [];

  for (const i in codes) {
    rows.push({
      ...codes[i]!,
      featureCode: i,
    });
  }

  return handleGrouping(rows, 'group') as Record<string, Row[]>;
}
