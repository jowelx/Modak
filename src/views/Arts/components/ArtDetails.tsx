import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, Dimensions } from 'react-native';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import styled from '@emotion/native'
import { Text } from 'react-native';
import { Chip } from 'react-native-paper';
import CountryFlag from '../../../components/CountryFlag';
import Like from '../../../components/Like';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Header = styled(View)({
    width: '100%',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'flex-start'
})
const Title = styled(Text)({
    color: 'rgb(80,80,80)',
    width: '100%',
    fontSize: 25,
    fontWeight: 'bold'
})
const TextContent = styled(Text)({
    color: 'rgb(50,50,50)',
    fontSize: 18,
})
const Row = styled(View)({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between'
})
const Start = styled(View)({
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 5,
    justifyContent: 'flex-start'
})
const HistoryText = styled(Text)({
    fontSize: 14,

    color: 'rgb(120,120,120)',
})
const TitleSection = styled(Text)({
    color: 'rgb(80,80,80)',
    width: '100%',
    fontSize: 18,
    fontWeight: 'bold'
})
const ArtDetails = () => {
    const { idArtWork, artWorks, UpdateLike } = useContext(AppContext)
    const [data, setData] = useState<any>({})

    const [isLiked, setIsLiked] = useState(false);
    const { height, width } = Dimensions.get('window')
    useEffect(() => {
        const filter: any = artWorks.filter((e: any) => e.id === idArtWork)[0]
        setData(filter)
    }, [])
    const checkIfIdExistsInLikes = async (id: number) => {
        try {
            // Recuperar el array de likes desde AsyncStorage
            const currentLikesString = await AsyncStorage.getItem('likes');
            const currentLikes: number[] = currentLikesString ? JSON.parse(currentLikesString) : [];
            if (currentLikes.includes(id)) {
                // UpdateLike(data.id);
                console.log('si se encuentra en array')
                setIsLiked(true);
            } else {
                // UpdateLike(data.id);
                setIsLiked(false);
                console.log('no se encuentra en array')
            }

            // Verificar si el id proporcionado existe en el array

        } catch (error) {
            console.error('Error checking likes:', error);
            //   return false;
        }
    }
    const onPressLikes = async (id: number) => {
        try {
            console.log('click')
            // Recuperar el array de likes desde AsyncStorage
            const currentLikesString = await AsyncStorage.getItem('likes');
            const currentLikes: number[] = currentLikesString ? JSON.parse(currentLikesString) : [];
            if (currentLikes.includes(id)) {
                setIsLiked(false);
                UpdateLike(data.id);

            } else {
                setIsLiked(true);
                UpdateLike(data.id);

            }

        } catch (error) {
            console.error('Error checking likes:', error);
        }
    }
    useEffect(() => {
        if (data.id) {
            checkIfIdExistsInLikes(data.id)
        }

    }, [data])
    return (
        <View style={{ backgroundColor: 'white', paddingHorizontal: 10, width: width }}>

            {data.classification_titles ? <ScrollView style={{ height: height * 0.88, }}
                contentContainerStyle={{
                    alignItems: 'center',
                }}>
                <Header>
                    <Title>
                        {data.title}
                    </Title>
                </Header>
                <Image
                    width={400}
                    height={400}
                    style={{
                        borderRadius: 2,
                    }}
                    onError={(e) => console.log(e.nativeEvent.error)}
                    source={{ uri: `https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg` }} />
                <Start>
                    {data.classification_titles.map((item: any, index: number) => {
                        return <Chip key={index} onPress={() => console.log('Pressed')}>{item}</Chip>
                    })}
                </Start>
                <Row>
                    <View>
                        <TitleSection>
                            Artista
                        </TitleSection>
                        <TextContent>
                            {data.artist_title}
                        </TextContent>
                    </View>

                    <Like touched={isLiked} onPress={() => onPressLikes(data.id)} />
                </Row>
                <Row>
                    <View>
                        <TitleSection>
                            Pais
                        </TitleSection>
                        <CountryFlag country={data.place_of_origin} />
                    </View>
                </Row>
                <Row>
                    <View>
                        <TitleSection>
                            Año
                        </TitleSection>
                        <TextContent>
                            {data.date_end}-{data.date_start}
                        </TextContent>
                    </View>
                </Row>
                <Row>
                    {data.publication_history ? <View>
                        <TitleSection>
                            Descripcion
                        </TitleSection>
                        <HistoryText>
                            {data.publication_history}
                        </HistoryText>
                    </View> : null}
                </Row>
            </ScrollView> : null}
        </View>
    )
}
export default ArtDetails;