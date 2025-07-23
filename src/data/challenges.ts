import { Challenge } from '../types';

export const dailyChallenges: Omit<Challenge, 'id' | 'completed' | 'answer' | 'completedAt'>[] = [
  {
    day: 1,
    question: "Когда ты в последний раз чувствовал гордость за себя? Что ты сделал?",
    category: 'self-reflection'
  },
  {
    day: 2,
    question: "Что тебе мешает быть полностью собой? Какие маски ты носишь?",
    category: 'self-reflection'
  },
  {
    day: 3,
    question: "Что ты хочешь оставить в прошлом и больше не брать с собой?",
    category: 'emotions'
  },
  {
    day: 4,
    question: "За что ты благодарен своему вчерашнему 'я'?",
    category: 'gratitude'
  },
  {
    day: 5,
    question: "Какая твоя самая большая мечта? Что мешает к ней двигаться?",
    category: 'goals'
  },
  {
    day: 6,
    question: "Кому ты давно хотел сказать 'спасибо', но всё откладывал?",
    category: 'relationships'
  },
  {
    day: 7,
    question: "Какую привычку ты хочешь изменить в себе? Почему именно её?",
    category: 'self-reflection'
  },
  {
    day: 8,
    question: "Когда ты чувствуешь себя самым счастливым? Опиши этот момент.",
    category: 'emotions'
  },
  {
    day: 9,
    question: "Какой совет ты дал бы себе пятилетней давности?",
    category: 'self-reflection'
  },
  {
    day: 10,
    question: "Что тебя больше всего вдохновляет в других людях?",
    category: 'relationships'
  },
  {
    day: 11,
    question: "Какая твоя самая большая победа над собой?",
    category: 'self-reflection'
  },
  {
    day: 12,
    question: "О чём ты сожалеешь меньше всего в своей жизни?",
    category: 'emotions'
  },
  {
    day: 13,
    question: "Что ты делаешь, когда тебе плохо? Помогает ли это?",
    category: 'emotions'
  },
  {
    day: 14,
    question: "Какую цель ты ставишь на следующий месяц?",
    category: 'goals'
  },
  {
    day: 15,
    question: "Кто оказал самое большое влияние на твоё мировоззрение?",
    category: 'relationships'
  },
  {
    day: 16,
    question: "Что ты узнал о себе за последние полгода?",
    category: 'self-reflection'
  },
  {
    day: 17,
    question: "За какие три вещи ты благодарен прямо сейчас?",
    category: 'gratitude'
  },
  {
    day: 18,
    question: "Какая эмоция управляет тобой чаще всего?",
    category: 'emotions'
  },
  {
    day: 19,
    question: "Что бы ты хотел сказать человеку, который причинил тебе боль?",
    category: 'relationships'
  },
  {
    day: 20,
    question: "Какой твой самый большой страх? Обоснован ли он?",
    category: 'emotions'
  },
  {
    day: 21,
    question: "Что заставляет тебя чувствовать себя живым?",
    category: 'self-reflection'
  },
  {
    day: 22,
    question: "Какую жизненную ценность ты никогда не предашь?",
    category: 'self-reflection'
  },
  {
    day: 23,
    question: "Как ты выражаешь любовь к близким людям?",
    category: 'relationships'
  },
  {
    day: 24,
    question: "Что ты хочешь изменить в своём отношении к себе?",
    category: 'self-reflection'
  },
  {
    day: 25,
    question: "Какой момент в жизни ты бы хотел переживать снова и снова?",
    category: 'emotions'
  },
  {
    day: 26,
    question: "Что ты делаешь только для себя и своего удовольствия?",
    category: 'self-reflection'
  },
  {
    day: 27,
    question: "Кому ты доверяешь больше всего и почему?",
    category: 'relationships'
  },
  {
    day: 28,
    question: "Какую мечту детства ты до сих пор хочешь осуществить?",
    category: 'goals'
  },
  {
    day: 29,
    question: "Что ты простил себе? За что благодарен себе?",
    category: 'self-reflection'
  },
  {
    day: 30,
    question: "Каким ты видишь себя через год? Что изменится?",
    category: 'goals'
  },
  {
    day: 31,
    question: "Какое послание ты хочешь передать миру?",
    category: 'self-reflection'
  },
  {
    day: 32,
    question: "Что делает тебя уникальным среди всех людей?",
    category: 'self-reflection'
  },
  {
    day: 33,
    question: "Какую боль ты превратил в свою силу?",
    category: 'emotions'
  },
  {
    day: 34,
    question: "За что ты готов бороться до конца?",
    category: 'goals'
  },
  {
    day: 35,
    question: "Какой самый ценный урок преподала тебе жизнь?",
    category: 'self-reflection'
  }
];