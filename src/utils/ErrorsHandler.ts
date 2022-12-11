export const ErrorsHandler = {
  localization: (status: number) => {
    return localization[status] || 'Щось пішло не так'
  }
}

const localization: Record<number, string> = {
  404: 'Статтю не знайдено',
  403: 'Ви не маєте доступу до цієї статті'
}