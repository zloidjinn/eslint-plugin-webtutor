# Плагин для eslint для WebTutor

Плагин парсит данные из пакета `@umbrik/webtutor-types` и формирует пакет с глобальными переменными доступными в окружении WebTutor

Что бы обновить данные - сначала обновить зависимости, потом `npm run build`

Использование:

- Устанавливаем через npm в свой проект `npm install git@github.com:zloidjinn/eslint-plugin-webtutor.git -D`
- В файле `.eslintrc.js(on)` добавляем строку `"plugins": ["eslint-plugin-webtutor"]`
- В том же файле добавляем `env`, что бы глобальные переменные подтянулись 
  ```json
    "env": {
        "webtutor/webtutor": true
    }
  ```

После этого конфигурация должна появиться и ошибки от `eslint` о том что не определены глобальные переменные WebTutor - пропадут