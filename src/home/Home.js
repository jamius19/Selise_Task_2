import React, {Component} from 'react';
import Dropdown from 'react-dropdown';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
} from "react-router-dom";

import {getCookie, setCookie, deleteCookie} from "../util/UtilityFunc";

// Importing Assets
import styles from './Home.module.scss';
import ResultTable from "../components/ResultTable/ResultTable";

import premierLeagueLogo from './assets/banner_premier_league.svg';

const options = [
    '10', '20', '30'
]


class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fetchComplete: false,
            error: false
        };

        this.restEndpoint = "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json";

        this.onChangeItemCount = this.onChangeItemCount.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            let perPageCount = getCookie('perPage') ? getCookie('perPage') : 10;
            perPageCount = parseInt(perPageCount);


            if (Object.keys(this.props.match.params).length !== 0) {
                this.setState({
                    start: (parseInt(this.props.match.params["pageNo"]) - 1) * perPageCount,
                    currentPage: parseInt(this.props.match.params["pageNo"])
                })
            } else {
                this.setState({
                    start: 0,
                    currentPage: 1,
                    perPage: perPageCount,
                });
            }
        }
    }

    componentDidMount() {
        fetch(this.restEndpoint)
            .then(res => res.json())
            .then((parsedData) => {

                let perPageCount = getCookie('perPage') ? getCookie('perPage') : 10;
                perPageCount = parseInt(perPageCount);

                this.setState({
                    data: parsedData,
                    matches: this.parseMatches(parsedData),
                    fetchComplete: true,
                    start: 0,
                    currentPage: 1,
                    perPage: perPageCount,
                });


                if (Object.keys(this.props.match.params).length !== 0) {
                    this.setState({
                        start: (parseInt(this.props.match.params["pageNo"]) - 1) * perPageCount,
                        currentPage: parseInt(this.props.match.params["pageNo"])
                    })
                }
            })
            .catch(err => {
                console.error(err);
                this.setState({
                    error: true
                })
            });


    }

    onChangeItemCount(count) {
        setCookie("perPage", count.value);

        this.setState({
            perPage: parseInt(count.value)
        });
    }

    render() {
        return (
            <main className="container mt-4" style={{marginBottom: '150px'}}>
                {(() => this.state.fetchComplete ? (

                    <div className="">
                        <Link to={"/"}>
                            <img className={styles.banner} src={premierLeagueLogo} alt=""/>
                            <h2 className={styles.banner_title}>{this.state.data.name}</h2>
                        </Link>

                        <div className="mt-5">
                            <ResultTable
                                matches={this.state.matches.slice(this.state.start, this.state.start + this.state.perPage)}/>
                        </div>

                        <div className="d-flex mt-3">
                            <div className="ml-auto d-flex align-items-center">
                                <span className="text-weight-bold">Items per page</span>
                                <Dropdown className="ml-2 position-relative"
                                          controlClassName={styles.dropdown}
                                          menuClassName={styles.dropdown_menu}
                                          onChange={this.onChangeItemCount}
                                          options={options} value={`${this.state.perPage}`}
                                          placeholder="Select an option"/>

                                <div className={styles.pagination_info}>
                                    Showing &nbsp;{parseInt(this.state.start + 1)} - {parseInt(this.state.start + this.state.perPage)} of {this.state.matches.length}
                                </div>

                                <div className={`d-flex ${styles.icons}`}>
                                    {(() => {
                                        return this.state.currentPage > 1 ? (
                                            <React.Fragment>
                                                <Link to={`/`}>
                                                    <i className="fas fa-angle-double-left mr-4"></i>
                                                </Link>

                                                <Link to={`/page/${this.state.currentPage - 1}`}>
                                                    <i className="fas fa-angle-left mr-4"></i>
                                                </Link>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                <i className={`fas fa-angle-double-left mr-4 ${styles.disabled}`}></i>

                                                <i className={`fas fa-angle-left mr-4 ${styles.disabled}`}></i>
                                            </React.Fragment>
                                        );
                                    })()}

                                    {(() => {
                                        return parseInt(this.state.matches.length / this.state.perPage) !== this.state.currentPage ? (
                                            <React.Fragment>
                                                <Link to={`/page/${this.state.currentPage + 1}`}>
                                                    <i className="fas fa-angle-right mr-4"></i>
                                                </Link>

                                                <Link
                                                    to={`/page/${parseInt(this.state.matches.length / this.state.perPage)}`}>
                                                    <i className="fas fa-angle-double-right"></i>
                                                </Link>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                <i className={`fas fa-angle-right mr-4 ${styles.disabled}`}></i>

                                                <i className={`fas fa-angle-double-right ${styles.disabled}`}></i>

                                            </React.Fragment>
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : this.state.error ? <h5 className="text-center text-danger">
                        There was an error while fetching data. Please try again.</h5> :
                    <h5 className="text-center">Loading. Please Wait.</h5>)()}
            </main>
        );
    }


    parseMatches(parsedData) {
        let matches = [];

        parsedData.rounds.map(value => {
            matches.push(...value.matches)
        });

        return matches;
    }
}

export default withRouter(Home);