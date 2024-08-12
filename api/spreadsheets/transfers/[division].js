import { Connect as googleSpreadsheet } from "./GoogleSpreadsheet.js";

const allowCors = (fn) => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    return await fn(req, res)
}

const spreadsheets = {
    SETUP_ID: '19uzl1nYi6ZFsFhim4-wm-ztVWazYAshKU0eca7FSwHw', // game-weeks, players, teams + draft picks
    TRANSFERS_ID: '1sU3xKfpOD6m3hdYqddfMXpVmvkJu4_LdUnJd1YLzU9U', // transfers
};

async function handler(req, res) {
    const { addRows } = await googleSpreadsheet(spreadsheets.TRANSFERS_ID)
    const { body, query } = req;
    const { division } = query;
    if (!body || !division) {
        return res.status(500).json({ error: 'incomplete request',  body: body || false, division: division || false });
    }

    const response = await addRows(division, body);

    return res.status(200).json(response);
}

export default allowCors(handler)
