exports.seed = async function (knex) {
  await knex('exercises').del()
  await knex('exercises').insert([
    {
      name: 'Inclined barbell bench press',
      sets: 4,
      repetitions: 12,
      group: 'chest',
      demo: 'inclined_barbell_bench_press.gif',
      thumb: 'inclined_barbell_bench_press.png',
    },
    {
      name: 'Flat dumbbell fly',
      sets: 3,
      repetitions: 12,
      group: 'chest',
      demo: 'flat_dumbbell_fly.gif',
      thumb: 'flat_dumbbell_fly.png'
    },
    {
      name: 'Flat barbell bench press',
      sets: 3,
      repetitions: 12,
      group: 'chest',
      demo: 'flat_barbell_bench_press.gif',
      thumb: 'flat_barbell_bench_press.png'
    },
    {
      name: 'Lying triceps extension with dumbbells',
      sets: 3,
      repetitions: 12,
      group: 'triceps',
      demo: 'lying_triceps_extension_with_dumbbells.gif',
      thumb: 'lying_triceps_extension_with_dumbbells.png'
    },
    {
      name: 'Cable cross-over',
      sets: 4,
      repetitions: 12,
      group: 'triceps',
      demo: 'cable_cross_over.gif',
      thumb: 'cable_cross_over.png'
    },
    {
      name: 'Cable cross over with bar',
      sets: 3,
      repetitions: 12,
      group: 'triceps',
      demo: 'cable_cross_over_with_bar.gif',
      thumb: 'cable_cross_over_with_bar.png'
    },
    {
      name: 'Skull crushers',
      sets: 4,
      repetitions: 12,
      group: 'triceps',
      demo: 'skull_crushers.gif',
      thumb: 'skull_crushers.png'
    },
    {
      name: 'Deadlift',
      sets: 3,
      repetitions: 12,
      group: 'back',
      demo: 'deadlift.gif',
      thumb: 'deadlift.png'
    },
    {
      name: 'Front pulldown',
      sets: 3,
      repetitions: 12,
      group: 'back',
      demo: 'front_pulldown.gif',
      thumb: 'front_pulldown.png'
    },
    {
      name: 'Back pulldown',
      sets: 4,
      repetitions: 12,
      group: 'back',
      demo: 'back_pulldown.gif',
      thumb: 'back_pulldown.png'
    },
    {
      name: 'Seated cable row',
      sets: 4,
      repetitions: 12,
      group: 'back',
      demo: 'seated_cable_row.gif',
      thumb: 'seated_cable_row.png'
    },
    {
      name: 'One-arm dumbbell row',
      sets: 4,
      repetitions: 12,
      group: 'back',
      demo: 'one_arm_dumbbell_row.gif',
      thumb: 'one_arm_dumbbell_row.png'
    },
    {
      name: 'Incline alternating dumbbell curl',
      sets: 4,
      repetitions: 12,
      group: 'biceps',
      demo: 'incline_alternating_dumbbell_curl.gif',
      thumb: 'incline_alternating_dumbbell_curl.png'
    },
    {
      name: 'Scott curl with W-bar',
      sets: 4,
      repetitions: 12,
      group: 'biceps',
      demo: 'scott_curl_with_w_bar.gif',
      thumb: 'scott_curl_with_w_bar.png'
    },
    {
      name: 'Standing barbell curl',
      sets: 3,
      repetitions: 12,
      group: 'biceps',
      demo: 'standing_barbell_curl.gif',
      thumb: 'standing_barbell_curl.png'
    },
    {
      name: 'Standing hammer curl',
      sets: 3,
      repetitions: 12,
      group: 'biceps',
      demo: 'standing_hammer_curl.gif',
      thumb: 'standing_hammer_curl.png'
    },
    {
      name: 'Wrist curl',
      sets: 4,
      repetitions: 12,
      group: 'forearms',
      demo: 'wrist_curl.gif',
      thumb: 'wrist_curl.png'
    },
    {
      name: '45-degree leg press',
      sets: 4,
      repetitions: 12,
      group: 'legs',
      demo: '45_degree_leg_press.gif',
      thumb: '45_degree_leg_press.png'
    },
    {
      name: 'Leg extension',
      sets: 4,
      repetitions: 12,
      group: 'legs',
      demo: 'leg_extension.gif',
      thumb: 'leg_extension.png'
    },
    {
      name: 'Hip abductor',
      sets: 4,
      repetitions: 12,
      group: 'legs',
      demo: 'hip_abductor.gif',
      thumb: 'hip_abductor.png'
    },
    {
      name: 'Stiff-legged deadlift',
      sets: 4,
      repetitions: 12,
      group: 'legs',
      demo: 'stiff_legged_deadlift.gif',
      thumb: 'stiff_legged_deadlift.png',
    },
    {
      name: 'Neck Press',
      sets: 4,
      repetitions: 10,
      group: 'shoulders',
      demo: 'neck_press.gif',
      thumb: 'neck_press.png'
    },
    {
      name: 'Machine shoulder press',
      sets: 3,
      repetitions: 10,
      group: 'shoulders',
      demo: 'machine_shoulder_press.gif',
      thumb: 'machine_shoulder_press.png'
    },
    {
      name: 'Seated lateral raise with dumbbells',
      sets: 4,
      repetitions: 10,
      group: 'shoulders',
      demo: 'seated_lateral_raise_with_dumbbells.gif',
      thumb: 'seated_lateral_raise_with_dumbbells.png'
    },
    {
      name: 'Dumbbell shrug',
      sets: 4,
      repetitions: 10,
      group: 'traps',
      demo: 'dumbbell_shrug.gif',
      thumb: 'dumbbell_shrug.png'
    },
    {
      name: 'Barbell shrug',
      sets: 4,
      repetitions: 10,
      group: 'traps',
      demo: 'barbell_shrug.gif',
      thumb: 'barbell_shrug.png'
    }
  ]);
};