

import React, {Component} from 'react';
import {connect} from "react-redux";
import {addSymbol, deleteSymbols} from '../../store/actions';

class AddStock extends Component {
    addBtnPressed(evt) {
        console.log(this.input);
        const node = this.input;
        const name = node.value.trim();
        node.value = "";

        this.props.dispatch(addSymbol(name));
    }

    render() {
        return (
            <div>
                <input type={'text'} ref={ref=>this.input = ref} />
                <text>add stock</text>
                <button onClick={(evt)=> {
                    this.addBtnPressed(evt);
                }}>add</button>
            </div>
        );
    }
}


class DeleteStock extends Component {
    render() {
        return (
            <button onClick={(evt)=> {
                this.props.deleteBtnPressed(evt);
            }} disabled={this.props.disabled} >
                delete
            </button>
        )
    }
}

class StockList extends Component {
    constructor(props) {
        super(props);
        this.selectedStocks = [];
    }


    oneStockSelected(selected, stockName) {
        let idx = this.selectedStocks.indexOf(stockName);
        let changed = false;
        if (selected && idx === -1) {
            this.selectedStocks.push(stockName);
            changed = true;
        }
        if (!selected && idx !== -1) {
            this.selectedStocks = [...this.selectedStocks.slice(0, idx), ...this.selectedStocks.slice(idx+1)]
            changed = true;
        }

        if (changed) {
            this.props.selectedStocksChanged(this.selectedStocks);
        }
    }

    clearSelectedStocks() {
        this.selectedStocks = [];
        this.props.selectedStocksChanged(this.selectedStocks);
    }

    render() {
        return (
            <ul>
                {
                    this.props.stocks.map((stock, indx)=> {
                        return <Stock stock={stock} stockOnSelected={(select, stock)=>this.oneStockSelected(select, stock)} key={stock}/>
                    })
                }
            </ul>
        );
    }
}

class Stock extends Component {
    checkBoxBtnPressed(evt) {
        const checked = this.checkbox.checked;
        this.props.stockOnSelected(checked, this.props.stock);
    }

    render() {
        return (
            <li>
                <input type={'checkbox'} onChange={evt=>this.checkBoxBtnPressed(evt)} ref={ref=>this.checkbox = ref}/>
                <text>{this.props.stock}</text>
            </li>
        )
    }
}

Stock.propTypes = {
    stock: React.PropTypes.string.isRequired
};

class ProfileDetail extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.profile_id = this.props.match.params.profile_id;
        this.state = {deleteBtnDisable: true};
    }

    selectStockChanged(stocks) {
        if (stocks.length > 0 && this.state.deleteBtnDisable) {
            this.setState({deleteBtnDisable:false});
        }
        if (stocks.length == 0 && !this.state.deleteBtnDisable) {
            this.setState({deleteBtnDisable: true});
        }
    }


    deleteBtnPressed(evt) {
        const {dispatch} = this.props;
        const stocks = this.stockList.selectedStocks;
        dispatch(deleteSymbols(stocks));
        this.stockList.clearSelectedStocks();
    }

    render() {
        const {dispatch, stocks} = this.props;

        return (
            <div>
                <AddStock dispatch={dispatch}/>
                <DeleteStock deleteBtnPressed={(evt)=> this.deleteBtnPressed(evt)} disabled={this.state.deleteBtnDisable}/>
                <StockList stocks={stocks} selectedStocksChanged={(stocks)=>this.selectStockChanged(stocks)} ref = {ref=>this.stockList = ref}/>
            </div>
        );
    }
}

function reduxMap(state) {
    return {stocks: state.profileStocksReducer}
}


export default connect(reduxMap)(ProfileDetail);