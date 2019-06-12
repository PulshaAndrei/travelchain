const initState = {
	contents: []
};

export default function content(state = initState, action: any) {
  switch (action.type) {
	case 'SET_CONTENTS':
	  return { ...state, contents: action.payload };
	default:
	  return state;
  }
}

function setContents(value) {
  return (dispatch: any) => dispatch({ type: 'SET_CONTENTS', payload: value });
}

export function loadContents() {
  return async (dispatch: any) => {
		// TODO: request
		const contents = [
      {
        title: 'Content Title',
        description: 'Description 1',
      },
      {
        title: 'Content Title 1',
        description: 'Description 2',
				username: 'business@email.com',
      },
      {
        title: 'Content Title 2',
        description: 'Description 3',
				username: 'business@email.com',
      },
    ];
		dispatch(setContents(contents));
  };
}

export function addContent(newContent: any) {
	return async (dispatch: any, getState: any) => {
		// TODO: request
		const contents = getState().content.contents;
		contents.push(newContent);
		console.log(contents);
		dispatch(setContents(contents));
	};
}