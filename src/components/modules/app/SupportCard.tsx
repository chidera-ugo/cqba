import { Avatar } from 'components/commons/Avatar';
import { MailIcon, PhoneIcon } from 'components/svgs/contact/ContactIcons';

export const SupportCard = () => {
  return (
    <div
      className={
        'y-center rounded-[14px] border border-neutral-140 bg-neutral-160 p-5'
      }
    >
      <div className='hidden w-full rounded-[10px] border border-[#CED7FF] bg-[#F0F4FF] p-2.5 text-center text-[11px] text-primary-main 640:block'>
        I’m here to assist you anytime you need it
      </div>

      <div className='mx-auto ml-0 flex gap-2 640:mt-4 640:ml-auto 640:block'>
        <div className='my-auto block 640:hidden'>
          <Avatar size={42} />
        </div>

        <div className='hidden justify-center 640:flex'>
          <Avatar size={60} />
        </div>

        <div className='text-left 640:mt-2 640:text-center'>
          <h5 className={'text-medium text-base'}>Lydia Solomon</h5>
          <p className='mt-0.5 text-xs text-primary-main'>Account Manager</p>
        </div>
      </div>

      <div className='mt-4 w-full border-t border-neutral-140 pt-4'>
        <a
          rel={'noopenner noreferrer'}
          target={'_blank'}
          className={
            'flex gap-1 text-sm hover:text-primary-main 640:justify-center'
          }
          href={'tel:+234703673637'}
        >
          <span className={'my-auto'}>
            <PhoneIcon />
          </span>
          <span className={'my-auto'}>+23470 367 3637</span>
        </a>

        <a
          rel={'noopenner noreferrer'}
          target={'_blank'}
          className={
            'mt-1 flex gap-1.5 text-sm hover:text-primary-main 640:justify-center'
          }
          href={'mailto:lydia@chequebase.io'}
        >
          <span className={'my-auto'}>
            <MailIcon />
          </span>
          <span className={'my-auto'}>lydia@chequebase.io</span>
        </a>
      </div>
    </div>
  );
};
