# interview_project_2

Данный проект позволяет проверить наличие интересующего вас модуля на сайте www.npmjs.com.
Для этого необходимо вписать название модуля в поле поискау "search".

В проекте используется технология AJAX.

Для использования данной страницы необходимо иметь папку "build" и файл index.html.

Данный репозиторий достаточно клонировать на свой компьютер и запустить файл index.html.

Для дальнейшего редактирования необходимо в папке проекта написать ` npm install `, таким образом установятся все необходимые модули из файла ` package.json `.

## Watcher проекта ##

Находясь в папке проекта в терминале в командной строке необходимо написать: 

#### ` gulp watch ` #### 

Gulp запустит watcher, который будет следить за файлами проекта в папке src с расширениями .js и .scss. 
При их изменении, gulp преобразует их и перенесет в папку build. 

### Информация о проекте ###

Проект написан с использованием JS и SCSS по методологии БЭМ. 
Для расширения проекта и использования текущего gulp файла необходимо добавлять файлы только в папки ` ./src/BEM/common.blocks ` и ` ./src/BEM/media-queries `, либо модифицировать gulpfile под себя.

Используемые в данном проекте изображения находятся в папке ` ./build/img/ `.