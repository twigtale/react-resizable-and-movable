import React, {Component, PropTypes} from 'react';
import Draggable from 'react-draggable';
import Resizable from 'react-resizable-box';
import assign from 'react/lib/Object.assign';

export default class ResizableAndMovable extends Component {
  constructor(props) {
    super(props);
    this.state = {isDraggable: true};
    this.isResizing = false;
  }

  componentDidMount(){
    if(this.props.initAsResizing.enable) {
      this.refs.resizable.onResizeStart(this.props.initAsResizing.direction, this.props.initAsResizing.event);
    }
  }

  onResizeStart(dir, e) {
    this.setState({isDraggable: false});
    this.isResizing = true;
    this.props.onResizeStart();
    e.stopPropagation();
  }

  onResizeStop(size) {
    this.setState({isDraggable: true});
    this.isResizing = false;
    this.props.onResizeStop(size);
  }

  onDragStart(e, ui) {
    if (this.isResizing) return;
    this.props.onDragStart(e, ui);
  }

  onDrag(e, ui) {
    if (this.isResizing) return;
    this.props.onDrag(e, ui);
  }

  onDragStop(e, ui) {
    if (this.isResizing) return;
    this.props.onDragStop(e, ui);
  }

  render() {
    const {customClass,
           customStyle,
           onClick,
           onTouchStart,
           minWidth,
           minHeight,
           maxWidth,
           maxHeight,
           start,
           zIndex,
           bounds} = this.props;
    return (
      <Draggable
         axis={this.props.moveAxis}
         zIndex={zIndex}
         start={{x:start.x, y:start.y}}
         disabled={!this.state.isDraggable || this.props.moveAxis==='none'}
         onStart={this.onDragStart.bind(this)}
         onDrag={this.onDrag.bind(this)}
         onStop={this.onDragStop.bind(this)}
         bounds={bounds}
         grid={this.props.grid} >
        <div style={{
               width:`${start.width}px`,
               height:`${start.height}px`,
               cursor: "move",
               position:'absolute'
             }}>
          <Resizable
             ref='resizable'
             onClick={onClick}
             onTouchStart={onTouchStart}
             onResizeStart={this.onResizeStart.bind(this)}
             onResize={this.props.onResize}
             onResizeStop={this.onResizeStop.bind(this)}
             width={start.width}
             height={start.height}
             minWidth={minWidth}
             minHeight={minHeight}
             maxWidth={maxWidth}
             maxHeight={maxHeight}
             customStyle={customStyle}
             customClass={customClass}
             isResizable={this.props.isResizable}>
            {this.props.children}
          </Resizable>
        </div>
      </Draggable>
    );
  }
}

ResizableAndMovable.propTypes = {
  onClick: PropTypes.func,
  onTouchStart: PropTypes.func,
  zIndex: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isResizable: PropTypes.object,
  bounds: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object
  ]),
  grid: PropTypes.arrayOf(PropTypes.number)
};

ResizableAndMovable.defaultProps = {
  width: 100,
  height: 100,
  start: {x:0, y:0},
  zIndex: 100,
  customClass: '',
  initAsResizing: {enable: false, direction: 'xy'},
  isResizable: {x:true, y:true, xy: true},
  moveAxis:'both',
  grid: null,
  onClick: () => {},
  onTouchStartP: () => {},
  onDragStart: () => {},
  onDrag: () => {},
  onDragStop: () => {},
  onResizeStart: () => {},
  onResize: () => {},
  onResizeStop: () => {}
};
