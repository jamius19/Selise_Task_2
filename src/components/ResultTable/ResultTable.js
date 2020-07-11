import React from 'react';

import styles from './ResultTable.module.scss'

function ResultTable(props) {
    return (
        <div>
            <table className="mt-5">
                <thead>
                <tr>
                    <td>
                        Date
                    </td>

                    <td>
                        Teams
                    </td>

                    <td>
                        Score
                    </td>
                </tr>
                </thead>

                <tbody>
                {
                   props.matches.map(value => {
                        return (
                            <tr>
                                <td>{value.date}</td>
                                <td>{value.team1.name} <b className="text-weight-bold">vs</b> {value.team2.name}</td>
                                <td>{value.score1} - {value.score2}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
    );
}

export default ResultTable;