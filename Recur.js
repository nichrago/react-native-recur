
import React from 'react';
import PropTypes from 'prop-types';


export default class Recur extends React.Component {

	static propTypes = {
		initial: PropTypes.node, // initial data to get recur going, dev defined
		step: PropTypes.object, // promise of future data coming, Recur defined **don't touch!
	}

	state = { data: undefined }


	componentWillMount() {
		if (this.props.initial) {
			this.setState({ data: this.props.initial });
		} else {
			this.props.step.then((data) => {
				this.setState({ data });	
			}).catch((err) => { 
				this.setState({ data: null }) 
			})
		}
	}


	_renderChild = (data) => {
		let _resolve; // out of scope of promise because promises are safer by default now
		let _promise = new Promise((resolve, reject) => { _resolve = resolve; });

		let next = (<Recur step={_promise}>{this.props.children}</Recur>);
		return (this.props.children(data, next, _resolve) || null) // or null incase no return
	}


	render() {	
		if (!this.state.data) { return null } 	

		if ( !(Array.isArray(this.state.data)) ) { 
			return this._renderChild(this.state.data) 
		} else { 
			return this.state.data.map((data) => this._renderChild(data)) 
		}
	}
}
