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

                        <div>
                            <ResultTable matches={this.state.matches.slice(0, 10)}/>
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