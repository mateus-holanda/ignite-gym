import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { Center, Heading, Image, ScrollView, Text, VStack } from 'native-base';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.jpg';

interface FormDataProps {
  email: string;
  password: string;
}

const signInSchema = yup.object({
  email: yup.string().required('Please, inform your e-mail.').email('Please, enter a valid e-mail.'),
  password: yup.string().required('Please, inform your password.').min(6, 'The password must have at least 6 caracters.')
});

export function SignIn() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema)
  });

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  function handleSignIn() {

  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      top={0}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="People training at the gym"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Train your body and mind
          </Text>
        </Center>

        <Center my={24}>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Access your account
          </Heading>

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange }}) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange }}) => (
              <Input
                placeholder="Password"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
                returnKeyType="send"
              />
            )}
          />

          <Button title="Sign in" onPress={handleSubmit(handleSignIn)} />
        </Center>

        <Center>
          <Text
            color="gray.100"
            fontSize="sm"
            fontFamily="body"
            mb={3}
          >
            Don't have an account yet?
          </Text>

          <Button
            title="Sign up"
            variant="outline"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}