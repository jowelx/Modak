import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import styled from '@emotion/native';

const Container = styled(View)({
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: 999
});

const Loader = () => {
    const { width, height } = Dimensions.get('window');

    return (
        <Container style={{ width: width, height: height }}>
            <Text style={{ color: 'white' }}>Cargando</Text>
        </Container>
    );
};

export default Loader;
