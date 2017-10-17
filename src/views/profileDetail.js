

import React, {Component} from 'react';
import AutoSuggest from 'react-autosuggest';
import './css/detailProfile.css';
import Profile_reqs from '../requests/profiles_reqs';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {Link} from 'react-router-dom';

class Suggest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            suggestions: []
        };
    }

    render() {
        const { value, suggestions } = this.state;

        const inputProps = {
            placeholder: "symbol",
            value,
            onChange :(evt, {newValue, method})=> {
                this.setState({
                    value: newValue
                });
            }
        };

        return (
            <AutoSuggest
                suggestions = {suggestions}
                onSuggestionsFetchRequested = {({value, reason}) => {
                    console.log(value);
                    if (value.length < 2) {
                        return;
                    }

                    Profile_reqs.getSymbolSuggestions(value, (symbols)=> {
                        this.setState({
                            suggestions: symbols
                        });
                    });
                }}
                onSuggestionsClearRequested = {()=> {
                    this.setState({
                        suggestions: []
                    });
                }}
                getSuggestionValue = {(suggestion)=> {
                    return suggestion.symbol;
                }}
                renderSuggestion = {(suggestion)=> {
                    return (
                        <span>{suggestion.symbol}</span>
                    )
                }}
                inputProps = {inputProps}

            />
        );
    }
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


class ProfileDetail extends Component {
    constructor(props) {
        super(props);
        this.profile_name = this.props.match.params.profile_id;

        this.state = {
            startDate: moment(),
            stocks: [],
            stockHistory:{}
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        let now = moment();

        if (date.isSameOrAfter(now)) {
            return;
        }

        this.setState({startDate: date});
    }

    componentWillMount() {
        this.getAllProfiles();
    }

    getAllProfiles() {
        Profile_reqs.getProfileStocks(this.profile_name, (resp)=> {
            if (resp.hasError) {
                return;
            }

            let response = resp.response;

            this.setState({
                stocks: response[0],
                stockHistory: response[1]
            });
        });
    }

    render() {
        let a = '';
        let self = this;

        return (
            <div style={{paddingLeft:10, paddingTop:30, display:'flex', justifyContent:'center'}}>
                <div>
                    <Suggest pname={this.profile_name} ref={(ref)=> {this.suggest = ref;}} />
                    <input type={'text'} placeholder={'price'} ref={(ref)=>{this.price = ref;}}/>
                    <br />
                    <input type={'text'} placeholder={'share'} ref={(ref)=>{this.share = ref;}}/>

                    <DatePicker selected ={this.state.startDate} onChange={this.handleChange} />

                    <button onClick={(evt)=> {
                        //check the validness of input
                        let symbol = this.suggest.state.value;
                        let price = this.price.value;
                        let share = this.share.value;
                        if (!symbol || symbol.length < 2) {
                            alert('symbol is not valid');
                            return;
                        }
                        if (!isNumeric(price) && price >= 0) {
                            alert("price is not valid");
                            return;
                        }

                        if (!isNumeric(share) && share >= 0) {
                            alert('share is not valid');
                            return;
                        }

                        let date = this.state.startDate;
                        let dateString = date.format("YYYY-MM-DD");

                        Profile_reqs.createNewProfileStock(self.profile_name, symbol, share, price, dateString, (resp)=> {
                            if (resp.hasError) {
                                alert(resp.errorMsg);
                                return;
                            }

                            self.getAllProfiles();
                        });
                    }
                    }>
                        add
                    </button>
                    <br />

                    <table>
                        <thead>
                        <tr>
                            <th>symbol</th>
                            <th>price</th>
                            <th>share</th>
                            <th>bought date</th>
                            <th>market price</th>
                            <th>market date</th>
                            <th>earning</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.stocks.map((stock, idx)=> {
                                let history = this.state.stockHistory[stock.sname];

                                let t = new moment(stock.boughtTime);
                                let market_t = new moment();
                                let market_p = "";

                                if (history) {
                                    market_t = new moment(history.date);
                                    market_p = history.clos;
                                }

                                let earning = (market_p - stock.price) * stock.share;
                                return (
                                    <tr key={stock.sid} >
                                        <td><Link to={'/stock/'+stock.sname}>{stock.sname}</Link></td>
                                        <td>{stock.price}</td>
                                        <td>{stock.share}</td>
                                        <td>{t.format("YYYY-MM-DD")}</td>
                                        <td>{market_p}</td>
                                        <td>{market_t.format("YYYY-MM-DD")}</td>
                                        <td>{earning}</td>
                                        <td><button onClick = {(evt)=> {
                                            Profile_reqs.deleteProfileStock(this.profile_name, stock.sid, (resp)=> {
                                                if (resp.hasError) {
                                                    alert(resp.errorMsg);
                                                    return;
                                                }

                                                self.getAllProfiles();
                                            });
                                        }}>删除</button></td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}


export default ProfileDetail;