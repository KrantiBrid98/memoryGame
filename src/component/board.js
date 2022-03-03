import React, { useEffect, useState } from "react";

import "./board.css";

const Board = ({ boardGrid, isUserPlaying, count = 0, setUserSequence = () => { } }) => {
    let tempUserSequence = [];
    return <>
        <table>
            <tbody>
                {
                    boardGrid.map((tile, i) => <tr>
                        {
                            tile.map((data) => {
                                return <td>
                                    <button
                                        style={{ "backgroundColor": `${data.color}` }}
                                        className="tile"
                                        id={data.id}
                                        key={data.color}
                                        value={data.id}
                                        onClick={e => {
                                            if (isUserPlaying) {
                                                tempUserSequence.push(e.target.value)
                                                if (count + 1 === tempUserSequence.length) {
                                                    setUserSequence(tempUserSequence)
                                                }
                                            }
                                        }}>
                                    </button>
                                </td>
                            })

                        }
                    </tr>
                    )
                }
            </tbody>
        </table>
    </>
}

export default Board