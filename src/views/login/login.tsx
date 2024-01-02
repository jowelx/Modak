import React, { FC, useState, useContext } from 'react';
import { Image, View } from 'react-native';
import styled from '@emotion/native';
import { Center, Container, PrincipalButton } from '../../components/UI/Ui';
import { Input } from '../../components/UI/Ui';
import { Text } from 'react-native-paper';
import { AppContext } from '../../context/AppContext';
import { Title } from '../../components/UI/Text';
const Error = styled(Text)({
  color: 'red'
})
const Logo = styled(Image)({
  width: 150,
  height: 150,
  resizeMode: 'contain',
  marginBottom: '6%'
})
const Card = styled(View)({
  backgroundColor: 'rgba(250,250,250,1)',
  padding: 10,
  borderRadius: 10,
  width: '99%',
  height: '100%',
  display: 'flex',
  alignItems: 'center'
})


const LoginScreen: FC<any> = ({ navigation }) => {
  const [user, setUser] = useState('');
  const { login } = useContext(AppContext)
  const [error, setError] = useState('')


  const handleLogin = async () => {
    if (!user) {
      setError('Tienes que introducir tu cuenta}')

    } else {
      login(user);
      navigation.navigate('home')

    }
  }
  return <View>
    <Center>
      <Container>
        <Logo source={require('../../assets/modakLogo.png')} />
        <Card>
          <Title>
            ¡Bienvenido!
          </Title>
          <Input
            handleOnchange={setUser}
            placeholder='Nombre de usuario'
            value={user}
            label="Ingresa tu nombre de usuario"
          />
          {error && <Error>{error}</Error>}
          <PrincipalButton
            width={'80%'}
            marginBottom={5}
            onPress={() => handleLogin()}
          >
            Acceder
          </PrincipalButton>
        </Card>
      </Container>
    </Center>
  </View>;
};
export default LoginScreen;
