import { Input } from 'components/form-elements/Input';
import { Select } from 'components/form-elements/Select';
import { useGetCities } from 'hooks/api/address/useGetCities';
import { useGetCountries } from 'hooks/api/address/useGetCountries';
import { useGetStates } from 'hooks/api/address/useGetStates';
import { useEffect } from 'react';
import { SetFieldValue } from 'types/commons';

interface Props {
  country: string;
  state: string;
  setFieldValue: SetFieldValue;
}

export const AddressInputGroup = ({ country, state, setFieldValue }: Props) => {
  const {
    isLoading: loadingCountries,
    isError: countriesError,
    data: countries,
  } = useGetCountries();

  const {
    isLoading: loadingStates,
    isError: statesError,
    data: states,
  } = useGetStates(country);

  const {
    isLoading: loadingCities,
    isError: citiesError,
    data: cities,
  } = useGetCities(country, state);

  useEffect(() => {
    if (country || !countries?.length) return;

    setFieldValue(
      'country',
      countries?.find(({ isoCode }) => isoCode === 'NG')?.isoCode ?? ''
    );
  }, [countries]);

  return (
    <>
      <Input label='Address' placeholder={`Enter address`} name='address' />

      <div className='gap-5 480:flex'>
        <Select
          placeholder={'Select country'}
          label='Country'
          name='country'
          trueValueKey={'isoCode'}
          displayValueKey={'name'}
          listKeyModifieres={['name']}
          options={countries ?? []}
          isLoading={loadingCountries}
          isError={countriesError}
        />

        <Input
          label='Postal Code'
          placeholder={'Enter postal code'}
          name='postalCode'
        />
      </div>

      <div className='gap-5 480:flex'>
        <Select
          placeholder={'Select state'}
          label='State'
          name='state'
          trueValueKey={'isoCode'}
          displayValueKey={'name'}
          listKeyModifieres={['name']}
          options={states ?? []}
          isLoading={loadingStates && !!country}
          isError={statesError}
        />

        <Select
          placeholder={'Select city'}
          label='City'
          name='city'
          trueValueKey={'name'}
          displayValueKey={'name'}
          options={cities ?? []}
          listKeyModifieres={['latitude', 'longitude', 'name', 'stateCode']}
          isLoading={loadingCities && !!country && !!state}
          isError={citiesError}
        />
      </div>
    </>
  );
};
