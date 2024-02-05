import React from 'react'

const Transactions = ({ dataDetailBusiness }) => {
  return (
    <div className="flex justify-center md:justify-start items-center space-x-4 my-4">
      <div>
        <span className="indicator-item badge badge-base-content">Transactions: </span>
        <div className="rounded-xl text-center bg-base-300 flex py-2 px-3">
          {dataDetailBusiness?.transactions?.map((transaction, index) => (
            <div key={index} className="badge badge-outline ml-2 p-4">{transaction}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Transactions