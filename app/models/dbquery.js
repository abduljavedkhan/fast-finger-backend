const QUERY = {
    CHECK_USER_EXIST : "SELECT * FROM user_account WHERE email=?",
    CREATE_USER : "INSERT INTO user_account set ?",
    LOGIN : "SELECT * FROM user_account WHERE email=? AND password=?",
    ALL_USERS : "SELECT * FROM user_account",
    STORE_GAME_DATA : "INSERT INTO game_data (player_id, score) VALUES (?, ?)",
    GET_GAME_DATA : "SELECT * FROM game_data WHERE player_id=?"
}

module.exports = QUERY;