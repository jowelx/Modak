import React, { useRef, useEffect, FC, useState } from 'react'
import { Dimensions, FlatList, NativeSyntheticEvent, ScrollView, View } from 'react-native'
import { Container } from '../../components/UI/Ui'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import ArtCard from '../Arts/components/ArtCard'
import styled from '@emotion/native'
import { Text } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage'
const Title = styled(Text)({
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
})
const Header = styled(View)({
    marginTop: 10,
    marginBottom: 10
})
const FavoritesArts = () => {
    const { artWorks, lastPage, setLastPage, refresh, setRefresh, User, likesUpdate } = useContext(AppContext)
    const handleScroll = () => {
        if (refresh === false) {
            setLastPage(presValue => presValue + 1)
            setRefresh(true)

        }
    };

    const keyExtractor = (item: any, index: number) => `${item.id}-${index}`;
    const [likeArtWorks, setLikeWorks] = useState([]);

    const FilterData = async () => {
        try {

            const storedLikesJSON = await AsyncStorage.getItem('likes');
            const storedLikes = storedLikesJSON ? JSON.parse(storedLikesJSON) : [];

            const filteredWorks = artWorks.filter((artWork: any) => storedLikes.includes(artWork.id));

            setLikeWorks(filteredWorks);
        } catch (error) {
            console.error('Error filtrando datos:', error);
        }
    }
    const [userName, setUserName] = useState<any>('')
    const LoadName = async () => {
        let a = await User
        setUserName(a)
    }
    useEffect(() => {
        LoadName()
        FilterData()
    }, [likesUpdate])
    return (
        <Container>
            <View style={{ height: Dimensions.get('window').height * 0.9 }}>
                <Header>
                    <Title>
                        Estas son tus obras favoritas {userName}
                    </Title>
                </Header>

                <GestureHandlerRootView>
                    <FlatList
                        contentContainerStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        style={
                            {
                                flex: 1,
                                width: '100%',

                            }}
                        onEndReached={handleScroll}
                        data={likeArtWorks}
                        renderItem={({ item }) => <ArtCard data={item} />}
                        keyExtractor={keyExtractor}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                    />
                </GestureHandlerRootView>
            </View>


        </Container>

    )
}
export default FavoritesArts;