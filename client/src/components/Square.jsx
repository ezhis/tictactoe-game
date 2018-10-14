import React from 'react';
import { connect } from 'react-redux';
import { addSymbol } from '../actions/actions';

class Square extends React.Component {
  handleClick() {
    const { value, id} = this.props;
    if (value) return;
    this.props.addSymbol(id);
  }

  render() {
    return (
      <button className="square" onClick={() => this.handleClick()}>
        {this.props.value}
      </button>
    );
  }
}

const mapStateToProps = ({squares}, {id}) => {
  return { 
    value: squares[id],
    id,
  }
};

export default connect(mapStateToProps, { addSymbol })(Square)
