import { useState } from 'react';
import { Heading, Text, SectionList, VStack } from 'native-base';

import { ScreenHeader } from '@components/ScreenHeader';
import { HistoryCard } from '@components/HistoryCard';

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '26.04.23',
      data: ['Arms curls', 'Bench press']
    },
    {
      title: '24.04.23',
      data: ['Leg press', 'Leg extension']
    }
  ])

  return (
    <VStack flex={1}>
      <ScreenHeader title="History of Exercises" />

      <SectionList
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <HistoryCard />
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
    </VStack>
  );
}