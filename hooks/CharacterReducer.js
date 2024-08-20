const types ={
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
    INITIAL: "INITIAL",
    
}

export const initialState={
    loading: true,
    error: false,
    results: []
}

export const actionCreators ={
    loading: () => ({type: types.LOADING}),
    failure: () => ({ type: types.FAILURE }),
    success: (payload) => ({ type: types.SUCCESS, payload }),
    initial: (payload) => ({ type: types.INITIAL, payload })
}

export function reducer(state,action){
    switch (action.type) {
        case types.LOADING:
            return {...state, loading: true, error: false}
        case types.FAILURE:
            return {...state, loading: false, error: true } 
        case types.SUCCESS:
            return {loading: false, error: false, results: action.payload}
        case types.INITIAL:
            return { loading: false, error: false, results: [] }
    }
}