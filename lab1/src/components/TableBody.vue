<template>
  <tr class="user-row" :class="{ shake: isShaking }">
    <td>{{ index + 1 }}</td>
    <td>{{ users.name }}</td>
    <td>{{ users.userName }}</td>
    <td>{{ users.role }}</td>
    <td>{{ users.email }}</td>
    <td @click.stop>
      <img src="/images/recycle-bin.png" alt="delete icon" class="kick-icon" @click="animateAndRemove(users.id)"/>
    </td>
  </tr>
</template>

<script setup>
import { defineProps, ref, defineEmits } from 'vue';
import axios from 'axios';

const props = defineProps({
  users: Object,
  index: Number,
  activeForm: String,
});

const emit = defineEmits();
const isShaking = ref(false);

const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8080/api/users/${id}`);
    console.log(response.data);
    emit('updateAfterDelete', id); 
  } catch (e) {
    console.log(e.message);
  }
};

const animateAndRemove = async (id) => {
  emit('updateForm', 'confirm', id);

  isShaking.value = true; 

};

</script>