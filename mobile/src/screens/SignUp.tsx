import * as yup from 'yup';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { Center, Heading, Image, ScrollView, Text, useToast, VStack } from 'native-base';

import { api } from '@services/api';

import { useAuth } from '@hooks/useAuth';

import { AppError } from '@utils/AppError';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.jpg';

interface FormDataProps {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const signUpSchema = yup.object({
  name: yup.string().required('Please, inform your name.'),
  email: yup.string().required('Please, inform your e-mail.').email('Please, enter a valid e-mail.'),
  password: yup.string().required('Please, inform your password.').min(6, 'The password must contains at least 6 caracters.'),
  password_confirm: yup.string().required('Confirm your password.').oneOf([yup.ref('password')], "The provided passwords don't mach.")
});

const defaultValues = {
  name: '',
  email: '',
  password: '',
  password_confirm: ''
};

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  
  const navigation = useNavigation();

  const { signIn } = useAuth();

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
    defaultValues
  });

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {
      setIsLoading(true);

      await api.post('/users', { name, email, password });
      await signIn(email, password);

      reset(defaultValues);
    } catch(error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'There was an error trying to create a new account. Please, try again later';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10}>
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

        <Center my={8}>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Create your account
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange }}) => (
              <Input
                placeholder="Name"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

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
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { value, onChange }}) => (
              <Input
                placeholder="Confirm password"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password_confirm?.message}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
              />
            )}
          />

          <Button
            title="Create account"
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          />
        </Center>

        <Button
          title="Back to sign in"
          variant="outline"
          mt={11}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
}