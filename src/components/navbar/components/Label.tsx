import React, { FC } from 'react'
import { label } from '../../../types/types';
import { PrimaryColor } from '../../../constants/Colors';
import { Text } from 'react-native-paper';
const CustomTabLabel: FC<label> = ({ label, focused }) => {
    return (
        <Text style={{ color: focused ? PrimaryColor : 'gray', fontSize: 12 }}>
            {label}
        </Text>
    );
}
export default CustomTabLabel