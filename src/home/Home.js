import React, {Component} from 'react';
import Dropdown from 'react-dropdown';
import {Link, withRouter} from "react-router-dom";
import ResultTable from "../components/ResultTable/ResultTable";
import ResultModal from "../components/ResultModal/ResultModal";
import {getCookie, setCookie} from "../util/UtilityFunc";

// Importing Assets
import styles from './Home.module.scss';
import premierLeagueLogo from './assets/banner_premier_league.svg';
import {Helmet} from "react-helmet";


const ITEMS_PER_PAGE = [
    '10', '20', '30'
]

/* Statefull react component for the index
 * page of the site.
 */
class Home extends Component {

    constructor(props) {
        super(props);

        // Setting up Variables
        this.state = {
            fetchComplete: false,
            error: false,
            showModal: false,
            modalInfo: {}
        };

        this.restEndpoint = "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json";

        // Binding function this context
        this.onChangeItemCount = this.onChangeItemCount.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.calculateTeamStats = this.calculateTeamStats.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {

            // Retrieving and parsing cookie if exists
            let perPageCount = getCookie('perPage') ? getCookie('perPage') : 10;
            perPageCount = parseInt(perPageCount);

            // Updating data as the URL has been changed
            if (Object.keys(this.props.match.params).length !== 0) {
                this.setState({
                    start: (parseInt(this.props.match.params["pageNo"]) - 1) * perPageCount,
                    currentPage: parseInt(this.props.match.params["pageNo"])
                })
            } else {
                // If no page number is found, then assume we're on the homepage
                this.setState({
                    start: 0,
                    currentPage: 1,
                    perPage: perPageCount,
                });
            }

            // After loading new data, scroll back to top
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    }

    componentDidMount() {

        // Fetching the data from JSON file
        fetch(this.restEndpoint)
            .then(res => res.json())
            .then((parsedData) => {

                let perPageCount = getCookie('perPage') ? getCookie('perPage') : 10;
                perPageCount = parseInt(perPageCount);

                // Initial Variable Setup
                this.setState({
                    data: parsedData,
                    matches: this.parseMatches(parsedData),
                    fetchComplete: true,
                    start: 0,
                    currentPage: 1,
                    perPage: perPageCount,
                });

                // Setting current page number
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
        // Saving this info on the cookie
        setCookie("perPage", count.value);

        this.setState({
            perPage: parseInt(count.value)
        });
    }

    hideModal() {
        this.setState({
            showModal: false
        })
    }

    showModal(teamKey) {
        this.setState({
            modalInfo: this.calculateTeamStats(teamKey),
            showModal: true
        })
    }


    // Calculate Match Statistics for Showing in the Modal
    calculateTeamStats(teamKey) {
        let modalData = {
            name: '',
            played: 0,
            win: 0,
            loss: 0,
            draw: 0
        }

        this.state.matches.map(value => {
            if (value.team1.key === teamKey) {
                modalData.name = value.team1.name;
                modalData.played++;

                if (value.score1 > value.score2) modalData.win++;
                else if (value.score1 < value.score2) modalData.loss++;
                else modalData.draw++;
            } else if (value.team2.key === teamKey) {
                modalData.name = value.team2.name;
                modalData.played++;

                if (value.score2 > value.score1) modalData.win++;
                else if (value.score2 < value.score1) modalData.loss++;
                else modalData.draw++;
            }
        });

        return modalData;
    }

    // Extract match data from the raw data
    parseMatches(parsedData) {
        let matches = [];

        parsedData.rounds.map(value => {
            matches.push(...value.matches)
        });

        return matches;
    }

    render() {
        return (
            <main className="container mt-4" style={{marginBottom: '150px'}}>
                {(() => this.state.fetchComplete ? (
                    <div>
                        {(() => this.state.currentPage !== 1 ? (
                            <Helmet>
                                <title>{`Premier League Score - Page ${this.state.currentPage}`}</title>
                            </Helmet>
                        ): (
                            <Helmet>
                                <title>{"Premier League Score"}</title>
                            </Helmet>
                        ))()}

                        <Link to={"/"}>
                            <img className={styles.banner} src={premierLeagueLogo} alt=""/>
                            <h2 className={styles.banner_title}>{this.state.data.name}</h2>
                        </Link>

                        <div className="mt-5">
                            <ResultTable
                                modalHandler={this.showModal}
                                matches={this.state.matches.slice(this.state.start, this.state.start + this.state.perPage)}/>
                        </div>

                        <div className="mt-4">
                            <div className="row justify-content-lg-end">

                                <div className="order-2 order-lg-0 col-6 col-sm-5 col-md-4 col-lg-3">
                                    <div className="d-flex">
                                        <span className="text-weight-bold">Items per page</span>
                                        <Dropdown className="ml-2 position-relative"
                                                  controlClassName={styles.dropdown}
                                                  menuClassName={styles.dropdown_menu}
                                                  onChange={this.onChangeItemCount}
                                                  options={ITEMS_PER_PAGE} value={`${this.state.perPage}`}
                                                  placeholder="Select an option"/>
                                    </div>
                                </div>

                                <div className="order-1 order-lg-1 col-6 col-lg-3 my-lg-0">
                                    <div className={styles.pagination_info}>
                                        Showing &nbsp;{parseInt(this.state.start + 1)} - {parseInt(this.state.start + this.state.perPage)} of {this.state.matches.length}
                                    </div>
                                </div>

                                <div className="order-0 order-lg-2 col-lg-2 position-relative mb-4 mt-lg-0">
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
                        <ResultModal data={this.state.modalInfo} isVisible={this.state.showModal}
                                     onModalClose={this.hideModal}/>
                    </div>
                ) : this.state.error ? <h5 className="text-center text-danger">
                        There was an error while fetching data. Please try again.</h5> :
                    <h5 className="text-center">Loading. Please Wait.</h5>)()}
            </main>
        );
    }
}

export default withRouter(Home);