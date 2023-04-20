import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1/name/';
const searchParams = new URLSearchParams({
		fields: 'name,capital,population,flags,languages,',
});

export const fetchCountries = (name) => {
		return fetch(`${BASE_URL}${name}?${searchParams}`)
			.then(response => {
				if (!response.ok) {
					throw new Error(Notiflix.Notify.failure('Oops, there is no country with that name'));
				}
				return response.json();
			});
};