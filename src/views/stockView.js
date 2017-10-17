import React, {Component} from 'react';
import Profile_reqs from '../requests/profiles_reqs';
import moment from 'moment';
import {Line} from 'react-chartjs';


class StockView extends Component {
    constructor(props) {
        super(props);
        this.symbol_name = this.props.match.params.stock_symbol;

        this.state = {
            history: []
        };
    }

    componentDidMount() {
        this.getStockHistory();

    }

    getStockHistory() {
        Profile_reqs.getStockHisotory(this.symbol_name, (resp)=> {
            if (resp.hasError) {
                alert(resp.errorMsg);
                return;
            }

            console.log(resp.response);

            this.setState({
                history: resp.response.reverse()
            });
        });
    }

    getStockPrices(histories) {
        var ret = [];

        histories.map((history, idx)=> {
            ret.push(history.clos);
        });

        return ret;
    }

    getStockDates(histories) {
        let ret = [];

        histories.map((history, idx)=> {
            let m = new moment(history.date);
            ret.push(m.format("YYYY-MM-DD"))
        });

        return ret;
    }

    getStockBorderColor(histories) {
        var ret = [];
        histories.map((history, idx)=> {
            ret.push('rgba(255,99,132,1)')
        });

        return ret;
    }

    getStockBackgroundColor(histories) {
        var ret = [];
        histories.map((history, idx)=> {
            ret.push('rgba(255, 99, 132, 0.2)');
        });
        return ret;
    }

    renderStockView(history) {
        if (history.length > 0) {
            let data = {
                labels:this.getStockDates(history),
                datasets:[{
                    label:'',
                    data:this.getStockPrices(history)
                }]
            };
            return <Line data={data} width="600" height="250"/>
        } else {
            return (<div></div>)
        }
    }

    render() {
        let history = this.state.history;


        let data = {
            labels:this.getStockDates(history),
            datasets:[{
                    label: this.symbol_name + ' price',
                    // data: this.getStockPrices(history),
                    // backgroundColor: this.getStockBackgroundColor(history),
                    // borderColor: this.getStockBorderColor(history),
                    // borderWidth:1
                }]
        };


        //
        // let data = {
        //
        //         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        //         datasets: [{
        //
        //         }]
        //
        //
        // };


        return (
            <div>
                {this.renderStockView(history)}
            </div>
        )
    }
}

export default StockView;