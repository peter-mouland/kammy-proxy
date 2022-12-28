export default async function handler(req, res) {
    const bootstrap = await fetch('https://fantasy.premierleague.com/api/fixtures/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await bootstrap.json();
    return res.status(200).json( data);
}

