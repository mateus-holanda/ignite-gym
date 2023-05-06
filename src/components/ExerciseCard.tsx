import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { HStack, Heading, Icon, Image, Text, VStack } from 'native-base';
import { Entypo } from '@expo/vector-icons';

interface ExerciseCardProps extends TouchableOpacityProps {

};

export function ExerciseCard({ ...rest }: ExerciseCardProps) {
  return (
    <TouchableOpacity
      {...rest}
    >
      <HStack bg="gray.500" alignItems="center" p={2} pr={4} mb={3} rounded="md">
        <Image
          source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fblog.sardinhaevolution.com.br%2Fwp-content%2Fuploads%2F2020%2F04%2Fremada-unilateral.2.jpg&f=1&nofb=1&ipt=0c38079e0e9464f88fe9c41c81f4fb63d48f9ff8603fa0c04fdbec6f4f6d1458&ipo=images'}}
          alt="Image of the exercise"
          w={16}
          h={16}
          mr={4}
          rounded="md"
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading fontSize="lg" color="white" fontFamily="heading">
            Bent-over row
          </Heading>

          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            3 sets x 12 repetitions
          </Text>
        </VStack>

        <Icon
          as={Entypo}
          name="chevron-thin-right"
          color="gray.300"
        />
      </HStack>
    </TouchableOpacity>
  );
}