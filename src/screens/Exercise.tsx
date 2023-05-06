import { TouchableOpacity } from 'react-native';
import { Box, HStack, Heading, Icon, Image, ScrollView, Text, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { AppNavigatorRoutesProps } from '@routes/app.routes';

import { Button } from '@components/Button';

import BodySvg from '@assets/body.svg';
import SetsSvg from '@assets/sets.svg';
import RepetitionsSvg from '@assets/repetitions.svg';

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <VStack flex={1}>
      <VStack bg="gray.600" px={8} pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon
            as={Feather}
            name="arrow-left"
            color="green.500"
            size={6}
          />
        </TouchableOpacity>

        <HStack justifyContent="space-between" alignItems="center" mt={4} mb={8}>
          <Heading color="gray.100" fontSize="lg" fontFamily="heading" flexShrink={1}>
            Bent-over row
          </Heading>

          <HStack alignItems="center">
            <BodySvg />

            <Text color="gray.200" mt={1} ml={1} textTransform="capitalize">
              Back
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        <VStack p={8}>
          <Image
            w="full"
            h={80}
            source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fblog.sardinhaevolution.com.br%2Fwp-content%2Fuploads%2F2020%2F04%2Fremada-unilateral.2.jpg&f=1&nofb=1&ipt=0c38079e0e9464f88fe9c41c81f4fb63d48f9ff8603fa0c04fdbec6f4f6d1458&ipo=images'}}
            alt="Exercise form"
            mb={3}
            resizeMode="cover"
            rounded="lg"
          />

          <Box bg="gray.600" rounded="md" pb={4} px={4}>
            <HStack alignItems="center" justifyContent="space-around" mb={6} mt={5}>
              <HStack alignItems="center">
                <SetsSvg />
                <Text color="gray.200" ml={2}>
                  3 sets
                </Text>
              </HStack>

              <HStack alignItems="center">
                <RepetitionsSvg />
                <Text color="gray.200" ml={2}>
                  12 repetitions
                </Text>
              </HStack>
            </HStack>

            <Button title="Mark as done" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
}