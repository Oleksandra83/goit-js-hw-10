import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const countriesList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const searchBox = document.querySelector('#search-box')

searchBox.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(evt) {
	const value = searchBox.value.trim();
	if (!value) {
	countriesList.innerHTML = '';
	countryInfo.innerHTML = '';
		return;
	}

	fetchCountries(value)
		.then(data => {
			if (data.length > 10) {
				Notiflix.Notify.info(
					'Too many matches found. Please enter a more specific name.'
				);
			}
			renderCountries(data);
			})
			.catch(err => {
			countriesList.innerHTML = '';
			countryInfo.innerHTML = '';
			 Notiflix.Notify.failure('Oops, there is no country with that name');
			});
}

const markupCountryInfo = data =>
	data.reduce(
		(acc, { flags: { svg }, name, capital, population, languages }) => {
			console.log(languages);
			languages = Object.values(languages).join(', ');
			console.log(name);
			return (
				acc +
				` <img src="${svg}" alt="${name}" width="320" height="auto">
					<h2 class="country-title"> ${name.official}</h2>
					<p>Capital: <span> ${capital}</span></p>
					<p>Population: <span> ${population}</span></p>
					<p>Languages: <span> ${languages}</span></p>`
			);
		},
		''
	);

const markupCountryList = data =>
	data.reduce((acc, { name: { official, common }, flags: { svg } }) => {
		return (
			acc +
			`<li>
				<img src="${svg}" alt="${common}" width="70">
				<p>${official}</p>
			</li>`
		);
	}, '');

function renderCountries(result) {
	if (result.length === 1) {
		countriesList.innerHTML = '';
		countryInfo.innerHTML = markupCountryInfo(result);
	}
	if (result.length >= 2 && result.length <= 10) {
		countryInfo.innerHTML = '';
		countriesList.innerHTML = markupCountryList(result);
	}
}
