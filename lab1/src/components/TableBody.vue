<template>
  <tr>
    <td>{{ users.id }}</td>
    <td>{{ users.name }}</td>
    <td>{{ users.userName }}</td>
    <td>{{ users.role }}</td>
    <td>
      <div class="email-container">
        <span class="email-content">{{ users.email }}</span>
        <div class="rectangle">
          <div class="triangle"></div>
        </div>
      </div>
    </td>
  </tr>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  users: Object
});
</script>

<style scoped>
.email-container {
  display: flex;
  align-items: center; 
  display: flex;
  justify-content: space-around;
}

.email-content {
  margin-right: 5px; /* Отступ между текстом и прямоугольником */
}

.rectangle {
  width: 20px; /* Ширина прямоугольника */
  height: 30px; /* Высота прямоугольника */
  background-color: black; /* Цвет фона прямоугольника */
  position: relative;
}

.triangle {
  width: 0;
  height: 30px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid black; /* Цвет треугольника */
  position: absolute;
  left: -10px; /* Сдвигаем треугольник влево */
  top: 50%;
  transform: translateY(-50%); /* Центрируем треугольник по вертикали */
}
</style>
