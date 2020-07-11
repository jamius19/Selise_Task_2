import React from 'react';

import trophy_icon from './assets/trophy_icon.png';
import styles from './ResultTable.module.scss';

function ResultTable(props) {
    return (
        <div>
            <table>
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
                        let draw = value.score1 === value.score2;
                        let team1Won = value.score1 > value.score2;

                        return (
                            <tr key={`${value.team1.key}-${value.team2.key}-${value.date}`} className={styles.table_row}>
                                <td>{value.date}</td>
                                <td>
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <img
                                                className={`${styles.trophy_icon} mr-2 ${draw ? "d-none" : (team1Won ? "" : "d-none")}`}
                                                src={trophy_icon} alt="trophy_icon"/>
                                            <a href="#"
                                               onClick={() => props.modalHandler(value.team1.key)}
                                               className={styles.team}>{value.team1.name}</a>
                                        </div>

                                        <div className="col-lg-1 my-1 mt-md-0"><span className="mx-2">vs</span></div>

                                        <div className="col-lg-5">
                                            <a href="#"
                                               onClick={() => props.modalHandler(value.team2.key)}
                                               className={styles.team}>{value.team2.name}</a>
                                            <img
                                                className={`${styles.trophy_icon} ml-2 ${draw ? "d-none" : (team1Won ? "d-none" : "")}`}
                                                src={trophy_icon} alt="trophy_icon"/>
                                        </div>
                                    </div>
                                </td>
                                <td><span
                                    className={`${draw ? "" : (team1Won ? "font-weight-bold" : "")}`}>{value.score1}</span>
                                    <span className="mx-1">-</span>
                                    <span
                                        className={`${draw ? "" : (team1Won ? "" : "font-weight-bold")}`}>{value.score2}</span>
                                </td>
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