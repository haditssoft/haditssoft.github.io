const initialState = {
    summary: '',
    loading: false,
    error: null
};

const aiSummaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AI_SUMMARY_START':
            return { ...state, loading: true, error: null };
        case 'AI_SUMMARY_SUCCESS':
            return { ...state, loading: false, summary: action.summary };
        case 'AI_SUMMARY_FAIL':
            return { ...state, loading: false, error: action.error };
        case 'AI_SUMMARY_CLEAR':
            return { ...initialState };
        default:
            return state;
    }
};

export default aiSummaryReducer;
