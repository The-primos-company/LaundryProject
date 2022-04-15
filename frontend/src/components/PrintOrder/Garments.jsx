import React from 'react'

export const Garments = ({ order = [], height = 150, enable = true }) => {
  return (
    <>
      {order.garments.map((item) => {
        return (
          <tr>
            <td className="border" style={{ textAlign: "center" }}>
              {item.cuantity}
            </td>
            <td className="border" style={{ fontSize: 15 }}>
              {item.category} {item.gendre} {item.color} {item.brand}
            </td>
          </tr>
        );
      })}
      {enable
        ?
        <div
          style={{ width: 10, height: height }}
        />
        : null}
    </>
  )
}
