import React, { Component } from 'react'
import { Button, Form, Container, Header } from 'semantic-ui-react'
import axios from 'axios'

import './App.css'

require('dotenv').config()

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            age: '',
            salary: '',
            hobby: '',
            restartButton: false
        }

        this.changeHandler = this.changeHandler.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleRefresh = (e) => {
        e.preventDefault()

        window.location.reload()
    }

    handleError = () => {
        const header = document.getElementById('header')
        const form = document.getElementById('form')

        this.setState({
            restartButton: true
        })

        header.innerHTML = 'Mhmm, something went wrong'
        form.innerHTML = 'Looks like something did work as expected, but no worries. Refresh and try again!'

        console.log('Something didn\'t work as expected... Upsi 😅')
    }

    submitHandler = e => {
        e.preventDefault()

        axios.post('process.env.REACT_APP_SPREADSHEET_URL', this.state)
            .then(res => {
                const header = document.getElementById('header')
                const form = document.getElementById('form')

                if (res.status === 200) {
                    header.innerHTML = 'Great! Thanks for submitting!'
                    form.classList.add('hidden')
                } else {
                    this.handleError()
                }
            })
            .catch(e => {
                this.handleError()
            })
    }

    render() {
        const { name, age, salary, hobby } = this.state

        return (
            <Container fluid className="container">
                <Header as='h2' id="header">React Google Sheets!</Header>
                <Form className="form" id="form" onSubmit={this.submitHandler}>
                    <Form.Field>
                        <label>Name</label>
                        <input
                            placeholder='Enter your name'
                            type="text"
                            name="name"
                            value={name}
                            onChange={this.changeHandler}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Age</label>
                        <input
                            placeholder='Enter your age'
                            type="number"
                            name="age"
                            value={age}
                            onChange={this.changeHandler}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Salary</label>
                        <input
                            placeholder='Enter your salary'
                            type="number"
                            name="salary"
                            value={salary}
                            onChange={this.changeHandler}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Hobby</label>
                        <input
                            placeholder='Enter your hobby'
                            type="text"
                            name="hobby"
                            value={hobby}
                            onChange={this.changeHandler}
                        />
                    </Form.Field>

                    <Button color="blue" type='submit'>Submit</Button>
                </Form>

                {this.state.restartButton &&
                    <Button color="red" onClick={this.handleRefresh} id='refreshButton'>
                        Refresh the page
                    </Button>
                }
            </Container>
        )
    }
}
