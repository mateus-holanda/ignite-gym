import { useCallback, useEffect, useState } from 'react';
import { FlatList, HStack, Heading, Text, useToast, VStack } from 'native-base';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { api } from '@services/api';

import { AppError } from '@utils/AppError';

import { AppNavigatorRoutesProps } from '@routes/app.routes';

import { ExerciseDTO } from '@dtos/ExerciseDTO';

import { Loading } from '@components/Loading';
import { HomeHeader } from '@components/HomeHeader';
import { MuscleGroup } from '@components/MuscleGroup';
import { ExerciseCard } from '@components/ExerciseCard';

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [muscleGroups, setMuscleGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [muscleGroupSelected, setMuscleGroupSelected] = useState('back');

  const toast = useToast();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate('exercise', { exerciseId });
  }

  async function fetchMuscleGroups() {
    try {
      const response = await api.get('/groups');

      setMuscleGroups(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'There was an error loading the muscle groups.';
    
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    }
  }

  async function fetchExercisesByMuscleGroup() {
    try {
      setIsLoading(true);

      const response = await api.get(`/exercises/bygroup/${muscleGroupSelected}`);

      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'There was an error loading the exercises.';
    
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMuscleGroups();
  }, []);

  useFocusEffect(useCallback(() => {
    fetchExercisesByMuscleGroup();
  }, [muscleGroupSelected]));

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

      {
        isLoading ? <Loading /> : (
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
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <ExerciseCard
                  data={item}
                  onPress={() => handleOpenExerciseDetails(item.id)}
                />
              )}
              showsVerticalScrollIndicator={false}
              _contentContainerStyle={{ paddingBottom: 20 }}
            />
          </VStack>
        )
      }
    </VStack>
  );
}