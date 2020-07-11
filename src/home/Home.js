import React, {Component} from 'react';

// Importing Assets
import styles from './Home.module.scss';
import ResultTable from "../components/ResultTable/ResultTable";

class Home extends Component {

    state = {
        fetchComplete: false
    }
    restEndpoint = "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json";


    componentDidMount() {
        fetch(this.restEndpoint)
            .then(res => res.json())
            .then((parsedData) => {

                this.setState({
                    data: parsedData,
                    matches: this.parseMatches(parsedData),
                    fetchComplete: true,
                    start: 0,
                    perPage: 10,
                });
            })
            .catch(console.log)
    }

    render() {
        return (
            <main className="container mt-4">
                {(() => this.state.fetchComplete ? (

                    <div>
                        <div className={styles.banner} alt="">
                            <h2 className={styles.banner_title}>{this.state.data.name}</h2>
                        </div>

                        <h4 className="mt-5 mb-4 text-center">Match Results</h4>

                        <div>
                            <ResultTable matches={this.state.matches.slice(this.state.start, this.state.perPage)}/>
                        </div>
                    </div>

                ) : <h5 className="text-center">Loading. Please Wait.</h5>)()}
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

export default Home;