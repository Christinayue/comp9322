import React, { Component } from "react";
//import Button from "@material-ui/core/Button";
//import jQuery from 'jquery';
import axios from "axios";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      result: null,
    }
  }
  /**
   * Get weather data using api key from apixu.com
   * using given dataMode and city
   * @param {*} dataMode can be current and forecast
   * @param {*} city
   */

  handleChange = event => {
    this.setState({ name: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      name: this.state.name
    };
    axios.post(`http://0.0.0.0:5001/v1/ask/` + user.name, { headers: { 'accept': 'application/json' } })
      .then(res => {
        console.log(res.data.length);
        //console.log(res.data);
        const result = res.data;
        //this.setState(result);
        //console.log(result);
        this.setState({ result: result.valueOf() });
      })
    /*axios.post(`http://0.0.0.0:5001/v1/ask/` + user.name, { headers: { 'accept': 'application/json' } })
      .then(res => {
        console.log(res.data.length);
        //console.log(res.data);
        const result = res.data[0];
        console.log(result);
        this.setState({ result: result });


      })*/
  }
  render() {
    var sen = ""
    var datalist = []
    //console.log(this.state.result)
    if (this.state.result != null) {
      if (typeof (this.state.result) == String) {
        sen = "";
        datalist = [];
      }
      else if (this.state.result[0] != null && this.state.result[0]['id'] != null) {
        //console.log(this.state.result)
        sen = ""
        for (var a in this.state.result) {
          //console.log(this.state.result[a])
          datalist.push(this.state.result[a]);
        }
      }
      else {
        sen = this.state.result;
        datalist = []
      }
    }
    else {
      sen = ""
      datalist = []
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            message:
              <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <button type="submit">Add</button>
        </form>
        <div> {sen}</div>
        <div>
          <ul>
            {
              datalist.map(function (username) {
                return <li>{username['id']} : {username['status']} : {username['time']}</li>
              })
            }
          </ul>
        </div>
      </div >

    )
  }
}
export default Dashboard;


