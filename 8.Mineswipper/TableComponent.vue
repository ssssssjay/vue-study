<template>
  <div class="table-component">
    <h2>This is table-component</h2>
    <table>
      <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
        <td 
          v-for="(cellData, colIndex) in rowData"
          :key="colIndex" 
          :style="cellDataStyle(rowIndex, colIndex)"
          @click="onClickTd(rowIndex, colIndex)"
          @contextmenu.prevent="onRightClickTd(rowIndex, colIndex)"
        >
          {{cellDataText(rowIndex, colIndex)}}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { CLICK_MINE, CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL } from './store';

  export default {
    computed: {
      ...mapState(['tableData', 'halted']),
      cellDataStyle(state) {
        return (row, col) => {
          switch (this.$store.state.tableData[row][col]) {
            case CODE.NORMAL:
            case CODE.MINE:
              return {
                background: '#444',
              };
            case CODE.CLICKED_MINE:
            case CODE.OPENED:
              return {
                background: 'white',
              };
            case CODE.FLAG:
            case CODE.FLAG_MINE:
              return {
                background: 'red',
              };
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
              return {
                background: 'yellow',
              };
            default:
              return {};
          }
        };
      },
      cellDataText() {
        return (row, col) => {
          switch (this.$store.state.tableData[row][col]) {
            case CODE.MINE:
              return 'X';
            case CODE.NORMAL:
              return '';
            case CODE.FLAG_MINE:
            case CODE.FLAG:
              return '!';
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
              return '?';
            case CODE.CLICKED_MINE:
              return '펑';
            default:
              return this.$store.state.tableData[row][col] || '';
          }
        };
      },
    },
    methods: {
      onClickTd(row, col) {
        if(this.halted) {
          return;
        }
        switch (this.tableData[row][col]) {
          case CODE.NORMAL:
            this.$store.commit(OPEN_CELL, { row, col });
            break;
          case CODE.MINE:
            this.$store.commit(CLICK_MINE, { row, col });
          default:
            return;
        }
      },
      onRightClickTd(row, col) {
        if (this.halted) {
          return;
        }
        switch (this.tableData[row][col]) {
          case CODE.NORMAL:
          case CODE.MINE:
            this.$store.commit(FLAG_CELL, { row, col });
            return;
          case CODE.FLAG:
          case CODE.FLAG_MINE:
            this.$store.commit(QUESTION_CELL, { row, col });
            return;
          case CODE.QUESTION:
          case CODE.QUESTION_MINE:
            this.$store.commit(NORMALIZE_CELL, { row, col });
            return;
          default:
            return;
        }
      },
    },
  };
</script>

<style>
  .table-component {
    border: 1px solid black;
  }
</style>