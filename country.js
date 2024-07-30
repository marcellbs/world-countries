const api = 'https://restcountries.com/v3.1/';
const countryDetailTag = document.querySelector('.country-detail');


const fetchCountryDetail = async (countryName) => {
    try {
        const response = await fetch(api + 'name/' + countryName);
        const data = await response.json();
        

        if (data && data.length > 0) {
            console.log(data)
            const country = data[0];
            const nativeName = typeof country.name.nativeName == 'object' ? Object.values(country.name.nativeName)[0].official : '--';
            const commonNativeName = typeof country.name.nativeName == 'object' ? Object.values(country.name.nativeName)[0].common : '--';
            const languages = typeof country.name.nativeName == 'object' ? Object.values(country.languages)[0] : '--';

            const currencies = typeof country?.currencies == 'object' ? Object.keys(country.currencies)[0] : '--';

            const borders = typeof country?.borders == 'object' ? country.borders : ['--'];

            const iddChecker = (idd) => idd[1]?.length < 2 ? idd.flat().join('') : idd[0];
            const idd = typeof country.idd == 'object' ? iddChecker(Object.values(country.idd)) : '--';

            let languageRows = '';
            if(country.languages){
              Object.entries(country.languages).forEach(([key, value]) => {
                languageRows +=`<tr>
                  <td class="p-2">
                    <div class="font-semibold text-gray-800">${key}</div>
                  </td>
                  <td class="p-2">
                    <div class="text-left text-gray-600">${value}</div>
                  </td>
                </tr>`
              });
            } else{
              languageRows = `<tr>
              <td class="p-2">
              <div class="font-semibold text-gray-800">--</div>
              </td>
              <td class="p-2">
              <div class="text-left text-gray-600">--</div>
              </td>
              </tr>`
            }

            const countryDetailContent = `
            
                <header class="flex items-center gap-2">
                  <a href="/" class="h-1/2 flex items-center justify-center px-5 py-2 text-sm text-white transition-colors duration-200 bg-black border rounded-lg gap-x-2 sm:w-auto hover:bg-slate-800">
                      <svg class="w-5 h-5 text-white rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                      </svg>
                      <span class="font-semibold">Back</span>
                  </a>
                  <h1 class="text-3xl lg:text-4xl my-4 font-semibold">${country.name.common}</h1>
                </header>

                <div class="flex flex-col md:flex-row justify-center gap-3 md:gap-2">
                  
                  <div class="w-full mx-auto md:order-last">
                    <div>
                      <div class="rounded-t mb-0 px-4 py-3 border-0 bg-black">
                        <div class="flex flex-wrap items-center">
                          <div class="relative w-full max-w-full flex-grow flex-1">
                            <h3 class="font-semibold text-base text-white">Flags</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    <table class="table-auto w-full bg-white">
                      <tr>
                        <td class="flex justify-center my-3">
                          <img src="${country.flags.svg}" alt="" height="200" width="300" class="justify-center shadow-lg border-solid border-slate-500 border-2">
                        </td>
                      </tr>
                    </table>
                    
                  </div>
                  
                  <div class="w-full mx-auto">
                    <div>
                      <div class="rounded-t mb-0 px-4 py-3 border-0 bg-black">
                        <div class="flex flex-wrap items-center">
                          <div class="relative w-full max-w-full flex-grow flex-1">
                            <h3 class="font-semibold text-base text-white">Names</h3>
                          </div>
                        </div>
                      </div>
                      <table class="table-auto w-full bg-white">
                                        
                          <tbody class="text-sm divide-y divide-gray-100">
                              <tr>
                                  <td class="p-2">
                                      <div class="font-semibold text-gray-800">Common</div>
                                  </td>
                                  <td class="p-2">
                                      <div class="text-left text-gray-600">${country.name.common}</div>
                                  </td>
                              </tr>
                              <tr>
                                  <td class="p-2">
                                      <div class="font-semibold text-gray-800">Official</div>
                                  </td>
                                  <td class="p-2">
                                      <div class="text-left text-gray-600">${country.name.official}</div>
                                  </td>
                              </tr>
                              <tr>
                                  <td class="p-2">
                                      <div class="font-semibold text-gray-800">Common (Native)</div>
                                  </td>
                                  <td class="p-2">
                                      <div class="text-left text-gray-600">${commonNativeName}</div>
                                  </td>
                              </tr>
                              <tr>
                                  <td class="p-2">
                                      <div class="font-semibold text-gray-800">Official (Native)</div>
                                  </td>
                                  <td class="p-2">
                                      <div class="text-left text-gray-600">${nativeName}</div>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                    </div>
                    
                    <div class="mt-3">
                      <div class="rounded-t mb-0 px-4 py-3 border-0 bg-black">
                        <div class="flex flex-wrap items-center">
                          <div class="relative w-full max-w-full flex-grow flex-1">
                            <h3 class="font-semibold text-base text-white">Codes</h3>
                          </div>
                        </div>
                      </div>
                      <table class="table-auto w-full bg-white">
                                        
                          <tbody class="text-sm divide-y divide-gray-100">
                              <tr>
                                  <td class="p-2">
                                      <div class="font-semibold text-gray-800">ISO 3166-1 alpha-2</div>
                                  </td>
                                  <td class="p-2">
                                      <div class="text-left text-gray-600">${country.cca2}</div>
                                  </td>
                              </tr>
                              <tr>
                                  <td class="p-2">
                                      <div class="font-semibold text-gray-800">ISO 3166-1 alpha-3</div>
                                  </td>
                                  <td class="p-2">
                                      <div class="text-left text-gray-600">${country.cca3}</div>
                                  </td>
                              </tr>
                              <tr>
                                  <td class="p-2">
                                      <div class="font-semibold text-gray-800">ISO 3166-1 numeric</div>
                                  </td>
                                  <td class="p-2">
                                      <div class="text-left text-gray-600">${country.ccn3}</div>
                                  </td>
                              </tr>
                              <tr>
                                  <td class="p-2">
                                      <div class="font-semibold text-gray-800">International calling code</div>
                                  </td>
                                  <td class="p-2">
                                      <div class="text-left text-gray-600">${idd}</div>
                                  </td>
                              </tr>
                              <tr>
                                  <td class="p-2">
                                      <div class="font-semibold text-gray-800">ISO 4217 currency code</div>
                                  </td>
                                  <td class="p-2">
                                      <div class="text-left text-gray-600">${currencies}</div>
                                  </td>
                              </tr>
                              <tr>
                                  <td class="p-2">
                                      <div class="font-semibold text-gray-800">Top level domain</div>
                                  </td>
                                  <td class="p-2">
                                      <div class="text-left text-gray-600">${country.cca3}</div>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                    </div>



                  </div>

                  <div class="w-full mx-auto">
                    <div>
                      <div class="rounded-t mb-0 px-4 py-3 border-0 bg-black">
                        <div class="flex flex-wrap items-center">
                          <div class="relative w-full max-w-full flex-grow flex-1">
                            <h3 class="font-semibold text-base text-white">Language</h3>
                          </div>
                          
                        </div>
                      </div>
                      <table class="table-auto w-full bg-white">
                                        
                          <tbody class="text-sm divide-y divide-gray-100">
                              <tr>
                                  <td class="p-2">
                                      <div class="font-semibold text-gray-800">Native Language</div>
                                  </td>
                                  <td class="p-2">
                                      <div class="text-left text-gray-600">${languages}</div>
                                  </td>
                              </tr>
                              <tr colspan="2">
                                  <td class="p-2">
                                      <div class="font-semibold text-gray-800">Other Languages</div>
                                  </td>
                              </tr>
                              ${languageRows}
                          </tbody>
                      </table>
                    </div>

                    <div class="mt-3">
                      <div class="rounded-t mb-0 px-4 py-3 border-0 bg-black">
                        <div class="flex flex-wrap items-center">
                          <div class="relative w-full max-w-full flex-grow flex-1">
                            <h3 class="font-semibold text-base text-white">Geography</h3>
                          </div>
                          
                        </div>
                      </div>
                      <table class="table-auto w-full bg-white">
                                        
                          <tbody class="text-sm divide-y divide-gray-100">
                              <tr>
                                  <td class="p-2">
                                      <div class="font-semibold text-gray-800">Region</div>
                                  </td>
                                  <td class="p-2">
                                      <div class="text-left text-gray-600">${country.region}</div>
                                  </td>
                              </tr>
                              
                              <tr>
                                  <td class="p-2">
                                      <div class="font-semibold text-gray-800">Subregion</div>
                                  </td>
                                  <td class="p-2">
                                      <div class="text-left text-gray-600">${country.subregion}</div>
                                  </td>
                              </tr>
                              <tr>
                                  <td class="p-2">
                                      <div class="font-semibold text-gray-800">Capital</div>
                                  </td>
                                  <td class="p-2">
                                      <div class="text-left text-gray-600">${country.capital}</div>
                                  </td>
                              </tr>
                              <tr>
                                  <td class="p-2">
                                      <div class="font-semibold text-gray-800">Population</div>
                                  </td>
                                  <td class="p-2">
                                      <div class="text-left text-gray-600">${country.population}</div>
                                  </td>
                              </tr>
                              <tr>
                                  <td class="p-2">
                                      <div class="font-semibold text-gray-800">Area</div>
                                  </td>
                                  <td class="p-2">
                                      <div class="text-left text-gray-600">${country.area} km<sup>2</sup></div>
                                  </td>
                              </tr>
                              <tr>
                                  <td class="p-2">
                                      <div class="font-semibold text-gray-800">Lat/Lng</div>
                                  </td>
                                  <td class="p-2">
                                      <div class="text-left text-gray-600">${country.latlng
                                        [0]+', '+country.latlng[1]}</div>
                                  </td>
                              </tr>
                              <tr>
                                  <td class="p-2">
                                      <div class="font-semibold text-gray-800">Land Borders</div>
                                  </td>
                                  <td class="p-2">
                                      <div class="text-left text-gray-600">${borders.join(', ')}</div>
                                  </td>
                              </tr>
                              
                              
                              
                          </tbody>
                      </table>
                    </div>
                    
                  </div>

                </div>
            `;

            countryDetailTag.innerHTML = countryDetailContent;
        }
    } catch (error) {
      console.error(error.message)
        const errorMessage = `
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm" role="alert">
            <span class="font-medium">Error!</span> ${error.message}
          </div>
        `;
        countryDetailTag.innerHTML = errorMessage;
    }
};

// Get country name from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const countryName = urlParams.get('country');
if (countryName) {
    fetchCountryDetail(countryName);
} else {
  // If no country name is provided, display a message
  const message = `
  <div class="bg-red-100 border border-red-400 text-red-700 px-
  4 py-3 rounded text-sm" role="alert">
  <span class="font-medium">Error!</span> No country name provided.
  </div>
  `

  countryDetailTag.innerHTML += message
}