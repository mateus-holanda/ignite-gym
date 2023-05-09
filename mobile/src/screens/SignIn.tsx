import * as yup from 'yup';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { Center, Heading, Image, ScrollView, Text, useToast, VStack } from 'native-base';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import { AppError } from '@utils/AppError';

import { useAuth } from '@hooks/useAuth';

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
  password: yup.string().required('Please, inform your password.').min(6, 'The password must contains at least 6 caracters.')
});

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema)
  });

  const { signIn } = useAuth();

  const toast = useToast();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'There was an error trying to log in. Please, try again later.';
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });

      setIsLoading(false);
    }
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

          <Button
            title="Sign in"
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />
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