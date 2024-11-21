<template>
  <div class="mainApp">
   <section v-if="activeForm === ''" class="header">
      <header>
        <h1>Users info</h1>
      </header>
   </section>
   <section v-if="activeForm === ''" class="table-container">
    <div class="table-scroll">
        <table>
            <thead class="table-header">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>User name</th>
                    <th>Role</th>
                    <th>E-mail</th>
                </tr>
            </thead>
            <tbody>
                <TableBody v-for="user in filteredUsers" :key="user.id" :users="user"/>
            </tbody>
        </table>
    </div>
</section>
   <section v-if="activeForm === ''" class="search">
      <div class="searchBlock">
        <input v-model="searchWindow" type="text" placeholder="search info...">
        <div class="filtration">
          <select v-model="selectOption">
            <option selected value="getUsers">sort by date of add</option>
            <option value="byNameAsc">sort by name asc</option>
            <option value="byNameDesc">sort by name desc</option>
          </select>
        </div>
      </div>
      <button @click="OpenAddForm" class="addButton">
        Add new people
      </button>
   </section>
      <addUserForm @updateUsers="handleUpdateUsers" :closeForm="closeForm" :activeForm="activeForm" :users="users"/>
  </div>
</template>

<script setup>

  import {onMounted, ref, computed, watch} from 'vue'
  import TableBody from './components/TableBody.vue';
  import axios from 'axios';
  import addUserForm from './components/addUserForm.vue';

  const users = ref([]);
  const searchWindow = ref('');
  const selectOption = ref('getUsers');
  const activeForm = ref('');

  const OpenAddForm = () => {
    activeForm.value = 'addForm';
  }

  const closeForm = () => {
    activeForm.value = '';
  }

  const handleUpdateUsers = (data) => {
      if (users.value !== data){
        fetchUsers();
      }
  }

  const fetchUsers = async () => {
    try {
      const params = selectOption.value;
      const response = await axios.get(`http://127.0.0.1:8080/api/users/${params}`);
      users.value = response.data;
    }
    catch(error){
      console.log(error.message);
    }
    
  }

  const filteredUsers = computed(() => {
  if (!searchWindow.value) {
    return users.value
  }
  const searchTerm = searchWindow.value.toLowerCase()
  return users.value.filter(user => {
    return (
      user.name.toLowerCase().includes(searchTerm) ||
      user.userName.toLowerCase().includes(searchTerm) ||
      user.role.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    )
  })
})

watch(selectOption, () => {
  fetchUsers()
});

  onMounted(fetchUsers);
</script>
