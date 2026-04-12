export const heroTags: HeroTag[] = [
  { label: "500K+ Игр в базе", type: "default" },
  { label: "Кастомизация", type: "default" },
  { label: "RAWG API Ready", type: "default" },
  { label: "Без рекламы", type: "default" }
]

export type HeroTag = {
  label: string
  type: string
}

export const features: Feature[] = [
  {
    title: "Любые предметы",
    desc: "Vaulty не ограничивается шаблонами. Сохраняй редкий мерч, девайсы или книги — название, описание и фото создают полноценную карточку.",
    image: 'src/assets/custom-inventory-preview.png'
  },
  {
    title: "Игровой бэклог",
    desc: "Интеграция с базой RAWG позволяет находить любую игру за секунды. Обложки, жанры и оценки критиков подтягиваются автоматически.",
    image: ''
  },
  {
    title: "Умная фильтрация",
    desc: "Находи нужное мгновенно. Сортируй по множеству параметров — полный контроль над коллекцией.",
    image: ''
  },
  {
    title: "Быстрый доступ",
    desc: "Твои коллекции всегда под рукой. Лаконичный интерфейс позволяет добавить новый предмет всего в пару кликов, не отвлекаясь от главного.",
    image: ''
  }
]

export type Feature = {
  title: string
  desc: string
  image: string
}

export const bentoItems: BentoItem[] = [
  {
    title: "RAWG Интеграция",
    desc: "Прямой доступ к крупнейшей базе игр. Фото, даты выхода и описания подгружаются на лету."
  },
  {
    title: "Ничего лишнего",
    desc: "Мы убрали всё, что отвлекает. Только ваши коллекции в чистом и функциональном интерфейсе."
  },
  {
    title: "Приватность",
    desc: "Ваши данные принадлежат вам. Vaulty — это личный сейф, скрытый от посторонних глаз."
  }
]

export type BentoItem = {
  title: string
  desc: string
}