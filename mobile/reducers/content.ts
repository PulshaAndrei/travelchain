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
        title: 'Red Church',
        description: 'The Red Church is a symbol of Minsk. The official name of the church is quite rare and, probably, can’t be found elsewhere in the world: Sts. Simon and Helena Church. It’s because the church was built to commemorate the premature death of two young children, Simon and Helena Wojnilowicz, of a Belarusian aristocratic family. It is known as the ‘Red’ Church because of its red brick walls. This neo-Gothic church was designed by Polish architect Tomasz Pajzderski and consecrated in 1910.',
        imageUrl: 'https://thesanetravel.com/images/Travels/_Minsk/minsk-red-church-www.thesanetravel.com-11.JPG'
      },
      {
        title: 'Nezavisimosti Avenue',
        description: 'Minsk suffered a lot in the Second World War, with 80% of the buildings destroyed. A new city had to be built afterwards. It was rebuilt in grand Stalin’s empire style: wide boulevards are lined with ornate imperial grandeur buildings. Some researchers consider it a variation of art deco. This architectural style was apparently derived from the French empire style of Napoleon Bonaparte.',
        imageUrl: 'https://thesanetravel.com/images/Travels/_Minsk/minsk-nezavisimosti-avenue-www.thesanetravel.com-15.JPG',
				username: 'business@email.com',
      },
      {
        title: 'Upper Town',
        description: 'The rich and famous inhabitants of the city had their houses in the Upper town since the middle of the 16th century. It’s the central part of Minsk with so much to see. I’ll just bring a few highlights to your attention.',
        imageUrl: 'https://thesanetravel.com/images/Travels/_Minsk/upper-town-minsk-thesanetravel.com-1220842.JPG',
				username: 'business@email.com',
      },
      {
        title: 'Bolshoi Opera and Ballet Theatre',
        description: 'The theatre was designed by architect Iosif Langbard and opened in 1939, its grandiose style inspired by Roman amphitheatres. The building suffered from bombing in the Second World War and was opened again after reconstruction in 1947.',
        imageUrl: 'https://thesanetravel.com/images/Travels/_Minsk/national-academic-bolshoi-opera-ballet-theater-belarus-minsk-thesanetravel.com-1220997.JPG',
      },
      {
        title: 'Kupala park',
        description: 'Minsk is a very green city with a lot of parks. Many of them are located on the banks of the river Svislotch. Which park to visit? The choice is yours and depends on your spare time. If you have little, just take a walk in Janka Kupala Park next to the Bolshoi theatre in the city centre.',
        imageUrl: 'https://thesanetravel.com/images/Travels/_Minsk/kupala-park-minsk-belarus-www.thesanetravel.com-1570860.JPG',
      },
      {
        title: 'National Library of Belarus',
        description: 'Viktor Kramarenko and Michael Vinogradov designed the 23-storey National Library of Belarus as a gigantic diamond. It’s a symbol of the precious knowledge stored in the books within. It was completed in 2006.',
        imageUrl: 'https://thesanetravel.com/images/Travels/_Minsk/national-library-minsk-belarus-www.thesanetravel.com-1090173.JPG',
      },
      {
        title: 'Minsk arena',
        description: 'It is one of Europe’s biggest cultural and sports facilities, a great example of Belarusian contemporary architecture. The multipurpose centre is comprised of the arena, a velodrome, a skating stadium, and a multilevel car park. The official opening ceremony of the venue took place in January 2010 as part of the Second KHL All-Star Game, featuring the teams of Jaromir Jagr and Alexei Yashin. In May 2014 Minsk Arena hosted the 2014 IIHF World Championship.',
        imageUrl: 'https://thesanetravel.com/images/Travels/_Minsk/minsk-arena-belarus-www.thesanetravel.com-1080695.JPG',
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