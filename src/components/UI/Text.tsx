import styled from '@emotion/native';
import { Text } from 'react-native-paper';
import { TitleColor } from '../../constants/Colors';

export const Title = styled(Text)({
    width: '100%',
    textAlign: 'center',
    fontSize: 40,
    color: TitleColor,
    marginBottom: '6%'
})