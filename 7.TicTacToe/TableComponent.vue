<template>
  <table>
    <tr-component 
      v-for="(rowData, index) in tableData" :key="index" 
      :row-data="rowData" 
      :row-index="index">
    </tr-component>
  </table>
</template>

<script>
  import TrComponent from './TrComponent';
  export default {
    name: 'TableComponent',
    components: {
      TrComponent,
    },
    props: {
      tableData: Array,
    },
    computed: {
    },
  };
</script>

<style>
  table {
    border-collapse: collapse;
  }
  td {
    border: 3px solid dodgerblue;
    width: 40px;
    height: 40px;
    text-align: center;
  }
</style>