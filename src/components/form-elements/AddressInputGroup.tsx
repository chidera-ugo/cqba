import { Input } from 'components/form-elements/Input';
import { Select } from 'components/form-elements/Select';
import { useGetCities } from 'hooks/api/address/useGetCities';
import { useGetCountries } from 'hooks/api/address/useGetCountries';
import { useGetStates } from 'hooks/api/address/useGetStates';

export const AddressInputGroup = ({
  country,
  state,
}: {
  country: string;
  state: string;
}) => {
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

  return (
    <>
      <div className='gap-5 480:flex'>
        <Select
          placeholder={'Select country'}
          label='Country'
          name='country'
          trueValueKey={'isoCode'}
          displayValueKey={'name'}
          listKeyModifieres={['name']}
          options={countries}
          isLoading={loadingCountries}
          isError={countriesError}
        />

        <Input
          label='Postal Code'
          placeholder={'Enter postal code'}
          name='postalCode'
        />
      </div>

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
          listKeyModifieres={['name']}
          options={states}
          isLoading={loadingStates && !!country}
          isError={statesError}
        />

        <Select
          placeholder={'Select city'}
          label='City'
          name='city'
          trueValueKey={'stateCode'}
          displayValueKey={'name'}
          options={cities}
          listKeyModifieres={['latitude', 'longitude', 'name', 'stateCode']}
          isLoading={loadingCities && !!country && !!state}
          isError={citiesError}
        />
      </div>
    </>
  );
};
