<template>
  <div class="mineswipper">
    <h1>This is Mineswipper, enjoy your game!</h1>
    <mine-form />
    <div>{{timer}}</div>
    <table-component />
    <div>{{result}}</div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import store, { INCREMENT_TIMER } from './store';

  import MineForm from './MineForm'
  import TableComponent from './TableComponent';
  let interval; // 메모리누수 막기위해서 클리어 처리 해줘야함
  export default {
    store,
    components: {
      TableComponent,
      MineForm
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapState(['timer', 'result', 'halted'])
    },
    methods: {

    },
    watch: {
      halted(value, oldValue) {
        if (value === false) { // false일 때 게임 시작
          interval = setInterval(() => {
            this.$store.commit(INCREMENT_TIMER);
          }, 1000);
        } else { // 게임 중단
          clearInterval(interval);
        }
      }
    }
  };
</script>

<style sccoped>
  .mineswipper {
    border: 1px solid black;
    padding: 10px;
  }
  table {
    border-collapse: collapse;
    /* collapse : 표(table)의 테두리와 셀(td)의 테두리 사이의 간격을 없앱니다. 겹치는 부분은 한 줄로 나타냅니다. */
  }
  td {
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
  }
</style>