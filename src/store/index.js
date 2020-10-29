import { createStore } from 'vuex'

export default createStore({
  state () {
      return {
          cardList: [],
          selectedList: [],
      }
  },
  mutations: {
      add(state, payload) {
          state.cardList[payload] = [];
      },
      push(state, payload) {
          state.cardList[payload.index].push(...payload.list);
      },
      delete(state, payload) {
          state.cardList[0] = state.cardList[0].filter(card => payload.indexOf(card.index) < 0);
      },
      selected(state, payload) {
        let card = state.cardList[0].filter(card => card.index === payload)[0];
        card.isSelected = !card.isSelected;
      },
      clear(state) {
        state.cardList[0].forEach(card => card.isSelected = false);
      },
      replace(state, payload) {
        state.selectedList = payload;
      }
  }
})
