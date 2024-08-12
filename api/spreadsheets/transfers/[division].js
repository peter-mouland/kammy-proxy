import { Connect as googleSpreadsheet } from "./GoogleSpreadsheet.js";
import { serviceAccountAuth } from '../auth';
import { spreadsheets } from '../spreadsheets';
import { allowCors } from '../allow-cors';

async function handler(req, res) {
    try {
        const { addRows } = await googleSpreadsheet(spreadsheets.TRANSFERS_ID, serviceAccountAuth)
        if (!req.body || !req.query.division) {
            return res.status(500).json({ error: 'incomplete request',  body: req.body || false, division: req.query.division || false });
        }

        const response = await addRows(req.query.division, req.body);

        return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        return res.status(500).json(e);
    }
}

export default allowCors(handler)
