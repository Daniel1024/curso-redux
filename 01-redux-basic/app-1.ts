// Acciones
interface Action {
  type: string;
  payload?: any;
}

function reducer(state = 10, action: Action) {
  switch (action.type) {
    case 'INCREMENTAR':
      return state + 1;
    case 'DECREMENTAR':
      return state - 1;
    case 'MULTIPLICAR':
      return state * action.payload;
    case 'DIVIDIR':
      return state / action.payload;
    default:
      return state;
  }
}

// Usar el reducer

// Sumar
const incrementadorAction: Action = {
  type: 'INCREMENTAR'
};

console.log('Sumar:', reducer(10, incrementadorAction)); // 11

// Restar
const decrementadorAction: Action = {
  type: 'DECREMENTAR'
};

console.log('Restar:', reducer(10, decrementadorAction)); // 9

// Multiplicar
const multiplicarAction: Action = {
  type: 'MULTIPLICAR',
  payload: 2
};

console.log('Multiplicar:', reducer(10, multiplicarAction)); // 20

// Dividir
const dividirAction: Action = {
  type: 'DIVIDIR',
  payload: 2
};

console.log('Dividir:', reducer(10, dividirAction)); // 5
