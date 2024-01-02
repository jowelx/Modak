import React, { useRef, useEffect, FC } from 'react'
import { FlatList, NativeSyntheticEvent, ScrollView } from 'react-native'
import { Container } from '../../../components/UI/Ui'
import { useContext } from 'react'
import { AppContext } from '../../../context/AppContext'
import ArtCard from './ArtCard'
const ListArts = () => {
    const { artWorks, lastPage, setLastPage, refresh, setRefresh } = useContext(AppContext)
    const handleScroll = () => {
        if (refresh === false) {
            setLastPage(presValue => presValue + 1)
            setRefresh(true)
        }
    };

    const keyExtractor = (item: any, index: number) => `${item.id}-${index}`; // Asume que cada item tiene una propiedad "id"

    return (
        <Container>
            <FlatList
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                style={{
                    flex: 1,
                    width: '100%',
                }}
                onEndReached={handleScroll}
                data={artWorks}
                renderItem={({ item }) => <ArtCard data={item} />}
                keyExtractor={keyExtractor}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            />
        </Container>

    )
}
export default ListArts;