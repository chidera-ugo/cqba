import { SettingsLayout } from 'components/layouts/SettingsLayout';
import { ActivePlan } from 'components/modules/settings/license/ActivePlan';
import { CancelPlan } from 'components/modules/settings/license/CancelPlan';
import Link from 'next/link';
import { useState } from 'react';

export default function License() {
  const [showModal, setShowModal] = useState(false);

  return (
    <SettingsLayout title={'License'}>
      <CancelPlan {...{ showModal, setShowModal }} />

      <div className='x-between card block 1024:flex'>
        <ActivePlan />

        <div className='y-between mt-8 border-t border-neutral-200 pt-4 1024:border-t-0'>
          <div></div>

          <div className={'text-left 1024:text-right'}>
            <Link
              href={'/settings/license/manage-subscription'}
              className={'text-button block py-1 font-medium text-black'}
            >
              Manage my subscription
            </Link>

            <div className={'text-button py-1 font-medium text-black'}>
              I need help with a billing issue
            </div>

            <button
              onClick={() => setShowModal(true)}
              className={
                'text-button inline-block py-1 font-medium text-red-500'
              }
            >
              Cancel Plan
            </button>
          </div>
        </div>
      </div>
    </SettingsLayout>
  );
}
