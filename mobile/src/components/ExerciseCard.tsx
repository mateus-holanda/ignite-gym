import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { HStack, Heading, Icon, Image, Text, VStack } from 'native-base';
import { Entypo } from '@expo/vector-icons';

import { ExerciseDTO } from '@dtos/ExerciseDTO';

import { api } from '@services/api';

interface ExerciseCardProps extends TouchableOpacityProps {
  data: ExerciseDTO
};

export function ExerciseCard({ data, ...rest }: ExerciseCardProps) {
  return (
    <TouchableOpacity
      {...rest}
    >
      <HStack bg="gray.500" alignItems="center" p={2} pr={4} mb={3} rounded="md">
        <Image
          source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}` }}
          alt="Image of the exercise"
          w={16}
          h={16}
          mr={4}
          rounded="md"
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading fontSize="lg" color="white" fontFamily="heading">
            {data.name}
          </Heading>

          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            {data.sets} sets x {data.repetitions} repetitions
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