<script>
  import { userAuthStore, useTodosStore } from '../../../store';
  import { startAssetsTodos } from '../../../helpers';
  import { FilterNav, Footer, Navbar, Sidebar } from '../../ui/components';

  export default{
    data() {
      return {
        storeTodos: useTodosStore(),
        storeAuth: userAuthStore()
      };
    },
    async beforeCreate() {
      const response = await startAssetsTodos();
      const { assetsTodos } = this.storeTodos;
      assetsTodos(response);
    },
    components: { 
      FilterNav,
      Footer,
      Navbar,
      Sidebar,
    },
  }
</script>

<template>
  <Sidebar />
  <header class="bg-gray-50/50 pt-4 px-4 xl:ml-80 dark:bg-slate-900">
    <Navbar />
    <FilterNav v-if="this.$route.name !== 'profile'" />
  </header>
  <main class="min-h-screen bg-gray-50/50 p-4 xl:ml-80 dark:bg-slate-900">
    <router-view v-if="storeAuth.tasks.length > 0" name="todos"/>
    <router-view v-else name="emptyTodos"/>
    <router-view name="userProfile"/>
    <router-view v-if="storeAuth.archivedTodos.length > 0" name="archived"/>
    <router-view v-else name="emptyArchived" />
  </main>
  <Footer />
</template>