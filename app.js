const api = 'https://restcountries.com/v3.1/';
const countryTag = document.querySelector('.country');

let countriesData = [];

const fetchApi = async() => {
    try {
        const response = await fetch(api + 'all');
        const data = await response.json();

        // Sorting data
        if(data) {
            data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        }
        countriesData = data;
        displayCountries(data);

    } catch (error) {
        countryTag.innerHTML += `
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm" role="alert">
            <span class="font-medium">Error!</span> ${error.message}
        </div>
        `;
    }
};

const displayCountries = (data) => {
    let countryContent = '';
    data.forEach((country) => {
        const nativeName = typeof country.name.nativeName == 'object' ? Object.values(country.name.nativeName)[0].official : country.name.official || undefined;

        const iddChecker = (idd) => idd[1]?.length < 2 ? idd.flat().join('') : idd[0];
        const idd = typeof country.idd == 'object' ? iddChecker(Object.values(country.idd)) : '--';

        countryContent += `
            <div class="w-full my-3 lg:my-0 lg:max-w-xl bg-white shadow-lg border border-gray-200 rounded-md">
                <header class="px-5 py-2 border-b flex items-center justify-between bg-black border-gray-100 rounded-t-md">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 mr-2 sm:mr-3"><img class="border" src="${country.flags.svg}" width="40" height="40" alt=""></div>
                        <div>
                            <h2 class="font-semibold text-white">${country.name.common}</h2>
                            <p class="font-medium text-xs text-white">${nativeName}</p>
                        </div>
                    </div>
                    <div>
                        <a href="country.html?country=${country.name.common.toLowerCase()}" class="p-2 text-sm font-semibold bg-white text-black rounded-md">More</a>
                    </div>
                </header>
                <div class="p-3">
                    <div class="overflow-x-hidden">
                        <table class="table-auto w-full">
                            <tbody class="text-sm divide-y divide-gray-100">
                                <tr>
                                    <td class="p-2 whitespace-nowrap">
                                        <div class="font-semibold text-gray-800">Capital</div>
                                    </td>
                                    <td class="p-2 whitespace-nowrap">
                                        <div class="text-left text-gray-600">${country.capital}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="p-2 whitespace-nowrap">
                                        <div class="font-semibold text-gray-800">Region</div>
                                    </td>
                                    <td class="p-2 whitespace-nowrap">
                                        <div class="text-left text-gray-600">${country.region}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="p-2 whitespace-nowrap">
                                        <div class="font-semibold text-gray-800">Alpha 2 Code</div>
                                    </td>
                                    <td class="p-2 whitespace-nowrap">
                                        <div class="text-left text-gray-600">${country.cca2}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="p-2 whitespace-nowrap">
                                        <div class="font-semibold text-gray-800">Alpha 3 Code</div>
                                    </td>
                                    <td class="p-2 whitespace-nowrap">
                                        <div class="text-left text-gray-600">${country.cca3}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="p-2 whitespace-nowrap">
                                        <div class="font-semibold text-gray-800">Int. dial code</div>
                                    </td>
                                    <td class="p-2 whitespace-nowrap">
                                        <div class="text-left text-gray-600">${idd}</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    });
    countryTag.innerHTML = countryContent; // Mengganti konten sebelumnya dengan konten baru
}



// Event listener untuk pencarian
const searchInput = document.querySelector('#search');
const regionButtons = document.querySelectorAll('.region-btn');
let selectedRegion = 'all';

regionButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'active' class from all buttons
        regionButtons.forEach(btn => {
            btn.classList.remove('bg-black', 'text-white');
            btn.classList.add('bg-white', 'text-black');
        });

        // Add 'active' class to the clicked button
        button.classList.remove('bg-white', 'text-black');
        button.classList.add('bg-black', 'text-white');

        // Set selected region
        selectedRegion = button.getAttribute('data-region');
        
        // Filter countries based on selected region
        filterCountries();
    });
});

// Event listener for input search (real-time)
searchInput.addEventListener('input', () => {
    filterCountries();
});

// Function to filter countries
const filterCountries = () => {
    const searchTerm = searchInput.value.toLowerCase();
    let filteredCountries = countriesData.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm)
    );

    if (selectedRegion !== 'all') {
        filteredCountries = filteredCountries.filter((country) =>
            country.region === selectedRegion
        );
    }

    if (filteredCountries.length === 0) {
        countryTag.innerHTML = `
            <div class="w-full my-3 lg:my-0 lg:max-w-xl bg-white shadow-lg border border-gray-200 rounded-md">
                <div class="p-3">
                    <div class="text-center text-gray-600">
                        <p>Country not found. Please try another search.</p>
                    </div>
                </div>
            </div>
        `;
    } else {
        displayCountries(filteredCountries);
    }
};



fetchApi();
