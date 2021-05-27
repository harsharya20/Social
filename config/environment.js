const development = {
    name : 'developement',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp:  {
        service : 'gmail',
        host: 'smtp.gmail.com',  
        port : 587,
        secure: false,
        auth: {
            user: 'harya9263@gmail.com',  
            pass: 'harsharya123'
        }
        
    },
    google_client_id: "698661915476-cvi9sc2jo4nn22tgn68gm0cgunmohjco.apps.googleusercontent.com",
    google_client_secret : "8PNnO6GJ7aPI5eFTqIpy88W3",
    google_call_back_url : "http://localhost:3000/users/auth/google/callback",
    jwt_secret : 'codeial'

}

const production ={
    name: 'production',
    asset_path:  process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY ,
    db: process.env.CODEIAL_DB,
    smtp:  {
        service : 'gmail',
        host: 'smtp.gmail.com',  
        port : 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_SMTP_USER,  
            pass: process.env.CODEIAL_SMTP_PASS
        }
        
    },
    google_client_id: process.env.CODEIAL_CLIENT_ID,
    google_client_secret : process.env.CODEIAL_CLIENT_SECRET,
    google_call_back_url : process.env.CODEIAL_CALLBACK_URL,
    jwt_secret : process.env.CODEIAL_JWT_SECRET

}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);