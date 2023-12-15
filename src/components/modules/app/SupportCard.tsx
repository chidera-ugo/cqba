import { Avatar } from 'components/commons/Avatar';
import { MailIcon, PhoneIcon } from 'components/svgs/contact/ContactIcons';

export const SupportCard = () => {
  return (
    <div
      className={
        'y-center rounded-[14px] border border-neutral-140 bg-neutral-160 p-5'
      }
    >
      <div className='w-full rounded-[10px] border border-[#CED7FF] bg-[#F0F4FF] p-2.5 text-center text-[11px] text-primary-main'>
        I’m here to assist you anytime you need it
      </div>

      <div className='mx-auto mt-4'>
        <div className='x-center'>
          <Avatar size={60} />
        </div>

        <div className='mt-2 text-center'>
          <h5 className={'text-medium text-base'}>Lydia Solomon</h5>
          <p className='mt-0.5 text-xs text-primary-main'>Account Manager</p>
        </div>
      </div>

      <div className='mt-4 w-full border-t border-neutral-140 pt-4'>
        <a
          rel={'noopenner noreferrer'}
          target={'_blank'}
          className={'x-center flex gap-1 text-sm hover:text-primary-main'}
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
            'x-center mt-1 flex gap-1.5 text-sm hover:text-primary-main'
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
