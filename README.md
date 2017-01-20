##ScheduleToImage

ScheduleToImage это небольшая клиентская библиотека, написанная на javascript, позволяющая сохранить расписание общественного транспорта с ресурса eway в виде изображения. Коммерческое использование запрещено и она предназначена исключительно для упрощения жизни разработчика(т.е., меня). При этом я буду рад, если разработчики портала eway встроят ее на свой ресурс. :)


###Зачем это пользователю?
- Не нужен доступ к интернету. Достаточно один раз сохранить расписание и всё.
- Легко делиться с друзьями.
- Распечатать расписание очень просто.


###Зачем это разработчикам?

- Экономия места на сервере.
Рассмотрим на примере Днепра. У нас на 30 маршрутах есть расписание. Возьмем среднее число остановок в одну сторону равным 10. Соответственно, для одного нашего города надо сохранить 600 изображений. Да, в формате png они весят около 100 килобайт каждое, но это все равно стоит денег.
- Нулевые затраты.
Рендер происходит исключительно на клиенте, соответственно это исключает лишние запросы к серверу.


###Как это работает?

1. Клиент нажимает на кнопку "Скачать". 
2. Javascript клонирует таблицу и изменяет её форматирование(стирает разницу в форматировании между прошедшими минутами, текущей и следующей; удаляет заголовок; заменяет UI-элемент select на обычный текст во избежание проблем с рендером). Пользователь этих изменений не видит на странице.
3. Библиотека [html2canvas](https://github.com/niklasvh/html2canvas/) сохраняет отформатированную таблицу в canvas(тэг HTML5), который в свою очередь позволяет сохранить ее в изображение.
4. Адрес страницы подменяется на байтовое значение изображение.
5. Пользователь скачивает изображение и возвращается назад или закрывает вкладку.


###Тестирование скрипта из консоли.

- Открываем страницу с маршрутом, у которого есть расписание. Например, [этот](https://www.eway.in.ua/ua/cities/dnipro/routes/132). 
- Выбираем остановку, нажимаем на календарик рядом с ней. Откроется окно с распианием. 
- Открываем консоль разработчика. Как это делается в разных браузерах можно посмотреть [здесь](https://learn.javascript.ru/devtools). 
- Копируем и вставляем в консоль этот код:

```javascript
var script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://rawgit.com/ezekeli/schedule-to-image/master/javascript/demo.js";
document.querySelector("head").appendChild(script);
```

и нажимаем Enter.
-Повторяем предыдущую операцию с этим кодом:

```javascript
demo.run();
```

- Нажимаем "Скачать" и наслаждаемся результатом. :)


###Интеграция с ресурсом.

- В header добавляем этот код:

```html
<script type="text/javascript" src="https://rawgit.com/ezekeli/schedule-to-image/master/javascript/html2canvas.js"></script>
<script type="text/javascript" src="https://rawgit.com/ezekeli/schedule-to-image/master/javascript/schedule-to-image.js"></script>
```

- В div#schedule_popup изменяем td.schedules_header так, чтобы он был вот таким:

```html
<td colspan="4" class="schedules_header">Розклад<div class="route_stops_directions_buttons" onclick="(new ScheduleToImage).run()">Скачать</div></td>
```


###Примеры

![График с двумя колонками не загрузился](https://github.com/ezekeli/schedule-to-image/raw/master/img/two_columns.png "График с двумя колонками")
![График с одной колонкой не загрузился](https://github.com/ezekeli/schedule-to-image/raw/master/img/one_column.png "График с одной колонкой")
![Миниатюрный график не загрузился](https://github.com/ezekeli/schedule-to-image/raw/master/img/little_schadule.png "Миниатюрный график")
