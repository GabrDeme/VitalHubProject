import React, { useState } from 'react';
import { Container } from '../../../components/Container/Style';
import { Logo } from '../../../components/Logo/Style';
import { Title } from '../../../components/Title/Style';
import { Input, InputValues } from '../../../components/Input/Input';
import { LinkMedium, UnderlinedLink } from '../../../components/Links/Style';
import { Button, ButtonFlex } from '../../../components/Button/Button';
import { ActivityIndicator, TurboModuleRegistry, View } from 'react-native';
import { ComeBack } from '../../../components/GoBackPage/GoBackPage';
import { APP_COLORS } from '../../../utils/App_colors';
import api, { LoginResource } from '../../../service/service';


const Login = ({ navigation }) => {

  const [selectUser, setSelectUser] = useState("")
  const [submitData, setSubmitData] = useState({
    email: "guilherme@guilherme.com",
    senha: "string"
  })
  const [loading, setLoading] = useState(false)

  console.log(submitData);

  async function handleSelectUser() {
    setLoading(true)
    if (selectUser === "Paciente") {
      navigation.navigate("DoctorHome"); // Adicione a página correspondente para outro tipo de usuário
    } else {

      try {
        const response = await api.post(LoginResource, submitData)

        console.log(response);

        navigation.navigate("HomePatient");

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }
  }

  return (

    <Container >
      <ComeBack
        onClick={() => navigation.navigate('Navegacao')}
        buttonOpacity={1}
      />

      <Logo source={require("../../../assets/Images/LogoBlue.png")} />
      <Title>Entrar ou criar conta</Title>

      <Input
        placeholder="Usuário ou E-mail"
        onChangeText={(txt) => setSubmitData({
          ...submitData,
          email: txt
        })}
      />

      <InputValues
        placeholder={"Senha"}
        secureTextEntry={true}
        onChangeText={(txt) => setSubmitData({
          ...submitData,
          senha: txt
        })}
      />

      <UnderlinedLink
        textIntput={"Esqueceu a sua senha?"}
        ColorText={APP_COLORS.grayV4}
        buttonOpacity={.8}
        textAlign={'flex-start'}
        onClick={() => navigation.navigate('Cadastro')}
        buttonAlign={'flex-start'}
      />

      <Button
        color={APP_COLORS.white}
        border={APP_COLORS.secondary}
        activeOpacity={1}
        title={!loading ? "Entrar".toUpperCase() : <ActivityIndicator size='small' color="#fff" />}
        marginTop={15}
        buttonOppacity={0.8}
        backgroundColor={APP_COLORS.secondary}
        onPress={() => handleSelectUser()}
      />

      <ButtonFlex>
        <Button
          border={APP_COLORS.secondary}
          marginTop={15}
          color={APP_COLORS.secondary}
          title={"Entrar com Google".toUpperCase()}
          buttonOppacity={.8}
        />
      </ButtonFlex>

      <View style={{ flexDirection: "row", justifyContent: "center", alignSelf: "center", justifyContent: 'space-between', width: "90%", gap: -60 }}>
        <LinkMedium>
          Não tem conta ?
        </LinkMedium>

        <UnderlinedLink
          textIntput={'Criar uma conta agora!'}
          ColorText={APP_COLORS.secondary}
          buttonOpacity={.8}
          onClick={() => navigation.navigate("CadastroUser")}
          buttonAlign={'end'}
        />
      </View>
    </Container>
  );
};

export default Login;