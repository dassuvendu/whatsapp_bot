import { cleanEnv, num, str } from "envalid"; 

export default cleanEnv(process.env,{
    PORT:str(),
    TOKEN:str(),
    VERIFY_TOKEN:str(),
    VERSION:str(),
    PHONE_NO_ID:str(),
    DB_USER:str(),
    DB_HOST:str(),
    DB_DATABASE:str(),
    DB_PASSWORD:str(),
    DB_PORT:str()
});

