import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Heading, SectionList, Text, useToast, VStack } from 'native-base';

import { api } from '@services/api';

import { HistoryByDayDTO } from '@dtos/HistoryByDayDTO';

import { AppError } from '@utils/AppError';

import { ScreenHeader } from '@components/ScreenHeader';
import { HistoryCard } from '@components/HistoryCard';
import { Loading } from '@components/Loading';


export function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  const toast = useToast();

  async function fetchExerciseHistory() {
    try {
      setIsLoading(true);

      const response = await api.get('history');

      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'There was an error loading your exercise history.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchExerciseHistory();
  }, []));

  return (
    <VStack flex={1}>
      <ScreenHeader title="History of Exercises" />

      {
        isLoading ? <Loading /> : (
          <SectionList
            sections={exercises}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <HistoryCard data={item} />
            )}
            renderSectionHeader={({ section }) => (
              <Heading color="gray.200" fontSize="md" fontFamily="heading" mt={10} mb={3}>
                {section.title}
              </Heading>
            )}
            px={8}
            contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center'}}
            ListEmptyComponent={() => (
              <Text color="gray.100" textAlign="center">
                There are no records yet. {'\n'}
                Let's do some exercises today?
              </Text>
            )}
            showsVerticalScrollIndicator={false}
          />
        )
      }
    </VStack>
  );
}