import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';

class ItemModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			name: ''
		}

		this.toggle = this.toggle.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	toggle() {
		this.setState(prevState => ({
			modal: !this.state.modal
		}))
	}

	onChange(e) {
		const stateProperty = e.target.name;
		const value = e.target.value;

		this.setState(() => ({
			[stateProperty]: value
		}))
	}

	onSubmit(e) {
		e.preventDefault();

		const newItem = {
			name: this.state.name
		}

		this.props.addItem(newItem);

		this.setState(() => ({
			name: ''
		}))

		this.toggle();

	}

	render() {
		return (
			<div>
				<Button
					color="dark"
					style={{marginBottom: '2rem'}}
					onClick={this.toggle}
				>Add Item</Button>

				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
				>
					<ModalHeader toggle={this.toggle}>Add to shopping list</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for='item'>Item</Label>
								<Input
									type='text'
									name='name'
									value={this.state.name}
									id='item'
									placeholder='Add shopping item'
									onChange={this.onChange} />

								<Button color='dark' style={{marginTop: '2rem'}} block>
									Add Item
								</Button>

							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({item: state.item});

export default connect(mapStateToProps, { addItem })(ItemModal);