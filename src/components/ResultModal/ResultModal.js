import React from 'react';
import Rodal from 'rodal';

import '../../vendor/rodal/rodal.css';
import styles from './ResultModal.module.scss';


/* Stateless react component for showing the
 * table containing all the data for teams.
 */
function ResultModal(props) {
    return (
        <div>
            <Rodal height={300} width={window.innerWidth < 400 ? 300: 400} visible={props.isVisible} onClose={props.onModalClose}>
                <div className="mt-5 px-sm-4 pb-2 pb-sm-4">

                    <h5>Score Summary</h5>
                    <h3 className="mb-4">{props.data.name}</h3>

                    <table>
                        <thead>
                        <tr>
                            <td>Played</td>
                            <td>Win</td>
                            <td>Loss</td>
                            <td>Draw</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className={styles.modal_td}>
                            <td>{props.data.played}</td>
                            <td>{props.data.win}</td>
                            <td>{props.data.loss}</td>
                            <td>{props.data.draw}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </Rodal>
        </div>
    );
}

export default ResultModal;