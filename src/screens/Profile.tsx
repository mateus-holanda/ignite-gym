import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, Text, ScrollView, Skeleton, useToast, VStack, Heading } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { ScreenHeader } from '@components/ScreenHeader';
import { UserAvatar } from '@components/UserAvatar';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

const AVATAR_SIZE = 33;

export function Profile() {
  const [avatarIsLoading, setAvatarIsLoading] = useState(false);
  const [userAvatar, setUserAvatar] = useState('https://github.com/mateus-holanda.png');

  const toast = useToast();

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

       if (avatarInfo.exists && (avatarInfo.size / 1024 / 1024) > 1) {
        return toast.show({
          title: 'This image is too big. Please, choose one up to 5MB.',
          placement: 'top',
          bgColor: 'red.500'
        });
       }

        setUserAvatar(avatarSelected.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAvatarIsLoading(false);
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
                source={{ uri: userAvatar }}
                alt="User profile picture"
                size={AVATAR_SIZE}
              />
          }

          <TouchableOpacity onPress={handleUserAvatarSelect}>
            <Text color="green.500" fontFamily="heading" fontSize="md" mt={2} mb={8}>
              Change avatar
            </Text>
          </TouchableOpacity>

          <Input
            bg="gray.600"
            value="Mateus Holanda"
          />

          <Input
            bg="gray.600"
            value="mateus23ita@gmail.com"
            isDisabled
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

          <Input
            bg="gray.600"
            placeholder="Old password"
            secureTextEntry
          />

          <Input
            bg="gray.600"
            placeholder="New password"
            secureTextEntry
          />

          <Input
            bg="gray.600"
            placeholder="Confirm new password"
            secureTextEntry
          />

          <Button
            title="Save changes"
            mt={4}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}