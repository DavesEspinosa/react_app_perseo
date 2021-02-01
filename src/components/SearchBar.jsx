import React, { Component } from "react";
import { Input} from "antd";

const { Search } = Input;

export class SearchBar extends Component {
  render() {
    return (
      <div>
        <Search
          type="text"
          name="search"
          placeholder="Search"
          style={{ width: 200 }}
          value={this.props.search}
          onChange={this.props.handleChange}
        />
      </div>
    );
  }
}

export default SearchBar;
