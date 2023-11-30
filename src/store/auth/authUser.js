
import { defineStore } from "pinia";
import { startLogin } from '../../helpers/authFetch';
import { startNewTodo, startUpdateTodo } from "../../helpers/todosFetch";

export const userAuthStore = defineStore("auth", {
  state: () => ({
    status: 'not-authenticated',
    user: null,
    token: null,
    tasks: [],
    todoFilter: [],
    hasError: null,
  }),
  actions: {
    async fetchLoginUser(email, password) {
      const response = await startLogin(email, password);
      if(response.Error){
        this.$patch({
          hasError: response.Error
        });
      }else{
        const { dataUser, tasks, token } = await response;
        this.$patch({
          status: 'authenticated',
          user: dataUser,
          tasks,
          token,
          hasError:null,
        });
      }
    },
    logoutUser(){
      this.$patch({
        status: 'not-authenticated',
        user: null, 
        tasks: [],
        token: null,
        hasError: null
      });
      localStorage.removeItem('tokenUser')
    },
    updateUser({ user }){
      this.$patch({
        user
      });
    },
    getTodoId(id){
      const [todo] = this.tasks.filter(todo => todo.id === id)
      return todo
    },
    async updateTodoUser(todo){

      const indexTodo = this.tasks.findIndex(task => task.id === todo.id);
      const response = await startUpdateTodo(todo);
      if(response.Error){
        return response
      }
      this.tasks.splice(indexTodo, 1, response.task );
      return response
    },
    async newTodo(todo, userRef){
      const response = await startNewTodo(todo, userRef);
      if(response.Error){
        return response
      }
      this.tasks.push(response.task);
      return response.msg
    },

    getFilterTodos(nameFilter, asset){
      this.tasks.forEach(todo => {
        if (todo[asset] === nameFilter){
          this.todoFilter = [...this.todoFilter, todo]
        }
      });
    },
    clearTodoFilter(){
      this.$patch({
        todoFilter: []
      })
    }
  },
  persist: true,
})

