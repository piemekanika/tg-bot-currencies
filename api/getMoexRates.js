import axios from 'axios'

const url = 'https://iss.moex.com/iss/engines/currency/markets/selt/boardgroups/13/securities.jsonp?iss.meta=off&lang=ru&iss.json=extended&security_collection=177&sort_column=VALTODAY&sort_order=desc';

const getMoexRates = async () => {
    const { data } = await axios.get(url);

    const marketData = data[1].marketdata;

    const usd = getLastPrice('USD000UTSTOM', marketData);
    const eur = getLastPrice('EUR_RUB__TOM', marketData);
    const yun = getLastPrice('CNYRUB_TOM', marketData);
    const kzt = getLastPrice('KZTRUB_TOM', marketData);
    const usdToKzt = getLastPrice('USDKZT_TOM', marketData);

    return `
1 USD = ${usd} RUB (${usdToKzt} KZT)
1 EUR = ${eur} RUB
1 CNY = ${yun} RUB
1 KZT = ${Math.round(1000000 / kzt) / 10000} RUB
    `;
}

const getLastPrice = (secId, marketData) => {
    return marketData.find((item) => item.SECID === secId).LAST;
}

export {
    getMoexRates,
};
