import { Connect as googleSpreadsheet } from "../transfers/GoogleSpreadsheet.js";

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
    SETUP_ID: '1p1ICFDYdONIri91zCiW-ATBLXavpriECYP7fmd-r4oc', // game-weeks, players, teams + draft picks
    TRANSFERS_ID: '14laYRwz5EEorx3DRygOrztBApg3DWac6-0gz43XUzk4', // transfers
    DRAFT_ID: '1UKOeKiApAoNMXj8id3wfaTq9HrO2zHz5_yO2TqCah7c', // teams + draft picks
};

async function handler(req, res) {
    const { addRows } = await googleSpreadsheet(spreadsheets.TRANSFERS_ID)
    const { body } = req;
    if (!body) {
        return res.status(500).json({ error: 'incomplete request',  body: body || false });
    }

    const response = await addRows('cupSubmissions', body);

    return res.status(200).json(response);
}

export default allowCors(handler)
