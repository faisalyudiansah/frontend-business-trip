import React from 'react'
import { useParams } from 'react-router-dom'

const DetailBusiness = () => {
    let { aliasBusiness } = useParams()

    return (
        <div>{aliasBusiness}</div>
    )
}

export default DetailBusiness