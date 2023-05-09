import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { Center, Text, ScrollView, Skeleton, useToast, VStack, Heading } from 'native-base';
import { yupResolver } from '@hookform/resolvers/yup';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as yup from 'yup';

import { api } from '@services/api';

import { useAuth } from '@hooks/useAuth';

import { ScreenHeader } from '@components/ScreenHeader';
import { UserAvatar } from '@components/UserAvatar';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { AppError } from '@utils/AppError';

import defaultUserAvatarImg from '@assets/userAvatarDefault.png';

const AVATAR_SIZE = 33;

interface FormDataProps {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
}

const profileSchema = yup.object({
  name: yup.string().required('Please, inform your name.'),
  password: yup
    .string()
    .min(6, 'The password must contains at least 6 caracters.')
    .nullable()
    .transform((value) => !!value ? value : null),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => !!value ? value : null)
    .oneOf([yup.ref('password')], "The provided passwords don't mach.")
    .when('password', {
      is: (Field: any) => Field,
      then: (schema) => schema.nullable().required('Please, confirm the new password.').transform((value) => !!value ? value : null)
    })
});

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [avatarIsLoading, setAvatarIsLoading] = useState(false);

  const toast = useToast();

  const { user, updateUserProfile } = useAuth();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email
    },
    resolver: yupResolver(profileSchema)
  });

  async function handleUserAvatarSelect() {
    setAvatarIsLoading(true);

    try {
      const avatarSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      });

      if (avatarSelected.canceled) {
        return;
      }

      if (avatarSelected.assets[0].uri) {
        const avatarInfo = await FileSystem.getInfoAsync(avatarSelected.assets[0].uri, { size: true });

        if (avatarInfo.exists && (avatarInfo.size / 1024 / 1024) > 5) {
          return toast.show({
            title: 'This image is too big. Please, choose one up to 5MB.',
            placement: 'top',
            bgColor: 'red.500'
          });
        }

        const fileExtension = avatarSelected.assets[0].uri.split('.').pop();

        const avatarFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase(),
          uri: avatarSelected.assets[0].uri,
          type: `${avatarSelected.assets[0].type}/${fileExtension}` 
        } as any;

        const userAvatarUploadForm = new FormData();
        userAvatarUploadForm.append('avatar', avatarFile);

        const avatarUpdatedResponse = await api.patch('/users/avatar', userAvatarUploadForm, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        toast.show({
          title: 'Avatar updated successfully!',
          placement: 'top',
          bgColor: 'green.700'
        });

        const userUpdated = user;
        userUpdated.avatar = avatarUpdatedResponse.data.avatar;
        updateUserProfile(userUpdated);
      }
    } catch (error) {
      throw error;
    } finally {
      setAvatarIsLoading(false);
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true);

      await api.put('/users', data);

      const userUpdated = user;
      userUpdated.name = data.name;

      await updateUserProfile(userUpdated);

      toast.show({
        title: 'Profile updated successfully!',
        placement: 'top',
        bgColor: 'green.700'
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "It wasn't possible to update your profile. Please, try again later";
    
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Profile" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {
            avatarIsLoading ?
              <Skeleton
                w={AVATAR_SIZE}
                h={AVATAR_SIZE}
                rounded="full"
                startColor="gray.400"
                endColor="gray.300"
              />
              :
              <UserAvatar
                source={
                  user.avatar
                    ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                    : defaultUserAvatarImg
                }
                alt="User profile picture"
                size={AVATAR_SIZE}
              />
          }

          <TouchableOpacity onPress={handleUserAvatarSelect}>
            <Text color="green.500" fontFamily="heading" fontSize="md" mt={2} mb={8}>
              Change avatar
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange }}) => (
              <Input
                bg="gray.600"
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
                bg="gray.600"
                placeholder="E-mail"
                value={value}
                onChangeText={onChange}
                isDisabled
              />
            )}
          />

          <Heading
            color="gray.200"
            fontSize="md"
            fontFamily="heading"
            alignSelf="flex-start"
            mb={2}
            mt={12}
          >
            Change password
          </Heading>

          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange }}) => (
              <Input
                bg="gray.600"
                placeholder="Old password"
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange }}) => (
              <Input
                bg="gray.600"
                placeholder="New password"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange }}) => (
              <Input
                bg="gray.600"
                placeholder="Confirm new password"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button
            title="Save changes"
            mt={4}
            isLoading={isUpdating}
            onPress={handleSubmit(handleProfileUpdate)}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}