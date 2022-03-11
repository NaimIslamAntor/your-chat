

const formatOfMessage = (data) => {
    const { _id, message, user } = data
    const { username } = user

    return {
        _id,
         message,
        user: {
            username
        }
    }
}

const messageResource = (datas, isMany=true) => {

    if (isMany) {
        return datas.map(data => formatOfMessage(data))
    }

    return formatOfRoom(datas)


}

module.exports = { messageResource }