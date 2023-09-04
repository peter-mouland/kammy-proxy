const allowCors = fn => async (req, res) => {
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

async function handler(req, res) {
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

export default allowCors(handler)
