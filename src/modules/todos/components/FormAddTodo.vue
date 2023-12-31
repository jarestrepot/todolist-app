<script>
  import { userAuthStore, useTodosStore } from '../../../store';
  import { CONSTANTS } from '../../../helpers'

  export default {
  emits: ['closeModal'],
  data() {
    return {
      title:'',
      description:'',
      codeCategory: '',
      codeImportance:null,
      codeStatus:'',
      created: false,
      storeAuth: userAuthStore(),
      storeTodos: useTodosStore(),
      resMessage: {
        stateResponse: false,
        message: '',
        color: false
      }
    };
  },
  methods: {
    async createTodo(){

      const objectTodo = {
        title: this.title,
        description: this.description,
        category: this.codeCategory,
        importance: this.codeImportance,
        status: this.codeStatus
      }

      const { newTodo } = this.storeAuth;

      const response = await newTodo(objectTodo, this.storeAuth.user.user_id);

      this.title = this.description = '';
      this.codeCategory = this.codeImportance = this.codeStatus = '';

      if(response.Error){
        this.resMessage = {
          stateResponse: true,
          message: response.Error,
          color: true
        }
      }else{
        this.$emit('closeModal');
      }
    },
  },
  computed: {
    isValidTitle(){
      return CONSTANTS.VALIDINPUT.test(this.title) 
    },
    isValidDescription(){
      return CONSTANTS.VALIDNUMCHARACTERES.test(this.description)
    },
    isValidFields(){
      return this.isValidTitle && this.isValidDescription && this.codeStatus && this.codeCategory && this.codeImportance
    }
  }
}
</script>
<template>
  <div class="flex justify-end items-center mb-5">
    <h2 class="textDegrant text-2xl font-bold text-center">{{ $t('addTodoTitle') }}</h2>
  </div>

  <form 
    @submit.prevent="createTodo()" 
    class="max-w-md mx-auto">

    <div class="relative z-0 w-full mb-5 group">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-300">{{ $t('titleAddTodo') }}</label>
      <input 
        v-model="title"
        type="text"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-persian-green-500 focus:border-persian-green-500 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-persian-green-500 dark:focus:border-persian-green-500"
        :placeholder="$t('myFirstTodo')" 
        required />
        <span
          class="text-red-500 mt-2"
          v-if="!isValidTitle && title.length > 0">
          {{ $t('isRequiredTitle') }}
        </span>
    </div>

    <div class="relative z-0 w-full mb-5 group">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-300">{{ $t('descriptionAddTodo') }}</label>
      <textarea
        v-model="description"
        rows="3" 
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-persian-green-500 focus:border-persian-green-500 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-persian-green-500 dark:focus:border-persian-green-500"
        :placeholder="$t('describeMyFirtsTodo')"
        required />
        <span
          class="text-red-500"
          v-if="!isValidDescription && description.length > 0">
          {{ $t('descriptionIsRequired') }}
        </span>
    </div>

    <div class="relative z-0 w-full mb-5 group">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-300">{{ $t('category') }}:</label>
      <select
        v-model="codeCategory" 
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border cursor-pointer border-gray-300 focus:ring-persian-green-500 focus:border-persian-green-500 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-persian-green-500 dark:focus:border-persian-green-500"
        required>
          <option value="" disabled selected>{{ $t('selectAnOption') }}</option>
          <option v-for="category of storeTodos.assets.category" 
            :key="category" 
            :value="category.codeCategory">
            {{ $t(`${category.Category}`) }}
          </option>
      </select>
    </div>

    <div class="relative z-0 w-full mb-5 group">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-300">{{ $t('status') }}:</label>
      <select 
        v-model="codeStatus"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-persian-green-500 focus:border-persian-green-500 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-persian-green-500 dark:focus:border-persian-green-500 cursor-pointer" 
        required>
        <option value="" disabled selected>{{ $t('selectAnOption') }}</option>
        <option v-for="status of storeTodos.assets.status" 
          :key="status" 
          :value="status.codeStatus">
          {{ status.Status !== 'In Progress' ? $t(`${status.Status}`) : $t('InProgress')}}
        </option>
    </select>
    </div>
    
    <div class="relative z-0 w-full mb-5 group gap-3 flex">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-300">{{ $t('importance') }}:</label>
      <input v-for="important of storeTodos.assets.importance" 
        :key="important"
        v-model="codeImportance" 
        :value="important.codeImportance" 
        type="radio" 
        name="importance"
        :title="$t(`${important.Importance}`)"
        :class= "{ 'border-red-500 checked:bg-red-500 dark:border-red-500 dark:checked:bg-red-500': important.Importance === 'High', 'border-yellow-300 checked:bg-yellow-300 dark:border-yellow-300 dark:checked:bg-yellow-300': important.Importance === 'Medium', 'border-green-500 checked:bg-green-500 dark:border-green-500 dark:checked:bg-green-500': important.Importance === 'Low' }"
        class="w-5 h-5 border-4 rounded-full focus:ring-0 checked:ring-offset-0 focus:ring-offset-0 checked:ring-0 checked:bg-none dark:bg-slate-900 dark:checked:bg-none cursor-pointer"/>
    </div>
    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row justify-end items-center dark:bg-slate-900">
      <span 
        class="flex-1"
        v-if="resMessage.stateResponse"
        :class="!resMessage.color ? 'text-green-500' : 'text-red-500'">
        {{ resMessage.message }}
      </span>
      <button 
        type="button"
        @click="$emit('closeModal')" 
        class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:bg-slate-800 dark:text-white dark:border-none">
        {{ $t('cancel') }} 
      </button>
      <button
        :class="isValidFields ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'"
        type="submit"
        class="mt-3 sm:mt-0 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-gradient-to-br from-persian-green-700 to-persian-green-300 text-base font-medium text-white hover:bg-gradient-to-b focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
        {{ $t('save') }}
      </button>
    </div>
  </form>
</template>
