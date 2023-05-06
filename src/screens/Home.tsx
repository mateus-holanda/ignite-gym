import { useState } from 'react';
import { FlatList, HStack, Heading, Text, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { AppNavigatorRoutesProps } from '@routes/app.routes';

import { HomeHeader } from '@components/HomeHeader';
import { MuscleGroup } from '@components/MuscleGroup';
import { ExerciseCard } from '@components/ExerciseCard';

export function Home() {
  const [muscleGroups, setMuscleGroups] = useState(['back', 'biceps', 'triceps', 'shoulder', 'chest', 'legs', 'abs']);
  const [exercises, setExercises] = useState(['Bent-over rows', 'Arm curls', 'Bench press', 'Leg extension']);
  const [muscleGroupSelected, setMuscleGroupSelected] = useState('back');

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise');
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={muscleGroups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <MuscleGroup
            name={item}
            isActive={muscleGroupSelected.toUpperCase() === item.toUpperCase()}
            onPress={() => setMuscleGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Exercises
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <ExerciseCard
              onPress={handleOpenExerciseDetails}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
}