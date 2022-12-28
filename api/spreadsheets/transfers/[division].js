import { Connect as googleSpreadsheet } from "./GoogleSpreadsheet.js";

const spreadsheets = {
    SETUP_ID: '1p1ICFDYdONIri91zCiW-ATBLXavpriECYP7fmd-r4oc', // game-weeks, players, teams + draft picks
    TRANSFERS_ID: '14laYRwz5EEorx3DRygOrztBApg3DWac6-0gz43XUzk4', // transfers
    DRAFT_ID: '1UKOeKiApAoNMXj8id3wfaTq9HrO2zHz5_yO2TqCah7c', // teams + draft picks
};

export default async function handler(req, res) {
    const { addRows } = await googleSpreadsheet(spreadsheets.TRANSFERS_ID)
    const { body, query } = req;
    const { division } = query;
    if (!body || !division) {
        return res.status(500).json({ error: 'incomplete request',  body, division });
    }

    const response = await addRows(division, body);

    return res.status(200).json(response);
}

