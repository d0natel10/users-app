<template>
    <section v-if="activeForm === 'confirm'" class="overlay-form">
      <div class="confirm-window">
        <h1 class="header-confirm">Подтверждение</h1>
        <div class="border" :style="{ width: `${progress}%` }"></div>
        <p>Вы действительно хотите удалить запись?</p>
        <div class="confirm-buttons">
          <button @click="confirmDelete" class="button-confirm">
            Да
          </button>
          <button @click="props.closeForm()" class="button-confirm">
            Отмена
          </button>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits, onMounted, onBeforeUnmount } from 'vue';
  
  const props = defineProps({
      activeForm: String,
      closeForm: Function,
  });
  
  const emit = defineEmits();
  const progress = ref(100);
  let timer;
  
  const confirmDelete = () => {
      emit('deleteConfirmed');
      props.closeForm();
      progress.value = 100;
      clearInterval(timer);
  };
  
  const startTimer = () => {
      progress.value = 100;
      timer = setInterval(() => {
          if (progress.value > 0) {
              progress.value -= 1;
          } else {
              props.closeForm();
              clearInterval(timer);
              progress.value = 100;
          }
      }, 100);
  };
  
  onMounted(startTimer);
  onBeforeUnmount(() => clearInterval(timer));
  </script>

<style scoped>

.overlay-form {
    position: fixed;
    top: 0;
    left: 0; 
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999; 
}

.confirm-window {
    width: 350px;
    height: auto;
    margin: 0 auto;
    padding: 20px;
    background-color: rgb(166, 234, 188);
    border-radius: 10px;
    position: relative; 
}

.header-confirm {
    font-size: 22px;
    font-weight: 600;
}

.border {
    height: 4px; 
    background-color: rgb(255, 255, 255); 
    margin-top: 5px;
    margin-bottom: 3px;
    transition: width 0.1s linear;
}

.confirm-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.button-confirm {
    padding: 7px 15px;
    border-radius: 10px;
    cursor: pointer;
    border: none;
    font-size: 13px;
    font-weight: 500;
    transition: background-color 0.3s ease, box-shadow 0.3s ease; 
}

.button-confirm:hover {
    background-color: rgba(236, 238, 240, 0.8);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

</style>