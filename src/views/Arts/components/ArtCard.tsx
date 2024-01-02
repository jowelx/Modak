import React, { FC, useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import styled from '@emotion/native'
import { Image } from 'react-native'
import { Text } from 'react-native'
import { Dimensions } from 'react-native'
import CountryFlag from '../../../components/CountryFlag'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AppContext } from '../../../context/AppContext'
import Like from '../../../components/Like'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Card = styled(View)({
    width: Dimensions.get('window').width * 0.9,
    backgroundColor: 'white',
    elevation: 4,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
})
const Title = styled(Text)({
    color: 'rgb(60,60,60)',
    width: '80%',
})
const Header = styled(View)({
    width: '100%',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between'
})
const BodyCard = styled(View)({
    width: '100%',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
})
const TextCard = styled(Text)({
    color: 'rgb(80,80,80)',
    textAlign: 'left',
    width: '93%',
    paddingRight: 10
})
const ArtCard: FC<any> = ({ data }) => {
    const { setIdArtWork, likesUpdate } = useContext(AppContext)
    const { id, alt_image_ids, image_id, title, artist_title, place_of_origin } = data
    const [isLiked, setIsLiked] = useState(false)
    const navigation = useNavigation();
    const goToDetails = () => {
        setIdArtWork(id)
        navigation.navigate('ArtDetails');
        console.log('cd')
    };
    const checkIfIdExistsInLikes = async (id: number) => {
        try {
            const currentLikesString = await AsyncStorage.getItem('likes');
            const currentLikes: number[] = currentLikesString ? JSON.parse(currentLikesString) : [];
            if (currentLikes.includes(id)) {
                console.log('si se encuentra en array')
                setIsLiked(true);
            } else {
                setIsLiked(false);
                console.log('no se encuentra en array')
            }
        } catch (error) {
            console.error('Error checking likes:', error);
        }
    }
    useEffect(() => {
        if (id) {
            checkIfIdExistsInLikes(id)
        }
    }, [data, isLiked, likesUpdate])
    return (
        <TouchableOpacity onPress={goToDetails}>
            <Card>
                <Image
                    width={350}
                    height={350}
                    style={{
                        borderRadius: 2,
                    }}
                    onError={(e) => console.log(e.nativeEvent.error)}
                    source={{ uri: `https://www.artic.edu/iiif/2/${image_id || alt_image_ids[0]}/full/843,/0/default.jpg` }} />
                <Header>
                    <Title>
                        {title}
                    </Title>
                    <Like touched={isLiked} />
                </Header>
                <BodyCard>
                    <TextCard>
                        {artist_title}
                    </TextCard>
                    <CountryFlag country={place_of_origin} />
                </BodyCard>
            </Card>
        </TouchableOpacity>


    )
}
export default ArtCard