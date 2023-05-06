import { TouchableOpacity } from 'react-native';
import { Heading, HStack, Icon, Text, VStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

import { UserAvatar } from './UserAvatar';

export function HomeHeader() {
  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserAvatar
        source={{ uri: 'https://github.com/mateus-holanda.png'}}
        alt="User profile picture"
        size={16}
        mr={4}
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Hi,
        </Text>

        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          Mateus
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon
          as={MaterialIcons}
          name="logout"
          color="gray.200"
          size={7}
        />
      </TouchableOpacity>
    </HStack>
  );
}