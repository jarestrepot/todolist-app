<script>
export default {
  props: {
    textDisplay: String,
  }
}
</script>
<template>
  <label 
    class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-slate-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-slate-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-slate-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-slate-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-fun-blue-800 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-fun-blue-800 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-fun-blue-800 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 dark:peer-placeholder-shown:text-slate-300 dark:peer-focus:text-persian-green-300 dark:peer-focus:before:border-persian-green-300 dark:peer-focus:after:border-persian-green-300 dark:text-slate-300 dark:after:border-slate-300 dark:before:border-slate-300">
    {{ textDisplay }}
  </label>
</template>