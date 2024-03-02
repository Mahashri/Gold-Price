document.getElementById('refreshButton').addEventListener('click', fetchGoldPrice);

const goldPrices = {
    1983: { '22_carat_price': 1317.6, '24_carat_price': 1800.00 },
    1984: { '22_carat_price': 1442.04, '24_carat_price': 1970.00 },
    1985: { '22_carat_price': 1559.16, '24_carat_price': 2130.00 },
    1986: { '22_carat_price': 1566.48, '24_carat_price': 2140.00 },
    1987: { '22_carat_price': 1881.24, '24_carat_price': 2570.00 },
    1988: { '22_carat_price': 2291.16, '24_carat_price': 3130.00 },
    1989: { '22_carat_price': 2298.48, '24_carat_price': 3140.00 },
    1990: { '22_carat_price': 2342.4, '24_carat_price': 3200.00 },
    1991: { '22_carat_price': 2537.112, '24_carat_price': 3466.00 },
    1992: { '22_carat_price': 3172.488, '24_carat_price': 4334.00 },
    1993: { '22_carat_price': 3030.48, '24_carat_price': 4140.00 },
    1994: { '22_carat_price': 3365.736, '24_carat_price': 4598.00 },
    1995: { '22_carat_price': 3425.76, '24_carat_price': 4680.00 },
    1996: { '22_carat_price': 3777.12, '24_carat_price': 5160.00 },
    1997: { '22_carat_price': 3458.7, '24_carat_price': 4725.00 },
    1998: { '22_carat_price': 2960.94, '24_carat_price': 4045.00 },
    1999: { '22_carat_price': 3099.288, '24_carat_price': 4234.00 },
    2000: { '22_carat_price': 3220.8, '24_carat_price': 4400.00 },
    2001: { '22_carat_price': 3147.6, '24_carat_price': 4300.00 },
    2002: { '22_carat_price': 3652.68, '24_carat_price': 4990.00 },
    2003: { '22_carat_price': 4099.2, '24_carat_price': 5600.00 },
    2004: { '22_carat_price': 4282.2, '24_carat_price': 5850.00 },
    2005: { '22_carat_price': 5124, '24_carat_price': 7000.00 },
    2006: { '22_carat_price': 6273.24, '24_carat_price': 8570.00 },
    2007: { '22_carat_price': 7905.6, '24_carat_price': 10800.00 },
    2008: { '22_carat_price': 9150, '24_carat_price': 12500.00 },
    2009: { '22_carat_price': 10614, '24_carat_price': 14500.00 },
    2010: { '22_carat_price': 13542, '24_carat_price': 18500.00 },
    2011: { '22_carat_price': 19324.8, '24_carat_price': 26400.00 },
    2012: { '22_carat_price': 22728.6, '24_carat_price': 31050.00 },
    2013: { '22_carat_price': 21667.2, '24_carat_price': 29600.00 },
    2014: { '22_carat_price': 20500.758, '24_carat_price': 28006.50 },
    2015: { '22_carat_price': 19283.442, '24_carat_price': 26343.50 },
    2016: { '22_carat_price': 20952.402, '24_carat_price': 28623.50 },
    2017: { '22_carat_price': 21716.61, '24_carat_price': 29667.50 },
    2018: { '22_carat_price': 23012.616, '24_carat_price': 31438.00 },
    2019: { '22_carat_price': 25781.04, '24_carat_price': 35220.00 },
    2020: { '22_carat_price': 35612.532, '24_carat_price': 48651.00 },
    2021: { '22_carat_price': 35663.04, '24_carat_price': 48720.00 },
    2022: { '22_carat_price': 38554.44, '24_carat_price': 52670.00 },
    2023: { '22_carat_price': 47821.56, '24_carat_price': 65330.00 },
    2024: { '22_carat_price': 46320.00, '24_carat_price': 64330.00 }
};

function calculateCAGR(initialPrice, finalPrice, years) {
    return (Math.pow(finalPrice / initialPrice, 1 / years) - 1) * 100;
}

document.getElementById('yearSelect').addEventListener('change', function() {
    const selectedYear = parseInt(this.value);
    const selectedGoldData = goldPrices[selectedYear];

    if (selectedGoldData) {
        const goldPrice = selectedGoldData['22_carat_price'].toLocaleString();
        document.getElementById('22_carat_price').textContent = goldPrice;

        const startYear = parseInt(this.options[0].value);
        const endYear = selectedYear;
        const initialPrice = goldPrices[startYear]['22_carat_price'];
        const finalPrice = selectedGoldData['22_carat_price'];
        const years = endYear - startYear + 1;
        const cagr = calculateCAGR(initialPrice, finalPrice, years).toFixed(2);
        document.getElementById('CAGR').textContent = cagr + '%';
    } else {
        document.getElementById('22_carat_price').textContent = '-';
        document.getElementById('CAGR').textContent = '-';
    }
});

function fetchGoldPrice() {

    //const apiKey = 'goldapi-8n0a5cslt8r3qf6-io';
    // const url = 'https://www.goldapi.io/api/XAU/INR';


    fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': apiKey
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.price) {
                const priceInINRPerGram = data.price / 29.273;
                const totalPriceFor8Grams = priceInINRPerGram * 8;
                document.getElementById('priceDisplay').innerHTML = `1 Gram of Gold: INR ${priceInINRPerGram.toFixed(2)}<br>8 Grams of Gold: INR ${totalPriceFor8Grams.toFixed(2)}`;
            } else {
                console.error("Error: Invalid response from API");
                document.getElementById('priceDisplay').textContent = 'Failed to load data.';
            }
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
            document.getElementById('priceDisplay').textContent = 'Failed to load data.';
        });
}

fetchGoldPrice();

// Array of quotes
function updateGoldPriceText() {
    // Get the selected year from the dropdown
    const selectedYear = document.getElementById('yearSelect').value;

    // Update the text with the selected year
    document.getElementById('selectedYear').textContent = selectedYear;
}
