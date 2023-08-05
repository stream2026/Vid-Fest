import React, { Component } from "react";
import PropTypes from "prop-types";

export class Autocomplete extends Component {
  static propTypes = {
    options: PropTypes.instanceOf(Array).isRequired,
    onSearch: PropTypes.func.isRequired,
    setSearchInp: PropTypes.func.isRequired,
  };
  state = {
    activeOption: 0,
    filteredOptions: [],
    showOptions: false,
    userInput: "",
  };

  onChange = (e) => {
    console.log("onChanges");

    const { options, setSearchInp } = this.props;
    const userInput = e.currentTarget.value;

    console.log(options)

    setSearchInp(userInput)

    const filteredOptions = options?.filter(
      (optionName) =>
        optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput: e.currentTarget.value,
    });
  };

  onClick = (e) => {
    const selectedOption = e.currentTarget.innerText;
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: selectedOption,
    });

    this.props.onSearch(selectedOption);
  };
  onKeyDown = (e) => {
    const { activeOption, filteredOptions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showOptions: false,
        userInput: filteredOptions[activeOption],
      });
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions?.length - 1) {
        console.log(activeOption);
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,

      state: { activeOption, filteredOptions, showOptions, userInput },
    } = this;
    let optionList;
    if (showOptions && userInput) {
      if (filteredOptions?.length) {
        optionList = (
          <ul className="cursor-pointer border border-black">
            {filteredOptions?.map((optionName, index) => {
              let className;
              if (index === activeOption) {
                className = "option-active";
              }
              return (
                <li
                  className="m-[10px] p-[10px] text-[1.2rem] w-full rounded-sm cursor-pointer"
                  key={optionName}
                  onClick={onClick}
                >
                  {optionName}
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionList = (
          <div className="no-options">
            <em>No suggestions</em>
          </div>
        );
      }
    }
    return (
      <React.Fragment>
        <div className="basis-6/12 flex items-center h-full">
          <input
            type="text"
            name="queryParam"
            className=" border border-black rounded-md m-2 w-11/12 p-1 px-2"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
        </div>
        <div className="w-full text-start">
          {optionList}
        </div>
      </React.Fragment>
    );
  }
}

export default Autocomplete;
