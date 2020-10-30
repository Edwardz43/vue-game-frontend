import { createStore } from 'vuex'

export default createStore({
  state () {
      return {
          cardList: [],
          selectedIndexList: [],
          currentCard: [],
          myTurn: false,
          isLeader: false,
      }
  },
  mutations: {
    setMyTurn(state, payload) {
      state.myTurn = payload;
    },
    setLeader(state, payload) {
      state.isLeader = payload;
    },
    init(state, payload) {
        state.cardList = payload;
    },
    add(state, payload) {
      state.selectedIndexList.push(payload);
    },
    removeIndex(state, payload) {
      state.selectedIndexList.splice(state.selectedIndexList.indexOf(payload), 1);
    },
    clearIndexList(state) {
      state.selectedIndexList = [];
    },
    delete(state, payload) {
      let indexList = payload.map(card => card.num);
      console.table(indexList);
      state.cardList = state.cardList.filter(card => indexList.indexOf(card.num) < 0);
    },
    selected(state, payload) {
      let card = state.cardList.filter(card => card.index === payload)[0];
      card.isSelected = !card.isSelected;
    },
    clear(state) {
      state.cardList.forEach(card => card.isSelected = false);
    },
    replace(state, payload) {
      state.currentCard = payload;
    }
  }
})
