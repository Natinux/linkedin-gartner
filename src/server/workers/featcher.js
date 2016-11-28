import fetch from 'node-fetch';


export default async (url) => {

    let res = await fetch(url, {
        method: 'GET',
        headers: {
            Host: 'www.linkedin.com',
            Connection: 'keep-alive',
            'Cache-Control': 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36',
            Cookie: 'li_at=AQEDASBvKesAbWJwAAABWG3vH_wAAAFYblz8_E4Apl8tJMlRfxSQk4nX5F1Jen9mulPA4w74ESFggGfQK4YXk1WRqWTwgeceaUMnFKZGpXweh-0uPPnQ8jlX1Up8gtb8Qd-YUDM63D2xf-ap32GMjkYr;'
        }
    });

    if(!res.ok){
        throw new Error(res.statusText);
    }

    return await res.text();
};