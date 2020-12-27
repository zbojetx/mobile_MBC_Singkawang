import axios from 'axios'

const endpoint = 'https://admin.ukm.singkawangkota.go.id/api'


export const get_all = async(url) => {
    let data = []
    await axios.get(`${endpoint}${url}`,{
        headers: {
            'x-api-key' : 'web-client'
        }
    })
    .then(res => {
        data = res.data
    })

    return(data)
}

export const get_all_by_id = async(url, id) => {
    let data = []
    await axios.get(`${endpoint}${url}/${id}`,{
        headers: {
            'x-api-key' : 'web-client'
        }
    })
    .then(res => {
        data = res
    })

    return(data)
}

export const get_all_post = async(url, datas) => {
    let data = []
    console.log(datas.keyword)
    await axios.post(`${endpoint}${url}`,{
        'keyword': datas.keyword
    },{
        headers: {
            'x-api-key' : 'web-client'
        }
    })
    .then(res => {
        data = res
    })

    return(data)
}