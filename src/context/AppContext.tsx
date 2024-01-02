import React, { SetStateAction, createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiController from '../api/ApiController';

interface AuthContextType {
    likesUpdate: boolean,
    idArtWork: number,
    setIdArtWork: React.Dispatch<SetStateAction<number>>,
    refresh: boolean,
    setRefresh: React.Dispatch<SetStateAction<boolean>>
    artWorks: never[],
    setArtWorks: React.Dispatch<SetStateAction<never[]>>,
    lastPage: number,
    setLastPage: React.Dispatch<SetStateAction<number>>
    User: Promise<string | null>;
    login: (user: string) => void,
    logout: () => void,
    UpdateLike: (id: number) => void,
}
const initialvalues = {
    likesUpdate: false,
    idArtWork: 0,
    setIdArtWork: () => { },
    refresh: false,
    setRefresh: () => { },
    artWorks: [],
    setArtWorks: () => () => { },
    lastPage: 1,
    setLastPage: () => { },
    User: Promise.resolve(''),
    login: () => { },
    logout: () => { },
    UpdateLike: () => { },
}

export const AppContext = createContext<AuthContextType>(initialvalues);

export const AppProvider: React.FC<any> = ({ children }) => {
    const [refresh, setRefresh] = useState(false)
    const [artWorks, setArtWorks] = useState([])
    const [likesUpdate, setLikedUpdate] = useState(false)
    const [lastPage, setLastPage] = useState(1)
    const [idArtWork, setIdArtWork] = useState<number>(0)
    const User = AsyncStorage.getItem('user')
    const login = (User: string) => {
        AsyncStorage.setItem('user', User)
    }
    const logout = () => {
        AsyncStorage.removeItem('user')
    }
    const LoadDataInitial = async () => {
        setLikedUpdate(true)
        const result = await ApiController.getDataByPage(lastPage)
        const data: any = [...artWorks, ...result.data.data]
        if (lastPage === 1) {
            setArtWorks(result.data.data)
            setLikedUpdate(false)
        } else {
            setLikedUpdate(false)
            setArtWorks(data)
            setRefresh(false)
        }
    }
    const UpdateLike = async (id: number) => {
        try {
            const currentLikesString = await AsyncStorage.getItem('likes');
            let currentLikes: number[] = currentLikesString ? JSON.parse(currentLikesString) : [];

            const index = currentLikes.indexOf(id);

            if (index !== -1) {
                currentLikes.splice(index, 1);
            } else {
                currentLikes.push(id);
            }

            await AsyncStorage.setItem('likes', JSON.stringify(currentLikes));

            console.log('Likes updated successfully:', currentLikes);
        } catch (error) {
            console.error('Error updating likes:', error);
        }
    }
    useEffect(() => {
        LoadDataInitial()
    }, [lastPage])
    return (
        <AppContext.Provider value={{
            likesUpdate,
            UpdateLike,
            idArtWork,
            setIdArtWork,
            lastPage,
            setLastPage,
            artWorks,
            setArtWorks,
            User,
            login,
            logout,
            refresh,
            setRefresh
        }}>
            {children}
        </AppContext.Provider>
    );
};
