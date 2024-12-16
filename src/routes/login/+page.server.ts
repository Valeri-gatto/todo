export const actions = {
    login: async ({ request }) => {
        const data = await request.formData();
        const pageType = data.get("type")?.toString().trim();
        // в обоих случаях проверяем наличие пароля и соответствие его условиям
        if (pageType === 'login') {
            // проверить наличие логина в базе данных
            // для этого вызываем функцию бд
        } else {
            // проверяем, что второй пароль совпал с первым
            // установить куку в браузере
        }
    }
}