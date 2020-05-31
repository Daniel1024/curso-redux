// Acciones
interface Action {
  type: string;
  payload?: any;
}

const incrementadorAction: Action = {
  type: 'INCREMENTAR'
}

function reducer(state = 10, action: Action) {
  if (action.type === 'INCREMENTAR') {
    return state += 1;
  }
  return state;
}

// Usar el reducer

console.log(reducer(10, incrementadorAction));
