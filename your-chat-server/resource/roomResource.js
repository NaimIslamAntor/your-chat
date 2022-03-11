

const formatOfRoom = (data) => {
    const { _id, name, about, user } = data
    const { username } = user

    return {
        _id,
        name,
        about,
        user: {
            username
        }
    }
}

const roomResource = (datas, isMany=true) => {

    if (isMany) {
        return datas.map(data => formatOfRoom(data))
    }

    return formatOfRoom(datas)


}

module.exports = { roomResource }