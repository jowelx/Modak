import React, { FC } from 'react';
import { Image } from 'react-native';
import { TouchableOpacity, View } from 'react-native';
interface LikeType {
    touched: boolean | Promise<boolean>;
    onPress?: () => void
}

const Like: FC<LikeType> = ({ touched, onPress }) => {
    const icon = touched ? require('../assets/heartc.png') : require('../assets/heart.png');
    return <View>
        <TouchableOpacity onPress={onPress}>
            <Image
                style={{ width: 24, height: 24 }}
                source={icon} />
        </TouchableOpacity>
    </View>
}
export default Like;