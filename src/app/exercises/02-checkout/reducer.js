import { produce } from 'immer';

function reducer(state, action) {
  return produce(state, (draftState) => {
    switch (action.type) {
      case 'initialize': {
        console.log('initialize');
        console.log(action.items);
        // when draftState is null, we cant reassign draftState length to be 0
        // draftState.length = 0;
        // action.items.forEach((item) => draftState.push(item));
        return action.items;
      }
      case 'add-item': {
        const itemIndex = state.findIndex((item) => item.id === action.item.id);

        if (itemIndex !== -1) {
          draftState[itemIndex].quantity += 1;

          return;
        }

        draftState.push({
          ...action.item,
          quantity: 1,
        });

        return;
      }

      case 'delete-item': {
        const itemIndex = state.findIndex((item) => item.id === action.item.id);

        draftState.splice(itemIndex, 1);
        return;
      }
    }
  });
}

export default reducer;
