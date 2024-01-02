import React, { FC } from 'react';
import Flag from 'react-native-country-flag';
import { countries } from 'countries-list';
import { View } from 'react-native';
interface CountryFlagType {
    country: string
}
const CountryFlag: FC<CountryFlagType> = ({ country }) => {
    const countryMapping: { [key: string]: string } = {
        'korea': 'South Korea',
        'holland': 'Netherlands',
        'london': 'United Kingdom',
        'moche valley': 'Peru',
        'paris': 'France'
    }
    const formattedCountryName = countryMapping[country?.toLowerCase()] ||
        country?.toLowerCase().replace(/\b\w/g, (l: string) => l.toUpperCase());
    const countryCode = Object.keys(countries as { [key: string]: { name: string } }).find(
        key => countries[key].name === formattedCountryName
    );

    return (
        <View>
            {countryCode ? <Flag
                style={{ borderRadius: 200, width: 26 }}
                isoCode={countryCode}
                size={24}
            /> : null}
        </View>
    )
}
export default CountryFlag