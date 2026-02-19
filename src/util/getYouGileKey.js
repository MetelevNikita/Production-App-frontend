



export const getYouGileKey = async (url) => {

  const login = process.env.REACT_APP_YG_LOGIN
  const password = process.env.REACT_APP_YG_PASSWORD


  try {
    const responceID = await fetch(`${url}auth/companies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
       body: JSON.stringify({ login: login, password: password })
    })
    const dataId = await responceID.json()

    const companyId = dataId.content.filter((item) => {
       return item.name === 'UTV Production'
    })[0].id


    // KEY

    const responceKEY = await fetch(`${url}auth/keys/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({login: login, password: password, companyId: companyId})
    })
    const dataKey = await responceKEY.json()
    return dataKey[0].key

  } catch (error) {
    console.log(error)
  }
}