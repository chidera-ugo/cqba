import { SmallCheck } from 'components/svgs/others/Check';
import { passwordValidation } from 'constants/validation/password_validation';

export const PasswordRequirementsCheckList = ({
  password,
}: {
  password: string;
}) => (
  <div className='mt-4 flex flex-wrap gap-2 rounded-xl border p-3 align-middle'>
    {passwordValidation.map(({ check, name }) => {
      return (
        <div key={name} className={'flex'}>
          <span className='my-auto mr-1.5'>
            {check(password) ? (
              <SmallCheck />
            ) : (
              <svg
                width='17'
                height='18'
                viewBox='0 0 17 18'
                fill='none'
                className={'h-4 w-4'}
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M5.33828 4.93672C5.08932 4.68776 4.68568 4.68776 4.43672 4.93672C4.18776 5.18568 4.18776 5.58932 4.43672 5.83828L7.59844 9L4.43672 12.1617C4.18776 12.4107 4.18776 12.8143 4.43672 13.0633C4.68568 13.3122 5.08932 13.3122 5.33828 13.0633L8.5 9.90156L11.6617 13.0633C11.9107 13.3122 12.3143 13.3122 12.5633 13.0633C12.8122 12.8143 12.8122 12.4107 12.5633 12.1617L9.40156 9L12.5633 5.83828C12.8122 5.58932 12.8122 5.18568 12.5633 4.93672C12.3143 4.68776 11.9107 4.68776 11.6617 4.93672L8.5 8.09844L5.33828 4.93672Z'
                  fill='#F34141'
                />
              </svg>
            )}
          </span>
          <span className='my-auto text-xs leading-[16px] text-black 640:text-sm'>
            {name}
          </span>
        </div>
      );
    })}
  </div>
);
