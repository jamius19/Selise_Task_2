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
                            <tr key={`${value.team1.key}-${value.team2.key}-${value.date}`}>
                                <td>{value.date}</td>
                                <td>
                                    <img className={`${styles.trophy_icon} mr-2 ${draw ? "d-none" : (team1Won? "" : "d-none")}`} src={trophy_icon} alt="trophy_icon"/>
                                    <a href="#" className={styles.team}>{value.team1.name}</a>
                                    <span className="mx-2">vs</span>
                                    <a href="#"className={styles.team}>{value.team2.name}</a>
                                    <img className={`${styles.trophy_icon} ml-2 ${draw ? "d-none" : (team1Won? "d-none" : "")}`} src={trophy_icon} alt="trophy_icon"/>
                                </td>
                                <td><span className={`${draw ? "" : (team1Won? "font-weight-bold" : "")}`}>{value.score1}</span>
                                    <span className="mx-1">-</span>
                                    <span className={`${draw ? "" : (team1Won? "" : "font-weight-bold")}`}>{value.score2}</span></td>
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