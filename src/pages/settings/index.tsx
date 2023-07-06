import { UpdateProfileInformationForm } from 'components/forms/settings/UpdateProfileInformationForm';
import { SettingsLayout } from 'components/layouts/SettingsLayout';

export default function Settings() {
  return (
    <SettingsLayout>
      <div className='rounded-xl border border-neutral-200 p-6'>
        <UpdateProfileInformationForm />
      </div>
    </SettingsLayout>
  );
}
