export default async function handler(req, res) {
    const { code } = req.query;

    try {
        const bootstrap = await fetch(`https://fantasy.premierleague.com/api/element-summary/${code}/`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await bootstrap.json();
        return res.status(200).json( data);
    } catch (e) {
        return res.status(500);
    }
}

