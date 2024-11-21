<template>
    <section v-if="props.activeForm === 'addForm'" class="addForm">
        <main class="addUserForm">
          <div class="addUserHeader">
              <h1>Add new user</h1>
              <img @click="props.closeForm()" class="close-pic" src="/public/images/close.svg" alt="close this window" />
          </div>
            <div class="add-menu">
              <label for="name">add name of user</label>
              <input v-model="setName" id="name" class="form-input" type="text" placeholder="Add name..." />

              <label for="userName">add user name</label>
              <input v-model="setUserName" id="userName" class="form-input" type="text" placeholder="Add user name..." />

              <label for="role">add a role of user</label>
              <input v-model="setRole" id="role" class="form-input" type="text" placeholder="Add role..." />

              <label for="email">add email of user</label>
              <input v-model="setEmail" id="email" class="form-input" type="text" placeholder="Add email..." />
            </div>
                <div class="FormError">
                    <p>{{ errorMessage }}</p>
                </div>
          <button @click="checkData" class="submit-button">Add new user</button>
        </main>
    </section>
</template>

<script setup>

import { defineProps, ref, defineEmits } from 'vue';
import axios from 'axios'

const props = defineProps({
    activeForm: String,
    closeForm: Function,
    users: Object
})
const emit = defineEmits();

const setName = ref('');
const setUserName = ref('');
const setRole = ref('');
const setEmail = ref('');
const errorMessage = ref('');

const reset = () => {
    setName.value = '';
    setUserName.value = '';
    setRole.value = '';
    setEmail.value = '';
    errorMessage.value = '';
}

const close = () => {
    props.closeForm();
    reset();
}

const fetchPostUser = async (data) => {
    try {
        const response = await axios.post('http://127.0.0.1:8080/api/users/addUser', data);
        alert('Пользователь успешно добавлен!');
        close();
        emit('updateUsers', response.data);
    } catch (error) {
        console.error('Ошибка при добавлении пользователя:', error.message);
        alert('Произошла ошибка при добавлении пользователя. Пожалуйста, попробуйте снова.');
    }
};

const checkUser = (name) => {
    return !props.users.some(user => user.name === name);
};

const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

const checkData = async () => {
    const name = setName.value.trim();
    const userName = setUserName.value.trim();
    const role = setRole.value.trim();
    const email = setEmail.value.trim();

    if (!name || !userName || !role || !email) {
        errorMessage.value = 'Поля не могут быть пустыми!';
        return;
    }

    if (role !== 'admin' && role !== 'user') {
        errorMessage.value = 'Роль пользователя может быть только "admin" либо "user".';
        return;
    }

    if (!checkUser(name)) {
        errorMessage.value = 'Такой пользователь уже существует!';
        return;
    }

    if (!validateEmail(email)) {
        errorMessage.value = 'Неверно указан email!';
        return;
    }

    const data = {
        name: name,
        userName: userName,
        role: role,
        email: email
    };

    await fetchPostUser(data);
    reset();
};

</script>