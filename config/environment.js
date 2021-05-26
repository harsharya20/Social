const developement = {
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
    name: 'production'
}

module.exports = developement;