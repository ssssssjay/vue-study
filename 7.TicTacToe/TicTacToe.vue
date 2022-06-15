<template>
  <div>
    <div>{{turn}}님의 턴입니다</div>
    <table-component :table-data="tableData" />
    <div v-if="winner">{{winner}}님의 승리입니다.</div>
  </div>
</template>

<script>
  import TableComponent from './TableComponent';
  export default {
    components: {
      // 'table-component': TableComponent,
      TableComponent,
    },
    data() {
      return {
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        turn: 'O',
        winner: '',
      }
    },
    computed: {

    },
    methods: {

    },
    mounted() {

    },
    beforeDestroy() {

    },
  };
</script>

<style sccoped>

</style>