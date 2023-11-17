import { Input } from 'components/form-elements/Input';
import { Select } from 'components/form-elements/Select';
import { useGetCities } from 'hooks/api/address/useGetCities';
import { useGetCountries } from 'hooks/api/address/useGetCountries';
import { useGetStates } from 'hooks/api/address/useGetStates';

export const AddressInputGroup = ({ country }: { country: string }) => {
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
  } = useGetCities(country);

  return (
    <>
      <Select
        placeholder={'Select country'}
        label='Country'
        name='country'
        trueValueKey={'isoCode'}
        displayValueKey={'name'}
        options={countries}
        isLoading={loadingCountries}
        isError={countriesError}
      />

      <Input
        label='Address'
        placeholder={'Enter business address'}
        name='address'
      />

      <div className='gap-5 480:flex'>
        <Select
          placeholder={'Select state'}
          label='State'
          name='state'
          trueValueKey={'isoCode'}
          displayValueKey={'name'}
          options={states}
          isLoading={loadingStates && !!country}
          isError={statesError}
        />

        <Select
          placeholder={'Select city'}
          label='City'
          name='city'
          trueValueKey={'isoCode'}
          displayValueKey={'name'}
          options={cities}
          isLoading={loadingCities && !!country}
          isError={citiesError}
        />
      </div>
    </>
  );
};
